import { Injectable } from '@angular/core';
import { AchievementService } from './achievement.service';
import { SupabaseService } from './supabase.service';

type Move = 'Rock' | 'Paper' | 'Scissors';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  public currentMove: Move = 'Rock';
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
  public fuelCost: number = 1000;
  public fuelAmount: number = 25;
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

  constructor(
    private achievementService: AchievementService,
    private supabaseService: SupabaseService
  ) {}

  calculateUpgradeCost({ baseCost, level, exponent, linearFactor }: { baseCost: number, level: number, exponent: number, linearFactor: number }): number {
    return Math.floor(baseCost * Math.pow(level, exponent) + (level * linearFactor));
  }

  serializeGameData(): any {
    return {
      currentMove: this.currentMove,
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
      baseScissorEfficiencyPercentage: this.baseScissorEfficiencyPercentage
    };
  }

  deserializeGameData(data: any): void {
    if (!data) return;
    Object.assign(this, data);
  }

  async saveGameData(): Promise<void> {
    this.pointsPerWin = (this.streakBonus + this.baseScoreBonusAdditive) * this.mult;
    this.achievementService.evaluateFromGameData(this);

    const saveData = this.serializeGameData();
    const user = await this.supabaseService.getUser();
    const achievements = this.achievementService.getAchievements();

    if (user) {
      await this.supabaseService.saveGameData(user.id, saveData, achievements);
    } else {
      localStorage.setItem('rps_save', JSON.stringify(saveData));
      localStorage.setItem('achievements', JSON.stringify(achievements));
    }
  }

  async loadGameData(): Promise<void> {
    const user = await this.supabaseService.getUser();

    if (user) {
      const { data } = await this.supabaseService.loadGameData(user.id);
      if (data) {
        this.deserializeGameData(data);
        console.log('Loaded cloud save from Supabase.');
      } else {
        console.log('No cloud save found.');
      }
    } else {
      const localData = localStorage.getItem('rps_save');
      if (localData) {
        this.deserializeGameData(JSON.parse(localData));
        console.log('Loaded local save from browser.');
      } else {
        console.log('No local save found.');
      }
    }
  }
}
