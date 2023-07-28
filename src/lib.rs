mod utils;

use std::{collections::HashSet, f64::consts::PI};

extern crate js_sys;
use ndarray::{concatenate, Array1, Array2, Axis};
use wasm_bindgen::prelude::*;

const NAIL_COUNT: u16 = 50;
const RADIUS: u16 = 100;
const LINE_COUNT: u32 = NAIL_COUNT as u32 * (NAIL_COUNT - 1) as u32 / 2 as u32;
const SIDE_LENGTH: u16 = RADIUS * 2 + 1;
const PIXEL_COUNT: u32 = SIDE_LENGTH as u32 * SIDE_LENGTH as u32;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

#[wasm_bindgen]
pub struct Disk {
    nail_count: u16,
    radius: u16,
    strings: Vec<(u16, u16)>, // (x, y) means there exists a line between nail x to nail y
    image: Vec<u8>,
    a: Array2<f64>,
    x: Array1<f64>,
}

#[wasm_bindgen]
pub fn from_nails_to_index(source_nail: u16, target_nail: u16) -> u16 {
    assert!(source_nail < target_nail, "a must be less than b");
    assert!(target_nail < NAIL_COUNT, "b must be less than NAIL_COUNT");

    return (NAIL_COUNT * (NAIL_COUNT - 1) / 2)
        - ((NAIL_COUNT - source_nail) * ((NAIL_COUNT - source_nail) - 1) / 2)
        + target_nail
        - source_nail
        - 1;
}

pub fn from_coordinates_to_pixel(x: u16, y: u16) -> u16 {
    assert!(x < SIDE_LENGTH, "x must be less than SIDE_LENGTH");
    assert!(y < SIDE_LENGTH, "y must be less than SIDE_LENGTH");

    return y * SIDE_LENGTH + x;
}

pub fn from_pixel_to_coordinates(pixel: u32) -> (u32, u32) {
    assert!(
        pixel < PIXEL_COUNT,
        "pixel must be less than PIXEL_COUNT = SIDE_LENGTH * SIDE_LENGTH"
    );

    return (
        pixel % (RADIUS as u32 * 2 + 1),
        pixel / (RADIUS as u32 * 2 + 1),
    );
}

fn from_index_to_nails(index: u16) -> (u16, u16) {
    assert!(
        index < NAIL_COUNT * (NAIL_COUNT - 1) / 2,
        "index must be less than NAIL_COUNT * (NAIL_COUNT - 1) / 2"
    );

    let mut a = 0;
    while (NAIL_COUNT * (NAIL_COUNT - 1) / 2 - ((NAIL_COUNT - a) * ((NAIL_COUNT - a) - 1) / 2))
        <= index
    {
        a += 1;
    }
    a -= 1;

    let b = index + a + 1
        - (NAIL_COUNT * (NAIL_COUNT - 1) / 2 - ((NAIL_COUNT - a) * ((NAIL_COUNT - a) - 1) / 2));

    return (a, b);
}

#[wasm_bindgen]
pub fn nail_index_to_x(nail_index: u16) -> u16 {
    assert!(
        nail_index < NAIL_COUNT,
        "nail_index must be less than NAIL_COUNT"
    );

    let angle = (2.0 * PI * nail_index as f64) / NAIL_COUNT as f64;

    return (RADIUS as f64 + RADIUS as f64 * angle.cos()) as u16;
}

#[wasm_bindgen]
pub fn nail_index_to_y(nail_index: u16) -> u16 {
    assert!(
        nail_index < NAIL_COUNT,
        "nail_index must be less than NAIL_COUNT"
    );

    let angle = (2.0 * PI * nail_index as f64) / NAIL_COUNT as f64;

    return SIDE_LENGTH - 1 - (RADIUS as f64 + RADIUS as f64 * angle.sin()) as u16;
}

