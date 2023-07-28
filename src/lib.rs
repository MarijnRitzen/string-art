mod utils;

extern crate js_sys;
use line_drawing::{BresenhamCircle, XiaolinWu};
use ndarray::Array1;
use wasm_bindgen::prelude::*;

const RADIUS: u16 = 300;
const PADDING: u16 = 3;
const STARTING_PIXEL_SIZE: u16 = 16;
const SIDE_LENGTH: u16 = RADIUS * 2 + 2;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

pub fn from_coordinates_to_pixel(x: u16, y: u16) -> u16 {
    assert!(x < SIDE_LENGTH, "x must be less than SIDE_LENGTH");
    assert!(y < SIDE_LENGTH, "y must be less than SIDE_LENGTH");

    return y * SIDE_LENGTH + x;
}

pub fn from_pixel_to_coordinates(pixel: u32) -> (u32, u32) {
    // assert!(
    //     pixel < PIXEL_COUNT,
    //     "pixel must be less than PIXEL_COUNT = SIDE_LENGTH * SIDE_LENGTH"
    // );

    return (
        pixel % (RADIUS as u32 * 2 + 1),
        pixel / (RADIUS as u32 * 2 + 1),
    );
}

#[wasm_bindgen]
pub struct Disk {
    // nail_count: u16,
    pixel_size: u16,
    radius: u16,
    strings: Vec<(u16, u16)>, // (x, y) means there exists a line between nail x to nail y
    nails: Vec<(i32, i32)>,
    canvas: Vec<(i32, i32)>,
    filled_in: Vec<bool>,
    // a: Array2<f32>,
    // x: Array1<f64>,
}

#[wasm_bindgen]
impl Disk {
    pub fn new() -> Disk {
        utils::set_panic_hook();

        let mut disk = Disk {
            pixel_size: STARTING_PIXEL_SIZE,
            radius: RADIUS,
            strings: Vec::new(),
            canvas: Vec::new(),
            filled_in: Vec::new(),
            nails: Vec::new(), // a,
        };

        disk.set_nails();
        disk.set_canvas();
        disk.clear();

        disk
    }

    fn set_nails(&mut self) {
        self.nails = BresenhamCircle::new(
            (RADIUS / self.pixel_size) as i32,
            (RADIUS / self.pixel_size) as i32,
            (RADIUS / self.pixel_size) as i32 + PADDING as i32,
        )
        .collect::<Vec<_>>();
    }

    fn set_canvas(&mut self) {
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

        self.filled_in.resize(self.canvas.len(), false)
    }

    pub fn draw(&mut self, canvas_left: u16, canvas_top: u16) {
        for (i, (x, y)) in self.canvas.iter().enumerate() {
            if *x as u16 == canvas_left / self.pixel_size
                && *y as u16 == canvas_top / self.pixel_size
            {
                self.filled_in[i] = true;
            }
        }
    }

    pub fn stringify(&mut self) {
        // let x: Array1<f64> = Array1::zeros(LINE_COUNT as usize);
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
        self.filled_in = vec![false; self.canvas.len()];
        self.strings = Vec::new();
    }

    // Getters and setters

    // pub fn get_nail_count(&self) -> u16 {
    //     self.nail_count
    // }

    // pub fn set_nail_count(&mut self, count: u16) {
    //     self.nail_count = count;
    // }

    pub fn get_pixel_size(&self) -> u16 {
        self.pixel_size
    }

    pub fn set_pixel_size(&mut self, size: u16) {
        self.pixel_size = size;
        self.set_nails();
        self.set_canvas();
    }

    pub fn get_radius(&self) -> u16 {
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
