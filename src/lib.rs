mod utils;

use std::{
    collections::{HashMap, HashSet},
    f64,
    iter::FromIterator,
};
extern crate js_sys;
use line_drawing::{BresenhamCircle, XiaolinWu};
use ndarray::{array, Array1};
use wasm_bindgen::prelude::*;

const RADIUS: u32 = 512;
const MARGIN: u32 = 16;
const PADDING: u32 = 48;
const STARTING_PIXEL_SIZE: u32 = 16;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}
#[wasm_bindgen]
pub struct Disk {
    pixel_size: u32,
    radius: u32,
    strings: Vec<(u16, u16)>, // (x, y) means there exists a line between nail x to nail y
    nails: Vec<(i32, i32)>,
    canvas: Vec<(i32, i32)>,
    image: Vec<u8>,
    context: web_sys::CanvasRenderingContext2d,
    index_hashmap: HashMap<(i32, i32), usize>,
    last_nail: usize,
    b: Array1<f32>,
    drawing_strings: bool,
}

#[wasm_bindgen]
impl Disk {
    pub fn new() -> Disk {
        utils::set_panic_hook();

        let document = web_sys::window().unwrap().document().unwrap();
        let canvas = document.get_element_by_id("string-art-canvas").unwrap();
        let canvas: web_sys::HtmlCanvasElement = canvas
            .dyn_into::<web_sys::HtmlCanvasElement>()
            .map_err(|_| ())
            .unwrap();

        canvas.set_width((RADIUS + PADDING + MARGIN) * 2);
        canvas.set_height((RADIUS + PADDING + MARGIN) * 2);

        let context = canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<web_sys::CanvasRenderingContext2d>()
            .unwrap();

        // context.set_global_alpha(0.3);

        let mut disk = Disk {
            pixel_size: STARTING_PIXEL_SIZE,
            radius: RADIUS,
            strings: Vec::new(),
            canvas: Vec::new(),
            image: Vec::new(),
            nails: Vec::new(),
            index_hashmap: HashMap::new(),
            context,
            last_nail: 0,
            b: array![],
            drawing_strings: false,
        };

        disk.resize();
        disk.draw_nails();
        disk.draw_canvas();
        disk.clear();
        let mut start = (js_sys::Math::random() * disk.nails.len() as f64) as usize;

        disk
    }

    pub fn draw_nails(&mut self) {
        for (x, y) in BresenhamCircle::new(
            ((RADIUS + PADDING) / self.pixel_size) as i32,
            ((RADIUS + PADDING) / self.pixel_size) as i32,
            ((RADIUS + PADDING) / self.pixel_size) as i32,
        ) {
            // Draw the nail.
            self.context.begin_path();

            self.context.set_fill_style(&"black".into());

            self.context
                .arc(
                    (x as u32 * self.pixel_size + MARGIN) as f64,
                    (y as u32 * self.pixel_size + MARGIN) as f64,
                    1.0,
                    0.0,
                    2.0 * f64::consts::PI,
                )
                .unwrap();

            self.context.fill();

            self.context.close_path();
        }
    }

    pub fn draw_canvas(&mut self) {
        if self.drawing_strings {
            return;
        }

        self.context.set_global_alpha(1.0);
        // Draw the canvas.
        for (index, pixel) in self.image.iter().enumerate() {
            let (x, y) = self.canvas[index];

            self.context.begin_path();

            // Set the fill style to a grayscale color based on the pixel value
            let color = format!(
                "rgb({}, {}, {})",
                (255 - pixel),
                (255 - pixel),
                (255 - pixel)
            );
            self.context.set_fill_style(&color.into());

            self.context.fill_rect(
                (x as u32 * self.pixel_size + MARGIN + PADDING) as f64,
                (y as u32 * self.pixel_size + MARGIN + PADDING) as f64,
                self.pixel_size as f64,
                self.pixel_size as f64,
            );

            self.context.close_path();

            self.context.stroke();
        }
    }

    // pub fn draw(&mut self, canvas_left: u32, canvas_top: u32) {
    //     let x = (canvas_left - PADDING) / self.pixel_size;
    //     let y = (canvas_top - PADDING) / self.pixel_size;

    //     if let Some(index) = self.index_hashmap.get(&(x as i32, y as i32)) {
    //         self.image[*index] = true;
    //     }
    // }

    pub fn resize(&mut self) {
        self.nails = BresenhamCircle::new(
            ((RADIUS + PADDING) / self.pixel_size) as i32,
            ((RADIUS + PADDING) / self.pixel_size) as i32,
            ((RADIUS + PADDING) / self.pixel_size) as i32,
        )
        .collect();

        let mut outer_edge = BresenhamCircle::new(
            (RADIUS / self.pixel_size) as i32,
            (RADIUS / self.pixel_size) as i32,
            (RADIUS / self.pixel_size) as i32,
        )
        .collect::<Vec<_>>();

        let mut canvas = Vec::new();
        let mut index_hashmap = HashMap::new();

        // Sort the outer edge by y coordinate and then by x coordinate
        outer_edge.sort_by_key(|(x, _)| *x);
        outer_edge.sort_by_key(|(_, y)| *y);

        let mut index = 0;

        for window in outer_edge.windows(2) {
            let (x0, y0) = window[0];
            let (x1, y1) = window[1];

            canvas.push((x0, y0));
            index_hashmap.insert((x0, y0), index);
            index += 1;

            if y0 == y1 && x0 < x1 - 1 {
                // Fill in the gap
                for x in x0 + 1..x1 {
                    canvas.push((x, y0));
                    index_hashmap.insert((x, y0), index);
                    index += 1;
                }
            }
        }

        canvas.push(*outer_edge.last().unwrap());

        self.canvas = canvas.into_iter().map(|(x, y)| (x, y)).collect();
        self.index_hashmap = index_hashmap;
        self.image.resize(self.canvas.len(), 0);
    }

