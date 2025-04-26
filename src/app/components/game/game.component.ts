import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameDataService } from '../../game-data.service';
import { AchievementService } from '../../achievement.service';
import { SupabaseService } from '../../supabase.service';

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
  public isLoggedIn: boolean = false;

  constructor(
    public gameData: GameDataService,
    private achievementService: AchievementService,
    private supabaseService: SupabaseService
  ) {
    this.initializeGame();
  }

  async initializeGame(): Promise<void> {
    await this.gameData.loadGameData();
    await this.checkLogin();
    this.startGenerators();
    this.gameData.loadGameData();

    if (!this.gameData.isMoveInit) {
      this.generateRandomMove();
      this.gameData.isMoveInit = true;
    } else {
      this.handleSniperFire();
    }
  }

  async checkLogin(): Promise<void> {
    const user = await this.supabaseService.getUser();
    this.isLoggedIn = !!user;
  }
  

  async logout(): Promise<void> {
    this.gameData.saveGameData();
    await this.supabaseService.signOut();
    this.isLoggedIn = false;
    await this.gameData.loadGameData(); // load from local storage now that we're logged out
  }

  ngOnDestroy(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.gameData.rockGeneratorIntervalId) clearInterval(this.gameData.rockGeneratorIntervalId);
    if (this.gameData.paperGeneratorIntervalId) clearInterval(this.gameData.paperGeneratorIntervalId);
    if (this.gameData.scissorGeneratorIntervalId) clearInterval(this.gameData.scissorGeneratorIntervalId);
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

    if (this.timeoutId) clearTimeout(this.timeoutId);

    if (this.gameData.rockSniperActive && this.gameData.currentMove === 'Scissors' && this.gameData.rocks > 0) {
      this.sniperFire('Rock', rockSniperSpeed, 'rocks');
      return;
    }
    if (this.gameData.paperSniperActive && this.gameData.currentMove === 'Rock' && this.gameData.papers > 0) {
      this.sniperFire('Paper', paperSniperSpeed, 'papers');
      return;
    }
    if (this.gameData.scissorSniperActive && this.gameData.currentMove === 'Paper' && this.gameData.scissors > 0) {
      this.sniperFire('Scissors', scissorSniperSpeed, 'scissors');
      return;
    }
  }

  private sniperFire(move: Move, delay: number, resource: 'rocks' | 'papers' | 'scissors'): void {
    this.gameData.sniperLock = true;
    this.timeoutId = setTimeout(() => {
      this.gameData[resource] -= 1;
      this.gameData.sniperLock = false;
      this.makeChoice(move, false);
    }, delay);
  }

  private startGenerators(): void {
    const rockSpeed = 1000 * this.gameData.rockGeneratorInterval;
    const paperSpeed = 1000 * this.gameData.paperGeneratorInterval;
    const scissorSpeed = 1000 * this.gameData.scissorGeneratorInterval;

    if (this.gameData.rockGeneratorActive) {
      this.gameData.rockGeneratorIntervalId = setInterval(() => {
        this.gameData.rocks += this.gameData.rockGenerationAmount;
        this.gameData.saveGameData();
        if (this.gameData.currentMove === 'Scissors') this.handleSniperFire();
      }, rockSpeed);
    }

    if (this.gameData.paperGeneratorActive) {
      this.gameData.paperGeneratorIntervalId = setInterval(() => {
        this.gameData.papers += this.gameData.paperGenerationAmount;
        this.gameData.saveGameData();
        if (this.gameData.currentMove === 'Rock') this.handleSniperFire();
      }, paperSpeed);
    }

    if (this.gameData.scissorGeneratorActive) {
      this.gameData.scissorGeneratorIntervalId = setInterval(() => {
        this.gameData.scissors += this.gameData.scissorGenerationAmount;
        this.gameData.saveGameData();
        if (this.gameData.currentMove === 'Paper') this.handleSniperFire();
      }, scissorSpeed);
    }
  }

  makeChoice(playerMove: Move, isManualClick: boolean): void {
    if (!isManualClick && this.gameData.sniperLock) return;

    this.result = this.calculateResult(playerMove, this.gameData.currentMove);

    if (this.result === 'You Win!') {
      this.gameData.streak++;
      this.gameData.streakBonus = 1 + Math.floor(this.gameData.streak / this.gameData.streakPointDivisor);
      this.gameData.scoreBonus = this.gameData.streakBonus + this.gameData.baseScoreBonusAdditive;
      this.gameData.points += this.gameData.scoreBonus * this.gameData.mult;
      this.achievementService.unlockAchievement('prog_firstWin');
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
    if ((player === 'Rock' && opponent === 'Scissors') ||
        (player === 'Paper' && opponent === 'Rock') ||
        (player === 'Scissors' && opponent === 'Paper')) {
      return 'You Win!';
    }
    return 'You Lose!';
  }
}
