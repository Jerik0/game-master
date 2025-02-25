import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {BitArray} from '../../../helpers/board-helpers';

@Component({
  selector: 'app-game-of-life',
  imports: [
    MatButton
  ],
  templateUrl: './game-of-life.component.html',
  styleUrl: './game-of-life.component.css'
})
export class GameOfLifeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', {static: false})
  public canvas!: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;

  boardWidth = 600;
  boardHeight = 600;
  resolution = 4;
  runGame = false;
  rows = this.boardHeight / this.resolution;
  columns = this.boardWidth / this.resolution;
  gameBoard: BitArray[];

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.startGame();
  }

  startGame(): void {
    console.log('Starting Game');


    const board = new Array(this.rows)
      .fill(0)
      .map(() => new Array(this.columns).fill(0).map(() => (Math.random() > 0.5 ? 1 : 0)));

    this.gameBoard = board;
    this.render(this.gameBoard);
    this.animate();
  }

  stopGame(): void {
    const rows = this.boardHeight / this.resolution;
    const columns = this.boardWidth / this.resolution;
    this.gameBoard = new Array(rows)
      .fill(0).map(() => new Array(columns).fill(0));
    this.render(this.gameBoard);
  }

  animate() {
    setTimeout(() => {
      requestAnimationFrame(() => this.animate());
    }, 40)
    this.render(this.gameBoard);
    this.createNextGeneration(this.gameBoard);
  }

  render(board: BitArray[]) {
    const c = this.context;
    const res = this.resolution;
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        c.beginPath();
        c.rect(colIndex * res, rowIndex * res, res, res);
        c.fillStyle = cell ? '#f6fff8' : '#011627';

        if (cell && this.neighborsOf(rowIndex, colIndex) === 2) {
          c.fillStyle = 'cyan';
        }

        if (cell && this.neighborsOf(rowIndex, colIndex) === 3) {
          c.fillStyle = '#fa9500';
        }
        c.fill();
      })
    })
  }

  createNextGeneration(board: BitArray[]): void {
    // copy the current state of our game board (array)
    const nextGeneration = this.gameBoard.map((innerArr) => [...innerArr]);

    // decide if living or dead based on rules for each cell
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const becomeLivingCellInAnyCase = this.neighborsOf(rowIndex, colIndex) === 3;
        const keepAlive = cell && this.neighborsOf(rowIndex, colIndex) === 2;
        const newCellValue = becomeLivingCellInAnyCase || keepAlive ? 1 : 0;

        nextGeneration[rowIndex][colIndex] = newCellValue;
      });
    });
    // update game board with next generation
    this.gameBoard = nextGeneration;
  }

  neighborsOf(rowIndex: number, colIndex: number) {
    const board = this.gameBoard;
    const rowAbove = board[rowIndex - 1] || [];
    const rowBelow = board[rowIndex + 1] || [];
    const fieldBefore = board[rowIndex][colIndex - 1];
    const fieldAfter = board[rowIndex][colIndex + 1];

    return [
      rowAbove[colIndex - 1],
      rowAbove[colIndex],
      rowAbove[colIndex + 1],
      rowBelow[colIndex - 1],
      rowBelow[colIndex],
      rowBelow[colIndex + 1],
      fieldBefore,
      fieldAfter
      // @ts-ignore
    ].reduce((a, b) => (b != null ? a + b : a), 0);
  }
}
