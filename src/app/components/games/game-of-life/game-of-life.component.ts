import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-game-of-life',
  imports: [
    MatButton
  ],
  templateUrl: './game-of-life.component.html',
  styleUrl: './game-of-life.component.css'
})
export class GameOfLifeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', {static: true})
  public canvas!: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;

  cellData = [];
  rows = 100;
  columns = 100;
  canvasWidth = 600;
  canvasHeight = 600;
  cellWidth;
  runGame = false;
  updateInterval;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.initializeCellData();
    console.log(this.getNeighbors(2, 2));
  }

  initializeCellData = (): void => {
    for (let i = 0; i < this.rows; i++) {
      this.cellData[i] = [];
      for (let j = 0; j < this.columns; j++) {
        let randomNum = Math.floor(Math.random() * 50);
        this.cellData[i][j] = randomNum > 3 ? 0 : 1;
      }
    }

    this.cellWidth = this.canvasWidth / this.cellData[0].length
    this.drawMap();
  }

  drawMap() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.context.fillStyle = ["#83c5be", "#edf6f9", "cyan", "yellow"][this.cellData[i][j]]
        this.context.fillRect(j * this.cellWidth, i * this.cellWidth, this.cellWidth, this.cellWidth)
      }
    }
  }

  getNeighbors(x: number, y: number): number[] {
    let neighbors = [];
    let checkingCell = this.cellData[x][y];

    if (checkingCell != undefined) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          if (this.isInBounds(x + i, y + j)) {
            neighbors.push(this.cellData[x + i][y + j]);
          }
        }
      }
    }
    return neighbors;
  }

  isInBounds(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.columns;
  }

  updateGame(): void {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let neighborCount = this.getNeighbors(i, j).reduce((a, b) => a + b, 0);
        // console.log('========== New Cell ===============')
        // console.log(`i:j - ${i}:${j}`);
        // console.log(`cell value: ${this.cellData[i][j]}`);
        // console.log(`this.getNeighbors(i, j): ${this.getNeighbors(i, j)}`);
        // console.log(`neighborCount: ${neighborCount}`);

        if (this.cellData[i][j] === 1) {
          // Survival: A live cell with two or three live neighbors survives to the next generation
          if (neighborCount === 2 || neighborCount === 3) continue;

          // Death by isolation: A live cell dies if it has one or fewer live neighbors
          // Death by overcrowding: A live cell dies if it has four or more live neighbors
          if (neighborCount <= 1 || neighborCount >= 4) this.cellData[i][j] = 0;
        }

        // Birth: A dead cell becomes alive if it has exactly three live neighbors
        if (this.cellData[i][j] === 0 && neighborCount === 3) {
          // console.log('this cell is born');
          this.cellData[i][j] = 1;
        }
      }

      this.drawMap();
    }
  }

  toggleRunGame(): void {
    this.runGame = !this.runGame;
    console.log(this.runGame);

    if (this.runGame) {
      this.updateInterval = setInterval(() => {
        this.updateGame();
      }, 100);
    } else {
      clearInterval(this.updateInterval);
      // this.initializeCellData();
    }
  }

  resetGame(): void {
    this.runGame = false;
    clearInterval(this.updateInterval);
    this.initializeCellData();
  }

  advanceOneFrame(): void {
    this.runGame = false;
    clearInterval(this.updateInterval);
    this.updateGame();
  }
}
