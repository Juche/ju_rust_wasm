<template>
  <!-- <div ref="gameCtn" id="gameCtn"></div> -->
  <noscript
    >This page contains webassembly and javascript content, please enable javascript in your
    browser.</noscript
  >
  <div class="op-group">
    <input id="rowCount" value="" type="number" placeholder="输入行列数" />
    <button id="createUniverse">创建/更新宇宙</button>
    <button id="playPause">▶</button>
    <button id="nextTick">⏭</button>
  </div>
  <canvas id="gameCanvas"></canvas>
</template>

<script lang="ts" setup>
  import init, { r_alert, r_log, Universe } from '@pack/life_game';
  // import { ref } from 'vue';
  // const gameCtn = ref();
  init().then(() => {
    // alert('Welcome to Universe');
    // debugger;

    r_alert('host function alert');
    console.log(`🚀 ~ createdUniverse ~ r_alert`, r_alert);
    r_log('host function console log');

    // const randomNum = r_round();
    // console.log(`🚀 ~ init ~ randomNum`, randomNum);

    // 设置每个细胞的大小
    const CELL_SIZE = 1; // px
    // 设置世界格子边框的颜色
    const GRID_COLOR = '#fff';
    // 设置细胞死亡颜色
    const DEAD_COLOR = '#fff';
    // 设置细胞存活颜色
    const ALIVE_COLOR = '#000';

    // 实例化世界，并获取世界的宽高
    let universe: Universe, width: number, height: number;

    // 操作DOM创建一个画布
    const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;
    // 暂停功能的实现开始====
    let animationId: number | null = null;

    const isPaused = () => {
      return animationId === null;
    };

    const playPauseButton = document.getElementById('playPause') as HTMLButtonElement;
    const nextTickButton = document.getElementById('nextTick') as HTMLButtonElement;

    const play = () => {
      playPauseButton.textContent = '⏸';
      renderLoop();
    };

    const pause = () => {
      playPauseButton.textContent = '▶';
      cancelAnimationFrame(animationId as number);
      animationId = null;
    };

    nextTickButton?.addEventListener('click', () => {
      renderTick();
    });

    playPauseButton?.addEventListener('click', () => {
      if (isPaused()) {
        play();
      } else {
        pause();
      }
    });
    // 暂停功能的实现结束====

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

    // 绘制一次迭代
    const renderTick = () => {
      // debugger;
      // 对fps进行渲染
      // fps.render();
      // 触发生命周期迭代
      universe.tick();
      // 绘制世界格子
      drawGrid();
      // 绘制细胞存活状况
      drawCells();
    };

    // 绘制循环
    const renderLoop = () => {
      renderTick();

      animationId = requestAnimationFrame(renderLoop);
    };

    const rowCount = document.getElementById('rowCount') as HTMLInputElement;
    function createdUniverse() {
      // debugger;
      const count = Number(rowCount.value);
      if (!count) {
        alert('请输入行/列数量!');
        return;
      }

      universe = Universe.new(count, count);
      width = universe.width();
      height = universe.height();
      console.log(`🚀 ~ width`, width);
      console.log(`🚀 ~ height`, height);

      // 并设置一个略大于所有细胞的宽高，用于包裹细胞
      canvas.height = (CELL_SIZE + 1) * height + 1;
      canvas.width = (CELL_SIZE + 1) * width + 1;

      drawGrid();
      drawCells();
    }

    document.getElementById('createUniverse')?.addEventListener('click', () => {
      createdUniverse();
    });

    canvas?.addEventListener('click', (event) => {
      const boundingRect = canvas.getBoundingClientRect();

      const scaleX = canvas.width / boundingRect.width;
      const scaleY = canvas.height / boundingRect.height;

      const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
      const canvasTop = (event.clientY - boundingRect.top) * scaleY;

      const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
      const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

      universe.toggle_cell(row, col);

      drawGrid();
      drawCells();
    });
  });
</script>

<style>
  .op-group {
    position: fixed;
    top: 10px;
    left: 20px;
    display: flex;
    margin-bottom: 20px;
  }
  .op-group button {
    margin: 0 10px;
  }
</style>
