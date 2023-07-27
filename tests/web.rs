//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use ndarray::array;
use string_art::get_line_pixels;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn pass() {
    assert_eq!(1 + 1, 2);
}

fn get_index(col: u32, row: u32) -> u32 {
    row * 7 + col
}

#[wasm_bindgen_test]
fn test_pixel_line() {
    // Assuming RADIUS = 3
    assert_eq!(
        get_line_pixels((0, 0), (3, 3)),
        vec![
            get_index(0, 0),
            get_index(1, 1),
            get_index(2, 2),
            get_index(3, 3)
        ]
    );

    assert_eq!(
        get_line_pixels((0, 0), (3, 0)),
        vec![
            get_index(0, 0),
            get_index(1, 0),
            get_index(2, 0),
            get_index(3, 0)
        ]
    );
}

#[wasm_bindgen_test]
fn test_norm_squared() {
    // Two horizontal lines in a 2 x 3 pixel world
    let mut a = array![
        [1.0, 0.0],
        [1.0, 0.0],
        [1.0, 0.0],
        [0.0, 1.0],
        [0.0, 1.0],
        [0.0, 1.0]
    ];

    // Top left and middle top pixel drawn in
    let mut b = array![1.0, 1.0, 0.0, 0.0, 0.0, 0.0];

    // Just using the first line should be better than using the second line
    let x = array![1.0, 0.0];

    let diff = a.dot(&x) - &b;

    let norm_squared = diff.dot(&diff);

    assert_eq!(norm_squared, 1.0);
}
