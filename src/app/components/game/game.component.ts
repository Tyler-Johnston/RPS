import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameDataService } from '../../game-data.service';

type Move = 'Rock' | 'Paper' | 'Scissors';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  public currentMove: Move = 'Rock';
  public result: string = '';
  private moves: Move[] = ['Rock', 'Paper', 'Scissors'];

  constructor(public gameData: GameDataService) {
    this.gameData.loadGameData();
    this.generateRandomMove();
  }

  generateRandomMove(): void {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    this.currentMove = this.moves[randomIndex];

    if (this.gameData.rockSniperActive && this.currentMove === 'Scissors' && this.gameData.rocks > 0) {
      setTimeout(() => {
        this.gameData.rocks -= 1;
        if (this.gameData.rocks < 0) this.gameData.rocks = 0;
        this.makeChoice('Rock');
      }, 500);
    }

    if (this.gameData.paperSniperActive && this.currentMove === 'Rock' && this.gameData.papers > 0) {
      setTimeout(() => {
        this.gameData.papers -= 1;
        if (this.gameData.papers < 0) this.gameData.papers = 0;
        this.makeChoice('Paper');
      }, 500);
    }

    if (this.gameData.scissorSniperActive && this.currentMove === 'Paper' && this.gameData.scissors > 0) {
      setTimeout(() => {
        this.gameData.scissors -= 1;
        if (this.gameData.scissors < 0) this.gameData.scissors = 0;
        this.makeChoice('Scissors');
      }, 500);
    }
  }

  makeChoice(playerMove: Move): void {
    this.result = this.calculateResult(playerMove, this.currentMove);
    if (this.result === 'You Win!') {
      this.gameData.streak++;
      this.gameData.streakBonus = 1 + Math.floor(this.gameData.streak / 50);
      this.gameData.scoreBonus = this.gameData.streakBonus + this.gameData.baseScoreBonusAdditive;
      this.gameData.points += this.gameData.scoreBonus * this.gameData.mult;
    } else {
      this.gameData.streak = 0;
      this.gameData.streakBonus = 0;
      this.gameData.scoreBonus = this.gameData.baseScoreBonusAdditive;
    }
    this.gameData.pointsPerWin = this.gameData.scoreBonus * this.gameData.mult;
    this.gameData.saveGameData();
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
}
