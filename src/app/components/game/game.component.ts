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
  private result: string = '';
  private moves: Move[] = ['Rock', 'Paper', 'Scissors'];
  private timeoutId: any = null;

  constructor(public gameData: GameDataService) {
    this.gameData.loadGameData();
    this.startGenerators();
    if (!this.gameData.isMoveInit)
    {
      this.generateRandomMove();
      this.gameData.isMoveInit = true;
    }
    else
    {
      this.handleSniperFire();
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.gameData.rockGeneratorIntervalId) {
      clearInterval(this.gameData.rockGeneratorIntervalId);
    }
    if (this.gameData.paperGeneratorIntervalId) {
      clearInterval(this.gameData.paperGeneratorIntervalId);
    }
    if (this.gameData.scissorGeneratorIntervalId) {
      clearInterval(this.gameData.scissorGeneratorIntervalId);
    }
  }

  generateRandomMove(): void {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    this.gameData.currentMove = this.moves[randomIndex];
    this.gameData.saveGameData();
    this.handleSniperFire();
}

  handleSniperFire(): void {

    if (this.gameData.sniperLock) return;

    const rockSniperSpeed = 1000 - (this.gameData.baseRockEfficiencyPercentage * 10);
    const paperSniperSpeed = 1000 - (this.gameData.basePaperEfficiencyPercentage * 10);
    const scissorSniperSpeed = 1000 - (this.gameData.baseScissorEfficiencyPercentage * 10);

    // clear any existing timeout to avoid overlapping snipes
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
    }

    if (this.gameData.rockSniperActive && this.gameData.currentMove === 'Scissors' && this.gameData.rocks > 0) {
        this.gameData.sniperLock = true;
        this.timeoutId = setTimeout(() => {
            this.gameData.rocks -= 1;
            this.gameData.sniperLock = false;
            this.makeChoice('Rock');
        }, rockSniperSpeed);
        return;
    }

    if (this.gameData.paperSniperActive && this.gameData.currentMove === 'Rock' && this.gameData.papers > 0) {
        this.gameData.sniperLock = true;
        this.timeoutId = setTimeout(() => {
            this.gameData.papers -= 1;
            this.gameData.sniperLock = false;
            this.makeChoice('Paper');
        }, paperSniperSpeed);
        return;
    }

    if (this.gameData.scissorSniperActive && this.gameData.currentMove === 'Paper' && this.gameData.scissors > 0) {
        this.gameData.sniperLock = true;
        this.timeoutId = setTimeout(() => {
            this.gameData.scissors -= 1;
            this.gameData.sniperLock = false;
            this.makeChoice('Scissors');
        }, scissorSniperSpeed);
        return;
    }
  }

  private startGenerators(): void {

    const rockGeneratorSpeed = 1000 * this.gameData.rockGeneratorInterval;
    const paperGeneratorSpeed = 1000 * this.gameData.paperGeneratorInterval;
    const scissorGeneratorSpeed = 1000 * this.gameData.paperGeneratorInterval;

    // Clear existing intervals to prevent stacking
    if (this.gameData.rockGeneratorIntervalId) {
        clearInterval(this.gameData.rockGeneratorIntervalId);
    }
    if (this.gameData.paperGeneratorIntervalId) {
        clearInterval(this.gameData.paperGeneratorIntervalId);
    }
    if (this.gameData.scissorGeneratorIntervalId) {
        clearInterval(this.gameData.scissorGeneratorIntervalId);
    }


    if (this.gameData.rockGeneratorActive) {
      this.gameData.rockGeneratorIntervalId = setInterval(() => {
        this.gameData.rocks += this.gameData.rockGenerationAmount;;
        this.gameData.saveGameData();
        if (this.gameData.currentMove === 'Scissors') {
              this.handleSniperFire();
        }
      }, rockGeneratorSpeed);
    }

    if (this.gameData.paperGeneratorActive) {
      this.gameData.paperGeneratorIntervalId = setInterval(() => {
        this.gameData.papers += this.gameData.paperGenerationAmount;;
        this.gameData.saveGameData();
        if (this.gameData.currentMove === 'Rock') {
          this.handleSniperFire();
        }
      }, paperGeneratorSpeed);
    }

    if (this.gameData.scissorGeneratorActive) {
      this.gameData.scissorGeneratorIntervalId = setInterval(() => {
        this.gameData.scissors += this.gameData.scissorGenerationAmount;;
        this.gameData.saveGameData();
        if (this.gameData.currentMove === 'Paper') {
          this.handleSniperFire();
        }
      }, scissorGeneratorSpeed);
    }
  }


  makeChoice(playerMove: Move): void {
    if (this.gameData.sniperLock) return;
    this.result = this.calculateResult(playerMove, this.gameData.currentMove);
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

  // fallingObjects: { id: number; type: 'rock' | 'paper' | 'scissor'; x: number; delay: number }[] = [];
  // private nextId = 0;
  

  // ngAfterViewInit(): void {
  //   setInterval(() => {
  //     this.spawnFallingObjects();
  //   }, 2000); // every 2 seconds
  // }
  

  // spawnFallingObjects(): void {
  //   const types: ('rock' | 'paper' | 'scissor')[] = ['rock', 'paper', 'scissor'];
  
  //   for (const type of types) {
  //     if (this.shouldSpawn(type)) {
  //       const id = this.nextId++;
  //       const delay = Math.random() * 0.5; // vary start time
  
  //       this.fallingObjects.push({
  //         id,
  //         type,
  //         x: Math.random() * 90, // horizontal %
  //         delay
  //       });
  
  //       // Remove this object after the animation
  //       setTimeout(() => {
  //         this.fallingObjects = this.fallingObjects.filter(obj => obj.id !== id);
  //       }, 8000); // match animation duration
  //     }
  //   }
  // }
  
  

  // shouldSpawn(type: 'rock' | 'paper' | 'scissor'): boolean {
  //   switch (type) {
  //     case 'rock':
  //       return this.gameData.rockBranchChosen === 'active';
  //     case 'paper':
  //       return this.gameData.paperBranchChosen === 'active';
  //     case 'scissor':
  //       return this.gameData.scissorBranchChosen === 'active';
  //     default:
  //       return false;
  //   }
  // }

  // onObjectClick(type: 'rock' | 'paper' | 'scissor'): void {
  //   console.log(`You clicked a falling ${type}!`);
  // }

}
