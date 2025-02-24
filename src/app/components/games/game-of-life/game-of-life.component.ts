import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-game-of-life',
  imports: [],
  templateUrl: './game-of-life.component.html',
  styleUrl: './game-of-life.component.css'
})
export class GameOfLifeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', {static: true})
  public canvas!: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;

  cellHeight = 30;
  cellWidth = 30;
  cellData = [];
  rows = 20;
  columns = 20;
  canvasWidth = this.cellWidth * this.columns;
  canvasHeight = this.cellHeight * this.rows;

  ngOnInit() {
    this.initializeCellData();
  }

  ngAfterViewInit() {
    console.log(this.canvasHeight);
    console.log(this.canvas);
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  initializeCellData = (): void => {
    for (let i = 0; i < this.rows; i++) {
      this.cellData[i] = [];
      for (let j = 0; j < this.columns; j++) {
        let randomNum = Math.floor(Math.random() * 50);
        this.cellData[i][j] = randomNum > 10 ? 0 : 1;
      }
    }
    console.log('Cell Data Initialized');
    console.log(this.cellData);
  }

}
