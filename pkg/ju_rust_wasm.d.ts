/* tslint:disable */
/* eslint-disable */
/**
*/
export class Universe {
  free(): void;
/**
* @param {number} width
* @param {number} height
* @returns {Universe}
*/
  static new(width: number, height: number): Universe;
/**
* @returns {number}
*/
  width(): number;
/**
* @returns {number}
*/
  height(): number;
/**
* @param {number} width
*/
  set_width(width: number): void;
/**
* @param {number} height
*/
  set_height(height: number): void;
/**
* @param {number} row
* @param {number} column
* @returns {boolean}
*/
  is_cell_alive(row: number, column: number): boolean;
/**
* @param {number} row
* @param {number} column
* @returns {number}
*/
  live_neighbor_count(row: number, column: number): number;
/**
*/
  tick(): void;
/**
* @param {number} row
* @param {number} column
*/
  toggle_cell(row: number, column: number): void;
}
