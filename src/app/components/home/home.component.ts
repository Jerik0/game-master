import {AfterViewInit, Component, OnChanges, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GameType} from '../../enums/GameType';
import {NgTemplateOutlet} from '@angular/common';
import {TetrisComponent} from '../games/tetris/tetris.component';
import {GameOfLifeComponent} from '../games/game-of-life/game-of-life.component';
import {GalagaComponent} from '../games/galaga/galaga.component';
import {SimonSaysComponent} from '../games/simon-says/simon-says.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [
    NgTemplateOutlet,
    TetrisComponent,
    GameOfLifeComponent,
    GalagaComponent,
    SimonSaysComponent,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit, OnChanges {
  protected readonly GameType = GameType;
  @ViewChild('tetris') tetris!: TemplateRef<any>;
  @ViewChild('gameOfLife') gameOfLife!: TemplateRef<any>
  @ViewChild('galaga') galaga!: TemplateRef<any>
  @ViewChild('simonSays') simonSays!: TemplateRef<any>
  selectedGame: TemplateRef<any> = this[GameType.NONE];

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnChanges() {
  }

  getGameTemplateRef(gameType: GameType) {
    this.selectedGame = this[gameType];
  }
}
