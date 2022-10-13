//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn pass() {
    assert_eq!(1 + 1, 2);
}

extern crate ju_rust_wasm;
use ju_rust_wasm::Universe;
// #[cfg(test)]
// pub fn input_spaceship() -> Universe {
//     let mut universe = Universe::new(5, 5);
//     universe.set_width(6);
//     universe.set_height(6);
//     // universe.set_cells(&[(2, 2), (2, 3), (3, 2), (3, 3)]);
//     universe.set_cells(&[(1, 2), (2, 2), (3, 2)]);
//     universe
// }

// #[cfg(test)]
// pub fn expected_spaceship() -> Universe {
//     let mut universe = Universe::new(5, 5);
//     universe.set_width(6);
//     universe.set_height(6);
//     // universe.set_cells(&[(2, 2), (2, 3), (3, 2), (3, 3)]);
//     universe.set_cells(&[(2, 1), (2, 2), (2, 3)]);
//     universe
// }

// #[wasm_bindgen_test]
// pub fn test_tick() {
//     let mut input_universe = input_spaceship();
//     let expected_universe = expected_spaceship();
//     input_universe.tick();
//     assert_eq!(&input_universe.get_cells(), &expected_universe.get_cells());
// }

#[cfg(test)]
pub fn expected_spaceship() -> Universe {
    // let mut universe = Universe::new(3, 3);
    // universe.set_cells(&[(0, 1), (1, 0), (1, 1), (1, 2), (2, 1)]);
    let mut universe = Universe::new(5, 5);
    universe.set_cells(&[
        (0, 2),
        (1, 2),
        (2, 0),
        (2, 1),
        (2, 2),
        (2, 3),
        (2, 4),
        (3, 2),
        (4, 2),
    ]);
    universe
}

#[wasm_bindgen_test]
pub fn test_new() {
    // let new_universe = Universe::new(3, 3);
    let new_universe = Universe::new(5, 5);
    let expected_universe = expected_spaceship();
    assert_eq!(&new_universe.get_cells(), &expected_universe.get_cells());
}
