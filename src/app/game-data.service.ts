import { Injectable } from '@angular/core';
import { AchievementService } from './achievement.service';
import { SupabaseService } from './supabase.service';

type Move = 'Rock' | 'Paper' | 'Scissors';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  public opponentMove: Move = 'Rock';
  public points: number = 0;
  public streak: number = 0;
  public scoreBonus: number = 1;
  public mult: number = 1;
  public streakBonus: number = 0;
  public pointsPerWin: number = 1;

  public isMoveInit = false;
  public efficiencyIncrement = 10;
  public maxEfficiency = 90;
  public minIntervalLimit: number = 1;
  public intervalIncrement: number = 2;

  public baseScoreBonusAdditive: number = 0;
  public scoreBonusUpgradeCost: number = 250;
  public scoreMultUpgradeCost: number = 10000;

  public sniperCost: number = 500;
  public bonusPointIncrement: number = 100;
  public streakPointDivisor: number = 5;

  public rockSniperActive: boolean = false;
  public paperSniperActive: boolean = false;
  public scissorSniperActive: boolean = false;
  public sniperLock: boolean = false;

  public rocks: number = 100;
  public papers: number = 100;
  public scissors: number = 100;

  public baseRockEfficiencyPercentage = 0;
  public basePaperEfficiencyPercentage = 0;
  public baseScissorEfficiencyPercentage = 0;

  public rockEfficiencyUpgradeCost = 2000;
  public paperEfficiencyUpgradeCost = 2000;
  public scissorEfficiencyUpgradeCost = 2000;

  public rockGeneratorActive: boolean = false;
  public paperGeneratorActive: boolean = false;
  public scissorGeneratorActive: boolean = false;

  public generatorCost: number = 1000;
  public rockGeneratorInterval: number = 30;
  public paperGeneratorInterval: number = 30;
  public scissorGeneratorInterval: number = 30;

  public rockGeneratorIntervalId: any = null;
  public paperGeneratorIntervalId: any = null;
  public scissorGeneratorIntervalId: any = null;

  public rockGenerationAmount: number = 1;
  public paperGenerationAmount: number = 1;
  public scissorGenerationAmount: number = 1;

  public rockGenerationUpgradeCost: number = 500;
  public paperGenerationUpgradeCost: number = 500;
  public scissorGenerationUpgradeCost: number = 500;

  public generationIncrement: number = 5;
  public maxGenerationAmount: number = 50;

  public firstRockGenUpgrade: boolean = true;
  public firstPaperGenUpgrade: boolean = true;
  public firstScissorGenUpgrade: boolean = true;

  public rockIntervalUpgradeCost: number = 1000;
  public paperIntervalUpgradeCost: number = 1000;
  public scissorIntervalUpgradeCost: number = 1000;

  public rockActiveUpgradeCost: number = 10000;
  public paperActiveUpgradeCost: number = 10000;
  public scissorActiveUpgradeCost: number = 10000;

  public rockActiveLevel: number = 0;
  public paperActiveLevel: number = 0;
  public scissorActiveLevel: number = 0;

  public rockIntervalUpgradeLevel: number = 0;
  public paperIntervalUpgradeLevel: number = 0;
  public scissorIntervalUpgradeLevel: number = 0;

  public isLoggedIn: boolean = false;
  public sniperIntervalId: any = null;
  public saveIntervalId: any = null;
  public isMobile: boolean = false;

  public isPauseSniperUnlocked: boolean = false;
  public baseConversionCost: number = 300;
  public baseConversionGain: number = 100;

  public pauseSniperBtnCost: number = 50000
  public isSniperPaused: boolean = false;

  constructor(
    private achievementService: AchievementService,
    private supabaseService: SupabaseService
  ) {}

  private detectMobileDevice(): void {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
  }

  startGameplayLoop(): void {
    // re-check sniper fire every now and then. this fixes issue of the game not firing anymore when resources deplete and restock
    if (this.sniperIntervalId) {
      clearInterval(this.sniperIntervalId);
    }
    this.sniperIntervalId = setInterval(() => {
      this.handleSniperFire();
    }, 500);
  
    // autosave
    if (this.saveIntervalId) {
      clearInterval(this.saveIntervalId);
    }
    this.saveIntervalId = setInterval(() => {
      this.saveGameData();
    }, 30000);
  
    this.startMissingGenerators();
  }
  
  startMissingGenerators(): void {
    if (this.rockGeneratorActive && !this.rockGeneratorIntervalId) {
      this.startSingleGenerator('rock');
    }
    if (this.paperGeneratorActive && !this.paperGeneratorIntervalId) {
      this.startSingleGenerator('paper');
    }
    if (this.scissorGeneratorActive && !this.scissorGeneratorIntervalId) {
      this.startSingleGenerator('scissor');
    }
  }
  
  startSingleGenerator(resource: 'rock' | 'paper' | 'scissor'): void {
    const gameData = this as any;
  
    const speed = 1000 * gameData[`${resource}GeneratorInterval`];
    const amount = gameData[`${resource}GenerationAmount`];
    const resourceName = `${resource}s`;
  
    gameData[`${resource}GeneratorIntervalId`] = setInterval(() => {
      gameData[resourceName] += amount;
      this.saveGameData();
    }, speed);
  }

  restartSingleGenerator(resource: 'rock' | 'paper' | 'scissor'): void {
    const gameData = this as any;
    
    const intervalIdKey = `${resource}GeneratorIntervalId`;
    if (gameData[intervalIdKey]) {
      clearInterval(gameData[intervalIdKey]);
    }
    this.startSingleGenerator(resource);
  }
  
  
  generateRandomMove(): void {
    const moves: Move[] = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * moves.length);
    this.opponentMove = moves[randomIndex];
    this.handleSniperFire();
  }

  handleSniperFire(): void {
    if (this.sniperLock || this.isSniperPaused) return;

    const rockSniperSpeed = 1000 - (this.baseRockEfficiencyPercentage * 10);
    const paperSniperSpeed = 1000 - (this.basePaperEfficiencyPercentage * 10);
    const scissorSniperSpeed = 1000 - (this.baseScissorEfficiencyPercentage * 10);

    if (this.rockSniperActive && this.opponentMove === 'Scissors' && this.rocks > 0) {
      this.sniperFire('Rock', rockSniperSpeed, 'rocks');
      return;
    }
    if (this.paperSniperActive && this.opponentMove === 'Rock' && this.papers > 0) {
      this.sniperFire('Paper', paperSniperSpeed, 'papers');
      return;
    }
    if (this.scissorSniperActive && this.opponentMove === 'Paper' && this.scissors > 0) {
      this.sniperFire('Scissors', scissorSniperSpeed, 'scissors');
      return;
    }
  }

  private sniperFire(move: Move, delay: number, resource: 'rocks' | 'papers' | 'scissors'): void {
    if (this[resource] <= 0) {
      this.sniperLock = false;
      return;
    }

    this.sniperLock = true;

    setTimeout(() => {
      this[resource] -= 1;
      this.sniperLock = false;
      this.makeChoice(move);
    }, delay);

  }

  togglePauseSnipers(): void {
    this.isSniperPaused = !this.isSniperPaused
  }

  makeChoice(playerMove: Move): void {
    const result = this.calculateResult(playerMove, this.opponentMove);

    if (result === 'You Win!') {
      this.streak++;
      this.streakBonus = 1 + Math.floor(this.streak / this.streakPointDivisor);
      this.pointsPerWin = (this.streakBonus + this.baseScoreBonusAdditive) * this.mult;
      this.scoreBonus = this.streakBonus + this.baseScoreBonusAdditive;
      this.points += this.scoreBonus * this.mult;
      this.achievementService.unlockAchievement('prog_firstWin');
    } else {
      this.streak = 0;
      this.streakBonus = 0;
      this.scoreBonus = this.baseScoreBonusAdditive;
    }

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

  calculateUpgradeCost({ baseCost, level, exponent, linearFactor }: { baseCost: number, level: number, exponent: number, linearFactor: number }): number {
    return Math.floor(baseCost * Math.pow(level, exponent) + (level * linearFactor));
  }

  serializeGameData(): any {
    return {
      opponentMove: this.opponentMove,
      points: this.points,
      streak: this.streak,
      scoreBonus: this.scoreBonus,
      mult: this.mult,
      streakBonus: this.streakBonus,
      pointsPerWin: this.pointsPerWin,
      scoreBonusUpgradeCost: this.scoreBonusUpgradeCost,
      scoreMultUpgradeCost: this.scoreMultUpgradeCost,
      baseScoreBonusAdditive: this.baseScoreBonusAdditive,
      sniperCost: this.sniperCost,
      rockSniperActive: this.rockSniperActive,
      paperSniperActive: this.paperSniperActive,
      scissorSniperActive: this.scissorSniperActive,
      rocks: this.rocks,
      papers: this.papers,
      scissors: this.scissors,
      rockEfficiencyUpgradeCost: this.rockEfficiencyUpgradeCost,
      paperEfficiencyUpgradeCost: this.paperEfficiencyUpgradeCost,
      scissorEfficiencyUpgradeCost: this.scissorEfficiencyUpgradeCost,
      rockGenerationAmount: this.rockGenerationAmount,
      paperGenerationAmount: this.paperGenerationAmount,
      scissorGenerationAmount: this.scissorGenerationAmount,
      rockGenerationUpgradeCost: this.rockGenerationUpgradeCost,
      paperGenerationUpgradeCost: this.paperGenerationUpgradeCost,
      scissorGenerationUpgradeCost: this.scissorGenerationUpgradeCost,
      rockGeneratorInterval: this.rockGeneratorInterval,
      paperGeneratorInterval: this.paperGeneratorInterval,
      scissorGeneratorInterval: this.scissorGeneratorInterval,
      rockGeneratorActive: this.rockGeneratorActive,
      paperGeneratorActive: this.paperGeneratorActive,
      scissorGeneratorActive: this.scissorGeneratorActive,
      rockActiveLevel: this.rockActiveLevel,
      paperActiveLevel: this.paperActiveLevel,
      scissorActiveLevel: this.scissorActiveLevel,
      rockIntervalUpgradeCost: this.rockIntervalUpgradeCost,
      paperIntervalUpgradeCost: this.paperIntervalUpgradeCost,
      scissorIntervalUpgradeCost: this.scissorIntervalUpgradeCost,
      rockActiveUpgradeCost: this.rockActiveUpgradeCost,
      paperActiveUpgradeCost: this.paperActiveUpgradeCost,
      scissorActiveUpgradeCost: this.scissorActiveUpgradeCost,
      rockIntervalUpgradeLevel: this.rockIntervalUpgradeLevel,
      paperIntervalUpgradeLevel: this.paperIntervalUpgradeLevel,
      scissorIntervalUpgradeLevel: this.scissorIntervalUpgradeLevel,
      firstRockGenUpgrade: this.firstRockGenUpgrade,
      firstPaperGenUpgrade: this.firstPaperGenUpgrade,
      firstScissorGenUpgrade: this.firstScissorGenUpgrade,
      baseRockEfficiencyPercentage: this.baseRockEfficiencyPercentage,
      basePaperEfficiencyPercentage: this.basePaperEfficiencyPercentage,
      baseScissorEfficiencyPercentage: this.baseScissorEfficiencyPercentage,
      isLoggedIn: this.isLoggedIn,
      isPauseSniperUnlocked: this.isPauseSniperUnlocked,
      isSniperPaused: this.isSniperPaused
    };
  }

  deserializeGameData(data: any): void {
    if (!data) return;
    Object.assign(this, data);
  }

  async transferLocalSaveToCloud(): Promise<void> {
    const localData = localStorage.getItem('rps_save');
    const user = await this.supabaseService.getUser();
  
    if (localData && user) {
      try {
        const saveData = JSON.parse(localData);
        const achievementData = this.achievementService.getAchievements();
        await this.supabaseService.saveGameData(user.id, saveData);
        await this.supabaseService.saveAchievements(user.id, achievementData);
        console.log('Local save transferred to cloud.');
      } catch (error) {
        console.error('Failed to transfer local save to cloud.', error);
      }
    } else {
      console.log('No local data or user not signed in.');
    }
  }

  async saveGameData(): Promise<void> {
    this.pointsPerWin = (this.streakBonus + this.baseScoreBonusAdditive) * this.mult;
    this.achievementService.evaluateFromGameData(this);
    const saveData = this.serializeGameData();
    const achievementData = this.achievementService.getAchievements();
    const user = await this.supabaseService.getUser();
    if (user) {
      try {
        await this.supabaseService.saveGameData(user.id, saveData);
        await this.supabaseService.saveAchievements(user.id, achievementData);
      } catch (error) {
        console.error('Cloud save failed.', error);
      }
    }
    else
    {
      localStorage.setItem('rps_save', JSON.stringify(saveData));
    }
  }

  async loadGameData(): Promise<void> {
    this.detectMobileDevice();
    const user = await this.supabaseService.getUser();
    if (user) {
      try {
        const { data } = await this.supabaseService.loadGameData(user.id);
        const { achievements } = await this.supabaseService.loadAchievements(user.id);
        if (data) {
          this.deserializeGameData(data);
          console.log('Loaded cloud game save from Supabase');
        }
        if (achievements) {
          this.achievementService.mergeAchievements(achievements);
          console.log('Loaded cloud achievements from Supabase');
        }        
      } catch (error) {
        console.error('Cloud load failed, using local save.', error);
      }
    }
    else {
      const localData = localStorage.getItem('rps_save');
      const localAchievements = localStorage.getItem('achievements');
      if (localData) {
        this.deserializeGameData(JSON.parse(localData));
        console.log('Loaded local save from browser.');
      }
      if (localAchievements) {
        this.achievementService.mergeAchievements(JSON.parse(localAchievements));
        console.log('Loaded local achievements from browser.');
      }      
    }
    this.handleSniperFire();
    this.startMissingGenerators();
    
  }
  
}