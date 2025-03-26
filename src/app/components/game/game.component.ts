import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

type Move = 'Rock' | 'Paper' | 'Scissors';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  public currentMove: Move = 'Rock';
  public result: string = '';
  private moves: Move[] = ['Rock', 'Paper', 'Scissors'];
  public score: number = 0;
  public combo: number = 0;
  public mult: number = 1;
  public multUpgradeCost: number = 10;

  constructor() {
    this.loadGameData();
    this.generateRandomMove();
  }

  generateRandomMove(): void {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    this.currentMove = this.moves[randomIndex];
  }

  makeChoice(playerMove: Move): void {
    this.result = this.calculateResult(playerMove, this.currentMove);
    if (this.result === 'You Win!') {
      this.combo++;
      this.mult = Math.floor(1 + this.combo / 5);
      this.score += this.mult;
    } else {
      this.combo = 0;
      this.mult = 1;
    }
    this.saveGameData();
    this.generateRandomMove();
  }

  private calculateResult(player: Move, opponent: Move): string {
    if (player === opponent) return 'Draw!';
    if 
    (
      (player === 'Rock' && opponent === 'Scissors') ||
      (player === 'Paper' && opponent === 'Rock') ||
      (player === 'Scissors' && opponent === 'Paper')
    ) 
    {
      return 'You Win!';
    }
    return 'You Lose!';
  }

  private saveGameData(): void {
    localStorage.setItem('score', String(this.score));
    localStorage.setItem('mult', String(this.mult));
    localStorage.setItem('combo', String(this.combo));
    localStorage.setItem('multUpgradeCost', String(this.multUpgradeCost));
  }

  private loadGameData(): void {
    this.score = Number(localStorage.getItem('score') || 0);
    this.mult = Number(localStorage.getItem('mult') || 1);
    this.combo = Number(localStorage.getItem('combo') || 0);
    this.multUpgradeCost = Number(localStorage.getItem('multUpgradeCost') || 10);
  }
}
