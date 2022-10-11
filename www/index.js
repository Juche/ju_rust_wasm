// import * as wasm from 'ju-rust-wasm';
// import { greet, Universe } from 'ju-rust-wasm';
import { Universe } from 'ju-rust-wasm';

// 设置每个细胞的大小
const CELL_SIZE = 5; // px
// 设置世界格子边框的颜色
const GRID_COLOR = '#CCCCCC';
// 设置细胞死亡颜色
const DEAD_COLOR = '#FFFFFF';
// 设置细胞存活颜色
const ALIVE_COLOR = '#000000';

// 实例化世界，并获取世界的宽高
const universe = Universe.new();
const width = universe.width();
const height = universe.height();

// 操作DOM创建一个画布
// 并设置一个略大于所有细胞的宽高，用于包裹细胞
const canvas = document.getElementById('game-of-life-canvas');
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');
// 暂停功能的实现开始====
let animationId = null;

const isPaused = () => {
  return animationId === null;
};

const playPauseButton = document.getElementById('play-pause');

const play = () => {
  playPauseButton.textContent = '⏸';
  renderLoop();
};

const pause = () => {
  playPauseButton.textContent = '▶';
  cancelAnimationFrame(animationId);
  animationId = null;
};

playPauseButton.addEventListener('click', (event) => {
  if (isPaused()) {
    play();
  } else {
    pause();
  }
});
// 暂停功能的实现结束====

// 绘制循环
const renderLoop = () => {
  // 对fps进行渲染
  fps.render();
  // 触发生命周期迭代
  universe.tick();
  // 绘制世界格子
  drawGrid();
  // 绘制细胞存活状况
  drawCells();

  animationId = requestAnimationFrame(renderLoop);
};

// 绘制格子的具体实现
const drawGrid = () => {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  // Vertical lines.
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
};

// 绘制细胞的具体实现
const drawCells = () => {
  ctx.beginPath();

  // 绘制活细胞
  ctx.fillStyle = ALIVE_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      // 调用了世界获取细胞存活状态的api
      if (!universe.is_cell_alive(row, col)) {
        continue;
      }

      ctx.fillRect(col * (CELL_SIZE + 1) + 1, row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE);
    }
  }

  // 绘制死细胞
  ctx.fillStyle = DEAD_COLOR;
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (universe.is_cell_alive(row, col)) {
        continue;
      }

      ctx.fillRect(col * (CELL_SIZE + 1) + 1, row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE);
    }
  }

  ctx.stroke();
};

// fps的具体实现
const fps = new (class {
  constructor() {
    this.fps = document.getElementById('fps');
    this.frames = [];
    this.lastFrameTimeStamp = performance.now();
  }

  render() {
    // Convert the delta time since the last frame render into a measure
    // of frames per second.
    const now = performance.now();
    const delta = now - this.lastFrameTimeStamp;
    this.lastFrameTimeStamp = now;
    const fps = (1 / delta) * 1000;

    // Save only the latest 100 timings.
    this.frames.push(fps);
    if (this.frames.length > 100) {
      this.frames.shift();
    }

    // Find the max, min, and mean of our 100 latest timings.
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (let i = 0; i < this.frames.length; i++) {
      sum += this.frames[i];
      min = Math.min(this.frames[i], min);
      max = Math.max(this.frames[i], max);
    }
    let mean = sum / this.frames.length;

    // Render the statistics.
    this.fps.textContent = `
      Frames per Second:
      latest = ${Math.round(fps)}
      avg of last 100 = ${Math.round(mean)}
      min of last 100 = ${Math.round(min)}
      max of last 100 = ${Math.round(max)}
      `.trim();
  }
})();

// 手动调用第一次迭代
drawGrid();
drawCells();
play();
