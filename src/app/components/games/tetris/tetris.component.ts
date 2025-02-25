import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

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

  // update the board with new frame
  updateBoard(): void {}

  render(): void {}

  // animate the board
  animate(): void {}

  // randomly queue pieces to insert into board
  insertPieces(): void {}

  // handle controlling of the pieces
  handleMovement(event: KeyboardEvent): void {}

  translatePiece(): void {

  }

  // handle board collision detection

}
