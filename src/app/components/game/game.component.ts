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
  private result: string = '';
  private moves: Move[] = ['Rock', 'Paper', 'Scissors'];
  private timeoutId: any = null;

  constructor(public gameData: GameDataService) {
    this.gameData.loadGameData();
    this.generateRandomMove();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  generateRandomMove(): void {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    this.currentMove = this.moves[randomIndex];
    this.handleSniperFire();
}

  handleSniperFire(): void {
    if (this.gameData.rockSniperActive && this.currentMove === 'Scissors' && this.gameData.rocks > 0) {
        this.gameData.sniperLock = true;
        this.timeoutId = setTimeout(() => {
            this.gameData.rocks -= 1;
            this.gameData.sniperLock = false;
            this.makeChoice('Rock');
        }, 1000);
        return;
    }

    if (this.gameData.paperSniperActive && this.currentMove === 'Rock' && this.gameData.papers > 0) {
        this.gameData.sniperLock = true;
        this.timeoutId = setTimeout(() => {
            this.gameData.papers -= 1;
            this.gameData.sniperLock = false;
            this.makeChoice('Paper');
        }, 1000);
        return;
    }

    if (this.gameData.scissorSniperActive && this.currentMove === 'Paper' && this.gameData.scissors > 0) {
        this.gameData.sniperLock = true;
        this.timeoutId = setTimeout(() => {
            this.gameData.scissors -= 1;
            this.gameData.sniperLock = false;
            this.makeChoice('Scissors');
        }, 1000);
        return;
    }
  }

  makeChoice(playerMove: Move): void {
    if (this.gameData.sniperLock) return;
    this.result = this.calculateResult(playerMove, this.currentMove);
    if (this.result === 'You Win!') {
        this.gameData.streak++;
        this.gameData.streakBonus = 1 + Math.floor(this.gameData.streak / this.gameData.streakPointDivisor);
        this.gameData.scoreBonus = this.gameData.streakBonus + this.gameData.baseScoreBonusAdditive;
        this.gameData.points += this.gameData.scoreBonus * this.gameData.mult;
    } else {
        this.gameData.streak = 0;
        this.gameData.streakBonus = 0;
        this.gameData.scoreBonus = this.gameData.baseScoreBonusAdditive;
    }
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
