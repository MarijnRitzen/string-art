mod utils;

use std::f64::consts::PI;

extern crate js_sys;
use ndarray::{concatenate, Array1, Array2, Axis};
use wasm_bindgen::prelude::*;

const NAIL_COUNT: u16 = 4;
const RADIUS: u16 = 3;
const LINE_COUNT: u32 = NAIL_COUNT as u32 * (NAIL_COUNT - 1) as u32 / 2 as u32;
const PIXEL_COUNT: u32 = (RADIUS * 2 + 1) as u32 * (RADIUS * 2 + 1) as u32;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
#[derive(Debug)]
pub struct Line {
    start: u16,
    end: u16,
    pixels: Vec<u32>, // Array of indices where top left is 0 and goes left to right, top to bottom
}

#[wasm_bindgen]
pub struct Disk {
    num_points: u16,
    radius: u16,
    drawn: Vec<(u16, u16)>, // (x, y) means there exists a line between nail x to nail y
    image: Vec<u8>,
    lines: Vec<Line>,
    a: Array2<f64>,
    x: Array1<f64>,
}

#[wasm_bindgen]
pub fn get_line_index(source_nail: u16, target_nail: u16) -> u16 {
    source_nail * (NAIL_COUNT - 1) + target_nail
}

fn from_line_index(index: u16) -> (u16, u16) {
    (index / (NAIL_COUNT - 1), index % (NAIL_COUNT - 1))
}

#[wasm_bindgen]
impl Disk {
    pub fn new() -> Disk {
        utils::set_panic_hook();

        let mut lines = Vec::new();

        log!("Calculating lines...");
        for start in 0..NAIL_COUNT - 1 {
            for end in start + 1..NAIL_COUNT {
                let start_angle = (2.0 * PI * start as f64) / NAIL_COUNT as f64;

                let start_x = (RADIUS as f64 + RADIUS as f64 * start_angle.cos()) as u16;
                let start_y = (RADIUS as f64 + RADIUS as f64 * start_angle.sin()) as u16;

                let end_angle = (2.0 * PI * end as f64) / NAIL_COUNT as f64;

                let end_x = (RADIUS as f64 + RADIUS as f64 * end_angle.cos()) as u16;
                let end_y = (RADIUS as f64 + RADIUS as f64 * end_angle.sin()) as u16;

                let pixels = get_line_pixels((start_x, start_y), (end_x, end_y));

                lines.push(Line { start, end, pixels })
            }
        }
        log!("{lines:?}");

        // Reshape vectors into 2D arrays with a single column and store them in a Vec
        log!("Building matrix...");
        let mut counter = 0;
        let columns: Vec<Array2<f64>> = lines
            .iter()
            .map(|line| {
                let mut pixels = Array2::zeros((PIXEL_COUNT as usize, 1));

                counter += 1;

                if counter % 1_000 == 0 {
                    log!("{} / {}", counter, LINE_COUNT);
                }

                line.pixels.iter().for_each(|index| {
                    if index > &PIXEL_COUNT {
                        log!("Index out of bounds");
                    }
                    pixels[[*index as usize, 0]] = 255.0;
                });

                pixels
            })
            .collect();

        // Convert Vec of 2D arrays into an Array of 2D arrays, and concatenate them into a matrix

        let a: Array2<f64> = concatenate(
            Axis(1),
            &columns.iter().map(|v| v.view()).collect::<Vec<_>>(),
        )
        .unwrap();

        let x: Array1<f64> = Array1::zeros(LINE_COUNT as usize);

        log!("Ready!");

        Disk {
            num_points: NAIL_COUNT,
            radius: RADIUS,
            drawn: Vec::new(),
            image: vec![0; PIXEL_COUNT as usize],
            lines,
            a,
            x,
        }
    }

    pub fn get_num_points(&self) -> u16 {
        self.num_points
    }

    pub fn get_radius(&self) -> u16 {
        self.radius
    }

    pub fn size(&self) -> usize {
        self.drawn.len() * 2 // each line is two points
    }

    pub fn lines(&self) -> *const (u16, u16) {
        self.drawn.iter().cloned().collect::<Vec<_>>().as_ptr()
    }

    pub fn draw(&mut self, canvas_left: u16, canvas_top: u16) {
        self.image[canvas_top as usize * (self.radius as usize * 2 + 1) + canvas_left as usize] =
            255;

        log!(
            "Drawn index {} ",
            canvas_top as usize * (self.radius as usize * 2 + 1) + canvas_left as usize
        );
        log!("Drawing...");

        let b: Array1<f64> = self
            .image
            .iter()
            .map(|x| *x as f64)
            .collect::<Vec<_>>()
            .into();

        // We want to know ||Ax - b||^2

        // GOAL
        let mut source_nail = 0;

        let mut smallest_norm_squares = f64::MAX;

        loop {
            // Find the line that minimizes the Euclidean difference the most
            let mut smallest = f64::MAX;
            let mut best_target_nail = 0;

            for target_nail in 0..NAIL_COUNT {
                if target_nail == source_nail {
                    continue;
                }

                get_line_index(source_nail, target_nail);

                let x_clone = self.x.clone();

                // Calculate Ax
                let ax = self.a.dot(&x_clone);

                // Calculate Ax - b
                let diff: Array1<f64> = &ax - &b;

                // Calculate ||Ax - b||^2
                let norm_squared = diff.dot(&diff);

                if norm_squared < smallest {
                    smallest = norm_squared;
                    best_target_nail = target_nail;
                    log!("{} {}", norm_squared, smallest);
                }
            }

            if smallest < smallest_norm_squares {
                smallest_norm_squares = smallest;
                self.x[get_line_index(source_nail, best_target_nail) as usize] = 1.0;
                source_nail = best_target_nail;
            } else {
                break;
            }
        }

        // Update the lines
        for line in &self.x {
            if *line > 0.0 {
                let (source_nail, target_nail) = from_line_index(*line as u16);

                self.drawn.push((source_nail, target_nail));
            }
        }
    }
}

// For calculating the pixels that intersect with some line
pub fn get_line_pixels(start: (u16, u16), end: (u16, u16)) -> Vec<u32> {
    let mut coordinates = Vec::new();

    let (mut x0, mut y0) = (start.0 as i32, start.1 as i32);
    let (x1, y1) = (end.0 as i32, end.1 as i32);

    let dx = (x1 - x0).abs();
    let dy = (y1 - y0).abs();

    let sx = if x0 < x1 { 1 } else { -1 };
    let sy = if y0 < y1 { 1 } else { -1 };

    let mut err = if dx > dy { dx } else { -dy } / 2;
    let mut err2;

    loop {
        coordinates.push(x0 as u32 + y0 as u32 * (RADIUS * 2 + 1) as u32); //TODO check

        if x0 == x1 && y0 == y1 {
            break;
        }

        err2 = err;

        if err2 > -dx {
            err -= dy;
            x0 += sx;
        }

        if err2 < dy {
            err += dx;
            y0 += sy;
        }
    }

    coordinates
}
