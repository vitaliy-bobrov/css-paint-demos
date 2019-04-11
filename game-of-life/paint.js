const GRID_COLOR = '#CCCCCC';
const ALIVE_COLOR = '#000000';

class GameOfLifeWorklet {
  static get inputProperties() {
    return [
      '--universe-cells',
      '--universe-data',
      '--universe-grid-color',
      '--universe-alive-color'
    ];
  }

  getIndex(row, column, width) {
    return row * width + column;
  }

  drawCells(ctx, count, cell, data, color) {
    ctx.beginPath();

    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        const idx = this.getIndex(row, col, count);

        if (data[idx] === 0) continue;

        ctx.fillStyle = color;
        ctx.fillRect(
          col * (cell + 1) + 1,
          row * (cell + 1) + 1,
          cell,
          cell
        );
      }
    }

    ctx.stroke();
  }

  drawGrid(ctx, size, cell, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;

    // Vertical lines.
    for (let i = 0; i <= size; i++) {
      ctx.moveTo(i * (cell + 1) + 1, 0);
      ctx.lineTo(i * (cell + 1) + 1, (cell + 1) * size + 1);
    }

    // Horizontal lines.
    for (let j = 0; j <= size; j++) {
      ctx.moveTo(0, j * (cell + 1) + 1);
      ctx.lineTo((cell + 1) * size + 1, j * (cell + 1) + 1);
    }

    ctx.stroke();
  }

  paint(ctx, geom, props) {
    const gridColor = props.get('--universe-grid-color').toString() || GRID_COLOR;
    const aliveColor = props.get('--universe-alive-color').toString() || ALIVE_COLOR;
    const side = Math.min(geom.width, geom.height);
    const cells = parseInt(props.get('--universe-cells').toString(), 10);
    const cellSize = Math.ceil(side / cells);
    const data = JSON.parse(props.get('--universe-data').toString());

    this.drawGrid(ctx, cells, cellSize, gridColor);
    this.drawCells(ctx, cells, cellSize, data, aliveColor);
  }
}

registerPaint('game-of-life', GameOfLifeWorklet);
