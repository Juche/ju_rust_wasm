mod utils;

// use std::fmt;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
    // TODO:console / Math / Date ...
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    // #[wasm_bindgen(js_namespace = Math)]
    // fn round(u: &u32);
}

#[wasm_bindgen]
pub fn r_alert(name: &str) {
    alert(&format!("Hello {}! What a nice day!", name));
}

#[wasm_bindgen]
pub fn r_log(str: &str) {
    log(&format!("{}", str));
}

// #[wasm_bindgen]
// pub fn r_round(num: &u32) {
//     round(num);
// }

// extern crate web_sys;
// macro_rules! log {
//     ( $($t:tt)* ) => {
//         web_sys::console::log_1( &format!($($t)* ).into());
//     };
// }

#[derive(Debug, Copy, Clone, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

impl Cell {
    fn toggle(&mut self) {
        *self = match *self {
            Cell::Dead => Cell::Alive,
            Cell::Alive => Cell::Dead,
        }
    }
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
}

#[wasm_bindgen]
impl Universe {
    pub fn new(width: u32, height: u32) -> Self {
        // pub fn new() -> Self {
        utils::set_panic_hook();
        // let (width, height) = (128, 128);
        // let width = 128;
        // let height = 128;
        let center_row_start_idx = width * (height - 1) / 2;
        let center_row_end_idx = center_row_start_idx + width;
        let center_col_idx = (width - 1) / 2;

        let cells = (0..width * height)
            .map(|i| {
                // log!("{},", i);
                // if i % 1 == 0 || i % 3 == 0 || i % 5 == 0 || i % 7 == 0 {
                if i % width == center_col_idx
                    || (i >= center_row_start_idx && i < center_row_end_idx)
                {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();
        Universe {
            width,
            height,
            cells,
        }
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn set_width(&mut self, width: u32) {
        self.width = width;
        self.cells = (0..width * self.height).map(|_i| Cell::Dead).collect();
    }

    pub fn set_height(&mut self, height: u32) {
        self.height = height;
        self.cells = (0..self.width * height).map(|_i| Cell::Dead).collect();
    }

    pub fn is_cell_alive(&self, row: u32, column: u32) -> bool {
        let idx = self.get_index(row, column);
        self.cells[idx] == Cell::Alive
    }

    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    pub fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        // ???????????????????????????????????????
        let (north, south, west, east) = (
            if row == 0 { self.height - 1 } else { row - 1 },
            if row == self.height - 1 { 0 } else { row + 1 },
            if column == 0 {
                self.width - 1
            } else {
                column - 1
            },
            if column == self.width - 1 {
                0
            } else {
                column + 1
            },
        );
        // ???????????????????????????
        let position = [
            (north, column), // ???
            (south, column), // ???
            (row, west),     // ???
            (row, east),     // ???
            (north, west),   // ??????
            (north, east),   // ??????
            (south, west),   // ??????
            (south, east),   // ??????
        ];

        let mut count = 0;
        for (row, col) in position.iter() {
            let index = self.get_index(*row, *col);
            count += self.cells[index] as u8;
        }
        count
    }

    pub fn tick(&mut self) {
        // ???????????????????????????????????????????????????
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                // ??????????????????
                let is_cell_alive = self.is_cell_alive(row, col);
                // ?????????????????????
                let live_neighbors = self.live_neighbor_count(row, col);

                // log!(
                //     "cell[{}, {}] is initially {:?} and has {} live neighbors",
                //     row,
                //     col,
                //     is_cell_alive,
                //     live_neighbors
                // );

                // ?????????
                let next_cell = match (is_cell_alive, live_neighbors) {
                    // 1. ????????????????????????????????????????????????2??????????????????????????????
                    (true, x) if x < 2 => Cell::Dead,
                    // 2. ?????????????????????????????????????????????2???3??????????????????????????????
                    (true, 2) | (true, 3) => Cell::Alive,
                    // 3. ????????????????????????????????????????????????3??????????????????????????????
                    (true, x) if x > 3 => Cell::Dead,
                    // 4. ????????????????????????????????????????????????3????????????????????????????????????
                    (false, 3) => Cell::Alive,
                    // ?????????????????????????????????
                    _ => Cell::Dead,
                };
                let idx = self.get_index(row, col);

                // log!("    it becomes {:?}", next_cell);

                next[idx] = next_cell;
            }
        }

        self.cells = next;
    }

    pub fn toggle_cell(&mut self, row: u32, column: u32) {
        let idx = self.get_index(row, column);
        self.cells[idx].toggle();
    }

    // pub fn empty_cells(&mut self, cells: &[(u32, u32)]) {
    //     for (row, col) in cells.iter().cloned() {
    //         let idx = self.get_index(row, col);
    //         self.cells[idx] = Cell::Alive;
    //     }
    // }
}

impl Universe {
    pub fn get_cells(&self) -> &[Cell] {
        &self.cells
    }

    pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
        for (row, col) in cells.iter().cloned() {
            let idx = self.get_index(row, col);
            self.cells[idx] = Cell::Alive;
        }
    }
}
