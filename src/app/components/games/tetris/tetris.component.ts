import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Bit, BitArray} from '../../../helpers/board-helpers';

@Component({
  selector: 'app-tetris',
  imports: [],
  templateUrl: './tetris.component.html',
  styleUrl: './tetris.component.css'
})
export class TetrisComponent implements AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;
  boardHeight = 600;
  boardWidth = 600;
  score = 0;
  gameBoard: number[][]
  resolution = 25;
  runGame = false;
  rows = this.boardHeight / this.resolution;
  columns = this.boardWidth / this.resolution;
  // create pieces
  gamePieces = {
    lShapeRight: [
      [[1],[0]],
      [[1],[0]],
      [[1],[0]],
      [[1],[1]]
    ],
    lShapeLeft: [
      [[0],[2]],
      [[0],[2]],
      [[0],[2]],
      [[2],[2]]
    ],
    squareShape: [
      [[3],[3]],
      [[3],[3]]
    ],
    straightShape: [
      [4],
      [4],
      [4],
      [4]
    ],
    zShapeLeft: [
      [[5],[5],[0]],
      [[0],[5],[5]],
    ],
    zShapeRight: [
      [[0],[6],[6]],
      [[6],[6],[0]],
    ],
    tShape: [
      [[0],[7],[0]],
      [[7],[7],[7]],
    ]
  }
  // initialize the board
  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.setBoard();
    // this.insertPiece();
  }

  // handle start game
  startGame(): void {}

  // handle stop game
  stopGame(): void {}

  // handle reset game
  resetGame(): void {}

  setBoard(): void {
    this.gameBoard = new Array(this.rows).fill(0).map(() => new Array(this.columns).fill(0));
    this.render(this.gameBoard);
    this.animate();

    console.log(this.gameBoard);
  }

  updateScore(points: number): void {
    this.score += points;
  }

  render(board: number[][]): void {
    const c =  this.context;
    const res = this.resolution;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        c.beginPath();
        c.rect(colIndex * res, rowIndex * res, res, res);

        if (cell !== 0) {
          console.log(`cell = ${cell}`);
          console.log(cell);
        }

        c.fillStyle = this.colorCell(cell);

        c.fill();
      });
    });
  }

  // update the board with new frame
  updateBoard(): void {

    // if bottom of piece is touching the bottom of the grid
    // or the top of another piece that's inserted,
    // insert it and queue another piece
  }

  // animate the board
  animate(timeoutInterval = 2000): void {
    setTimeout(() => {
      requestAnimationFrame(() => this.animate());
    }, timeoutInterval);
    this.render(this.gameBoard);
    // this.updateBoard();
    this.insertPiece();
  }

  colorCell(cell: number): string {
    console.log('cell in colorCell')
    console.log(cell)
      if (cell == 0) return '#ccf5d0';
      if (cell == 1) return '#fa9500';
      if (cell == 2) return '#4eefc5';
      if (cell == 3) return '#eeff00';
      if (cell == 4) return '#904cf1';
      if (cell == 5) return '#e02186';
      if (cell == 6) return '#53cb12';
      if (cell == 7) return '#1268cb';
      return 'black';
  }

  // randomly queue pieces to insert into board
  insertPiece(): void {
    // copy game board array and insert correct values, then replace it.
    const nextGeneration = this.gameBoard.map((innerArr) => [...innerArr]);
    // where to insert?
    // vertical starting place: first element in shape array goes into the first row of the grid, second to second row and so on
    // horizontal starting place: math.ceil(this.columns / 2)

    // how to insert?
    let gamePieceIndex = Math.floor(Math.random() * 7);
    let pieceToInsert = this.getPropertyByIndex(gamePieceIndex);

    pieceToInsert.forEach((pieceSection: any, i) => {
      for (let j = 0; j < pieceSection.length; j++) {
        nextGeneration[i][j + Math.ceil(this.columns / 2) - 1] = pieceSection[j];
        console.log(nextGeneration[i][j + Math.ceil(this.columns / 2)]);
      }
    });

    this.gameBoard = nextGeneration;
  }

  getPropertyByIndex(index: number): number[][][] {
    const keys = Object.keys(this.gamePieces);
    if (index >= 0 && index < keys.length) {
      const propertyName = keys[index];
      return this.gamePieces[propertyName];
    }
    return undefined;
  }

  // handle controlling of the pieces
  handleMovement(event: KeyboardEvent): void {
    // if cell to the right, left or bottom != 0, don't move there.
    // if the cell to the bottom != 0, leave this piece where it is and generate a new piece
  }

  translatePiece(): void {

  }

  // handle board collision detection

}
