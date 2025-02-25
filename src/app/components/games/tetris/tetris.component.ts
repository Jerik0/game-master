import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {BitArray} from '../../../helpers/board-helpers';

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
  gameBoard: BitArray[]
  resolution = 4;
  runGame = false;
  rows = this.boardHeight / this.resolution;
  columns = this.boardWidth / this.resolution;
  // create pieces
  lShapeRight = [
    [[1],[0]],
    [[1],[0]],
    [[1],[0]],
    [[1],[1]]
  ];
  lShapeLeft = [
    [[0],[2]],
    [[0],[2]],
    [[0],[2]],
    [[2],[2]]
  ];
  squareShape = [
    [[3],[3]],
    [[3],[3]]
  ]
  straightShape = [
    [4],
    [4],
    [4],
    [4]
  ]
  zShapeLeft = [
    [[5],[5],[0]],
    [[0],[5],[5]],
  ]
  zShapeRight = [
    [[0],[5],[5]],
    [[5],[5],[0]],
  ]
  tShape = [
    [[0],[6],[0]],
    [[6],[6],[6]],
  ]

  // initialize the board
  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  // handle start game
  startGame(): void {}

  // handle stop game
  stopGame(): void {}

  // handle reset game
  resetGame(): void {}

  setBoard(): void {
    this.gameBoard = new Array(this.rows).fill(0).map(() => new Array(this.columns).fill(0));
  }

  // update the board with new frame
  updateBoard(): void {}

  updateScore(points: number): void {
    this.score += points;
  }

  render(board: BitArray[]): void {
    const c =  this.context;
    const res = this.resolution;

    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        c.beginPath();
        c.rect(colIndex * res, rowIndex * res, res, res);
        c.fillStyle = '#f5f5f5'
      })
    })
  }

  // animate the board
  animate(timeoutInterval = 1000): void {
    setTimeout(() => {
      requestAnimationFrame(() => this.animate());
    }, timeoutInterval);
    this.render(this.gameBoard);
    this.updateBoard();
  }

  // randomly queue pieces to insert into board
  insertPieces(): void {}

  // handle controlling of the pieces
  handleMovement(event: KeyboardEvent): void {}

  translatePiece(): void {

  }

  // handle board collision detection

}