#[wasm_bindgen]
impl Disk {
    pub fn new() -> Disk {
        utils::set_panic_hook();

        let mut lines = Vec::new();

        log!("Calculating lines...");
        for start in 0..NAIL_COUNT - 1 {
            for end in start + 1..NAIL_COUNT {
                let pixels = get_line_pixels(
                    (nail_index_to_x(start), nail_index_to_y(start)),
                    (nail_index_to_x(end), nail_index_to_y(end)),
                );

                lines.push(pixels)
            }
        }

        // Reshape vectors into 2D arrays with a single column and store them in a Vec
        log!("Building matrix...");
        let mut counter = 0;
        let columns: Vec<Array2<f64>> = lines
            .iter()
            .map(|pixels| {
                let mut pixels_vector = Array2::zeros((PIXEL_COUNT as usize, 1));

                counter += 1;

                pixels.iter().for_each(|index| {
                    pixels_vector[[*index as usize, 0]] = 100.0;
                });

                pixels_vector
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
            nail_count: NAIL_COUNT,
            radius: RADIUS,
            strings: Vec::new(),
            image: vec![0; PIXEL_COUNT as usize],
            a,
            x,
        }
    }

    pub fn get_nail_count(&self) -> u16 {
        self.nail_count
    }

    pub fn get_radius(&self) -> u16 {
        self.radius
    }

    pub fn lines_size(&self) -> usize {
        self.strings.len() * 2 // each line is two points
    }

    pub fn lines(&self) -> *const (u16, u16) {
        self.strings.iter().cloned().collect::<Vec<_>>().as_ptr()
    }

    pub fn image_size(&self) -> usize {
        self.image.len() // each line is two points
    }

    pub fn image(&self) -> *const u8 {
        self.image.iter().copied().collect::<Vec<_>>().as_ptr()
    }

    pub fn clear(&mut self) {
        // Reset image
        self.image = vec![0; PIXEL_COUNT as usize];

        self.strings = Vec::new();
    }

    pub fn draw(&mut self, canvas_left: u16, canvas_top: u16) {
        let thickness: i16 = 5;
        // Draw a circle around this point
        // Draw a square around the point with the size determined by the brush thickness
        for i in -thickness..=thickness {
            for j in -thickness..=thickness {
                let x = canvas_left as i16 + i;
                let y = canvas_top as i16 + j;

                self.image[from_coordinates_to_pixel(x as u16, y as u16) as usize] = 255;
            }
        }
    }

    pub fn stringify(&mut self) {
        // self.image.iter().enumerate().for_each(|(i, x)| {
        //     if *x > 0 {
        //         log!("{i} = {x} ");
        //     }
        // });

        let b: Array1<f64> = self
            .image
            .iter()
            .map(|x| *x as f64)
            .collect::<Vec<_>>()
            .into();

        // We want to know ||Ax - b||^2

        // GOAL
        let mut source_nail = 0;

        let mut done = HashSet::new();
        let mut improvement = true;

        while improvement {
            improvement = false;

            // Find the line that minimizes the Euclidean difference the most
            for target_nail in 0..NAIL_COUNT {
                if target_nail == source_nail {
                    continue;
                }

                if done.contains(&(source_nail, target_nail))
                    || done.contains(&(target_nail, source_nail))
                {
                    continue;
                }

                let index = if source_nail > target_nail {
                    from_nails_to_index(target_nail, source_nail)
                } else {
                    from_nails_to_index(source_nail, target_nail)
                };

                // Before: difference when not placing the string

                let without_line = self.a.column(index as usize).map(|_| 1.0) * &b;
                let without_line_dot = without_line.dot(&without_line);
                let with_line = &self.a.column(index as usize) - &b;
                let with_line_dot = with_line.dot(&with_line);

                if with_line_dot < without_line_dot {
                    done.insert((source_nail, target_nail));
                    self.x[index as usize] = 1.0;
                    log!("Adding!");
                    self.strings.push((source_nail, target_nail));
                    source_nail = target_nail;
                    improvement = true;
                    break;
                } else {
                }

                // let mut x_clone = self.x.clone();

                // // Set the line to 1
                // x_clone[index as usize] = 1.0;

                // // Calculate Ax
                // let ax = self.a.dot(&x_clone);

                // // Calculate Ax - b
                // let diff: Array1<f64> = &ax - &b;

                // // Calculate ||Ax - b||^2
                // let norm_squared = diff.dot(&diff);

                // if norm_squared < smallest {
                //     // log!("NEW BEST: {}, index {index}", norm_squared);
                //     smallest = norm_squared;
                //     new_string = index;
                //     best_target_nail = target_nail;
                // }
            }
        }

        self.image = vec![0; PIXEL_COUNT as usize];
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
        coordinates.push(x0 as u32 + y0 as u32 * SIDE_LENGTH as u32); //TODO check

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
