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
  public points: number = 0;
  public streak: number = 0;
  public scoreBonus: number = 1;
  public baseScoreBonusAdditive: number = 0;
  public scoreBonusUpgradeCost: number = 10;
  public rockSniperActive: boolean = false;
  public scissorSniperActive: boolean = false;
  public paperSniperActive: boolean = false;

  constructor() {
    this.loadGameData();
    this.generateRandomMove();
  }

  generateRandomMove(): void {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    this.currentMove = this.moves[randomIndex];

    if (this.scissorSniperActive && this.currentMove === 'Scissors') {
      setTimeout(() => {
        this.makeChoice('Rock');
      }, 500); // pause for 0.5 seconds
    }

    if (this.rockSniperActive && this.currentMove === 'Rock') {
      setTimeout(() => {
        this.makeChoice('Paper');
      }, 500); // pause for 0.5 seconds
    }

    if (this.paperSniperActive && this.currentMove === 'Paper') {
      setTimeout(() => {
        this.makeChoice('Scissors');
      }, 500); // pause for 0.5 seconds
    }
  }

  makeChoice(playerMove: Move): void {
    this.result = this.calculateResult(playerMove, this.currentMove);
    if (this.result === 'You Win!') {
      this.streak++;
      this.scoreBonus = Math.floor(1 + this.streak / 5) + this.baseScoreBonusAdditive;
      this.points += this.scoreBonus;
    } else {
      this.streak = 0;
      this.scoreBonus = this.baseScoreBonusAdditive;
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
    localStorage.setItem('points', String(this.points));
    localStorage.setItem('scoreBonus', String(this.scoreBonus));
    localStorage.setItem('streak', String(this.streak));
    localStorage.setItem('scoreBonusUpgradeCost', String(this.scoreBonusUpgradeCost));
    localStorage.setItem('baseScoreBonusAdditive', String(this.baseScoreBonusAdditive));
    localStorage.setItem('rockSniperActive', String(this.rockSniperActive));
    localStorage.setItem('scissorSniperActive', String(this.scissorSniperActive));
    localStorage.setItem('paperSniperActive', String(this.paperSniperActive));
  }

  private loadGameData(): void {
    this.points = Number(localStorage.getItem('points') || 0);
    this.scoreBonus = Number(localStorage.getItem('scoreBonus') || 1);
    this.streak = Number(localStorage.getItem('streak') || 0);
    this.scoreBonusUpgradeCost = Number(localStorage.getItem('scoreBonusUpgradeCost') || 10);
    this.baseScoreBonusAdditive = Number(localStorage.getItem('baseScoreBonusAdditive') || 0);
    this.rockSniperActive = localStorage.getItem('rockSniperActive') === 'true';
    this.scissorSniperActive = localStorage.getItem('scissorSniperActive') === 'true';
    this.paperSniperActive = localStorage.getItem('paperSniperActive') === 'true';
  }
}