    pub fn draw_strings(&mut self) {
        if !self.drawing_strings {
            return;
        }

        if self.strings.len() == 0 {
            // First iteration initiated by pressing the "Stringify" button in the frontend
            self.b = self
                .image
                .iter()
                .map(|b| *b as f32 / 255.0) // 0 if white, 1 if black
                .collect::<Vec<_>>()
                .into();

            self.image = vec![0; self.canvas.len()];
        }

        self.context.set_global_alpha(0.3);

        let set: HashSet<(u16, u16)> = HashSet::from_iter(self.strings.iter().copied());

        // Draw 100 lines
        for _ in 0..20 {
            let (start_x, start_y) = self.nails[self.last_nail];

            let mut best = f32::MIN;
            let mut best_string = array![];
            let mut best_end = self.last_nail;

            for end in 0..self.nails.len() {
                if end == self.last_nail
                    || set.contains(&(self.last_nail as u16, end as u16))
                    || set.contains(&(end as u16, self.last_nail as u16))
                {
                    continue;
                }

                let (end_x, end_y) = self.nails[end as usize];

                let values = XiaolinWu::<f32, i32>::new(
                    (start_x as f32, start_y as f32),
                    (end_x as f32, end_y as f32),
                )
                .collect::<Vec<_>>();

                let mut string: Array1<f32> = Array1::zeros(self.canvas.len());

                for ((x, y), value) in values {
                    if let Some(index) = self.index_hashmap.get(&(x, y)) {
                        string[*index] = 0.0065 * value;
                    };
                }

                let bitmap = string.map(|v| if *v > 0.0 { 1.0 } else { 0.0 }); // Everywhere where it is not white

                assert_eq!(bitmap.len(), self.canvas.len());
                assert_eq!(self.b.len(), self.canvas.len());

                let interesting_pixels = &bitmap * &self.b;

                // When no line is drawn
                let without_line = interesting_pixels.dot(&interesting_pixels);

                // When the line is drawn
                let diff = &interesting_pixels - &string;
                let with_line = diff.dot(&diff);

                let improvement = without_line - with_line;

                if improvement > 0.0 && improvement > best {
                    best = improvement;
                    best_string = string;
                    best_end = end;
                }
            }

            if best == f32::MIN {
                self.drawing_strings = false;
                break;
            }

            // Update image because we drew a line
            // log!("{:?}", &best_string.shape());
            self.b = &self.b - &best_string;

            // Draw the string
            let pixel_size = self.pixel_size;

            self.strings.push((self.last_nail as u16, best_end as u16));
            let (end_x, end_y) = self.nails[best_end as usize];

            self.context.begin_path();

            self.context.move_to(
                (start_x as u32 * pixel_size + MARGIN) as f64,
                (start_y as u32 * pixel_size + MARGIN) as f64,
            ); // Move the pen to the starting point
            self.context.line_to(
                (end_x as u32 * pixel_size + MARGIN) as f64,
                (end_y as u32 * pixel_size + MARGIN) as f64,
            ); // Draw a line to the ending point

            self.context.stroke();
            self.context.close_path();
            self.last_nail = best_end;
        }
    }

    pub fn initialize_drawing_strings(&mut self) {
        self.drawing_strings = true;
    }

    pub fn clear(&mut self) {
        self.context.clear_rect(
            0.0,
            0.0,
            (RADIUS + PADDING + MARGIN) as f64 * 2.0,
            (RADIUS + PADDING + MARGIN) as f64 * 2.0,
        );
    }

    pub fn reset(&mut self) {
        self.image = vec![255; self.canvas.len()];
        self.strings = Vec::new();
        self.last_nail = 0;
        self.drawing_strings = false;
    }

    // Getters and setters

    pub fn set_pixel_size(&mut self, size: u32) {
        self.pixel_size = size;
        self.resize();
    }

    pub fn get_radius(&self) -> u32 {
        self.radius
    }

    pub fn get_center(&self) -> u32 {
        self.radius + PADDING + MARGIN
    }

    pub fn process_pixels(&mut self, pixels: &[f64]) {
        assert_eq!(
            pixels.len(),
            (2 * RADIUS / STARTING_PIXEL_SIZE * 2 * RADIUS / STARTING_PIXEL_SIZE) as usize
        );

        for (index, pixel) in pixels.iter().enumerate() {
            let x = index % (2 * RADIUS / STARTING_PIXEL_SIZE) as usize;
            let y = index / (2 * RADIUS / STARTING_PIXEL_SIZE) as usize;

            if let Some(index) = self.index_hashmap.get(&(x as i32, y as i32)) {
                self.image[*index] = (*pixel * 255.0) as u8; // Still 0 if white, 255 if black
            }
        }
    }
}
