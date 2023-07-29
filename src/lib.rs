mod utils;

use std::f64;
extern crate js_sys;
use line_drawing::{BresenhamCircle, XiaolinWu};
use ndarray::Array1;
use wasm_bindgen::prelude::*;

const RADIUS: u32 = 256;
const MARGIN: u32 = 16;
const PADDING: u32 = 16;
const STARTING_PIXEL_SIZE: u32 = 8;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}
#[wasm_bindgen]
pub struct Disk {
    // nail_count: u16,
    pixel_size: u32,
    radius: u32,
    strings: Vec<(u16, u16)>, // (x, y) means there exists a line between nail x to nail y
    nails: Vec<(i32, i32)>,
    canvas: Vec<(i32, i32)>,
    filled_in: Vec<bool>,
    context: web_sys::CanvasRenderingContext2d,
    // a: Array2<f32>,
    // x: Array1<f64>,
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

        let context = canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<web_sys::CanvasRenderingContext2d>()
            .unwrap();

        canvas.set_width((RADIUS + PADDING + MARGIN) * 2);
        canvas.set_height((RADIUS + PADDING + MARGIN) * 2);

        let mut disk = Disk {
            pixel_size: STARTING_PIXEL_SIZE,
            radius: RADIUS,
            strings: Vec::new(),
            canvas: Vec::new(),
            filled_in: Vec::new(),
            nails: Vec::new(),
            context,
        };

        disk.resize();
        disk.draw_nails();
        disk.draw_canvas();
        disk.clear();

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
        // Draw the canvas.
        for (index, filled_in) in self.filled_in.iter().enumerate() {
            if !*filled_in {
                continue;
            }

            let (x, y) = self.canvas[index];

            self.context.fill_rect(
                (x as u32 * self.pixel_size + MARGIN) as f64,
                (y as u32 * self.pixel_size + MARGIN) as f64,
                self.pixel_size as f64,
                self.pixel_size as f64,
            );
        }

        self.context.stroke();
    }

    pub fn draw(&mut self, canvas_left: u32, canvas_top: u32) {
        log!("draw({:?}, {:?})", canvas_left, canvas_top);
        // TODO: speed upo
        for (i, (x, y)) in self.canvas.iter().enumerate() {
            if *x as u32 == (canvas_left - PADDING) / self.pixel_size
                && *y as u32 == (canvas_top - PADDING) / self.pixel_size
            {
                self.filled_in[i] = true;
            }
        }
    }

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

        // Sort the outer edge by y coordinate and then by x coordinate
        outer_edge.sort_by_key(|(x, _)| *x);
        outer_edge.sort_by_key(|(_, y)| *y);

        for window in outer_edge.windows(2) {
            let (x0, y0) = window[0];
            let (x1, y1) = window[1];

            canvas.push((x0, y0));

            if y0 == y1 && x0 < x1 - 1 {
                // Fill in the gap
                for x in x0 + 1..x1 {
                    canvas.push((x, y0));
                }
            }
        }

        canvas.push(*outer_edge.last().unwrap());

        self.canvas = canvas.into_iter().map(|(x, y)| (x, y)).collect();
        self.filled_in.resize(self.canvas.len(), false);
    }

    pub fn stringify(&mut self) {
        // let x: Array1<f64> = Array1::zeros(LINE_COUNT as );
        let b: Array1<f32> = self
            .filled_in
            .iter()
            .map(|b| if *b { 255.0 } else { 0.0 })
            .collect::<Vec<_>>()
            .into();

        self.clear();

        let mut highest = 0.0;
        for start in 0..self.nails.len() - 1 {
            for end in start + 1..self.nails.len() {
                let (start_x, start_y) = self.nails[start as usize];
                let (end_x, end_y) = self.nails[end as usize];

                let values = XiaolinWu::<f32, i16>::new(
                    (start_x as f32, start_y as f32),
                    (end_x as f32, end_y as f32),
                )
                .collect::<Vec<_>>();

                let mut string = Array1::zeros(self.canvas.len());

                for ((x, y), value) in values {
                    if let Some(index) = self
                        .canvas
                        .iter()
                        .position(|(x0, y0)| *x0 == x as i32 && *y0 == y as i32)
                    {
                        string[index as usize] = value * 175.0;
                    }
                }

                let bitmap = string.map(|v| if *v > 0.0 { 1.0 } else { 0.0 });

                assert_eq!(bitmap.len(), self.canvas.len());
                assert_eq!(b.len(), self.canvas.len());

                let interesting_pixels = bitmap * &b;

                // When no line is drawn
                let without_line = interesting_pixels.dot(&interesting_pixels);

                // When the line is drawn
                let diff = &string - &interesting_pixels;
                let with_line = diff.dot(&diff);

                if without_line > highest {
                    highest = without_line;
                }

                if with_line < without_line {
                    // done.insert(start, end);
                    self.strings.push((start as u16, end as u16));
                }
            }
        }
    }

    pub fn clear(&mut self) {
        // self.filled_in = vec![false; self.canvas.len()];
        self.strings = Vec::new();
    }

    // Getters and setters

    // pub fn get_nail_count(&self) -> u16 {
    //     self.nail_count
    // }

    // pub fn set_nail_count(&mut self, count: u16) {
    //     self.nail_count = count;
    // }

    pub fn get_pixel_size(&self) -> u32 {
        self.pixel_size
    }

    pub fn set_pixel_size(&mut self, size: u32) {
        self.pixel_size = size;
        self.resize();
    }

    pub fn get_radius(&self) -> u32 {
        self.radius
    }

    pub fn strings_size(&self) -> usize {
        self.strings.len() * 2 // each line is two points
    }

    pub fn strings(&self) -> *const (u16, u16) {
        self.strings.iter().cloned().collect::<Vec<_>>().as_ptr()
    }

    pub fn nails_size(&self) -> usize {
        self.nails.len() * 2
    }

    pub fn nails(&self) -> *const (i32, i32) {
        self.nails.as_ptr()
    }

    pub fn canvas_size(&self) -> usize {
        self.canvas.len() * 2 // each line is two points
    }

    pub fn canvas(&self) -> *const (i32, i32) {
        self.canvas.as_ptr()
    }

    pub fn filled_in(&self) -> *const bool {
        self.filled_in.as_ptr()
    }
}
