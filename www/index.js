// import * as wasm from 'ju-rust-wasm';
import { greet, Universe } from 'ju-rust-wasm';

greet('Juching & Juche');

const pre = document.getElementById('game-of-life-canvas');
const universe = new Universe.new();
console.log(`🚀 ~ universe`, universe);
const renderLoop = () => {
  pre.textContent = universe.render();
  universe.tick();
  requestAnimationFrame(renderLoop);
};
renderLoop();
