import { Injectable } from '@angular/core';
import { AchievementService } from './achievement.service';

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
  public paperIntervalUpgradeCost: number = 1000
  public scissorIntervalUpgradeCost: number = 1000

  public rockActiveUpgradeCost: number = 10000;
  public paperActiveUpgradeCost: number = 10000;
  public scissorActiveUpgradeCost: number = 10000;

  public rockActiveLevel: number = 0;
  public paperActiveLevel: number = 0;
  public scissorActiveLevel: number = 0;

  public rockIntervalUpgradeLevel: number = 0;
  public paperIntervalUpgradeLevel: number = 0;
  public scissorIntervalUpgradeLevel: number = 0;

  constructor(private achievementService: AchievementService) {
    this.loadGameData();
  }

  calculateUpgradeCost({ baseCost, level, exponent, linearFactor }: { baseCost: number, level: number, exponent: number, linearFactor: number }): number {
    return Math.floor(baseCost * Math.pow(level, exponent) + (level * linearFactor));
  }
  

  loadGameData(): void {
    this.currentMove = localStorage.getItem('currentMove') as 'Rock' | 'Paper' | 'Scissors' || this.currentMove;
    this.points = Number(localStorage.getItem('points') || this.points);
    this.scoreBonus = Number(localStorage.getItem('scoreBonus') || this.scoreBonus);
    this.streakBonus = Number(localStorage.getItem('streakBonus') || this.streakBonus);
    this.streak = Number(localStorage.getItem('streak') || this.streak);
    this.mult = Number(localStorage.getItem('mult') || this.mult);
    this.pointsPerWin = Number(localStorage.getItem('pointsPerWin') || this.pointsPerWin);

    this.scoreBonusUpgradeCost = Number(localStorage.getItem('scoreBonusUpgradeCost') || this.scoreBonusUpgradeCost);
    this.scoreMultUpgradeCost = Number(localStorage.getItem('scoreMultUpgradeCost') || this.scoreMultUpgradeCost);
    this.baseScoreBonusAdditive = Number(localStorage.getItem('baseScoreBonusAdditive') || this.baseScoreBonusAdditive);
    this.sniperCost = Number(localStorage.getItem('sniperCost') || this.sniperCost);

    this.rockSniperActive = localStorage.getItem('rockSniperActive') === 'true';
    this.paperSniperActive = localStorage.getItem('paperSniperActive') === 'true';
    this.scissorSniperActive = localStorage.getItem('scissorSniperActive') === 'true';

    this.rockGeneratorActive = localStorage.getItem('rockGeneratorActive') === 'true';
    this.paperGeneratorActive = localStorage.getItem('paperGeneratorActive') === 'true';
    this.scissorGeneratorActive = localStorage.getItem('scissorGeneratorActive') === 'true';

    this.firstRockGenUpgrade = JSON.parse(localStorage.getItem('firstRockGenUpgrade') || 'true');
    this.firstPaperGenUpgrade = JSON.parse(localStorage.getItem('firstPaperGenUpgrade') || 'true');
    this.firstScissorGenUpgrade = JSON.parse(localStorage.getItem('firstScissorGenUpgrade') || 'true');

    this.sniperLock = false;

    this.rocks = Number(localStorage.getItem('rocks') || this.rocks);
    this.papers = Number(localStorage.getItem('papers') || this.papers);
    this.scissors = Number(localStorage.getItem('scissors') || this.scissors);

    this.baseRockEfficiencyPercentage = Number(localStorage.getItem('baseRockEfficiencyPercentage') || this.baseRockEfficiencyPercentage);
    this.basePaperEfficiencyPercentage = Number(localStorage.getItem('basePaperEfficiencyPercentage') || this.basePaperEfficiencyPercentage);
    this.baseScissorEfficiencyPercentage = Number(localStorage.getItem('baseScissorEfficiencyPercentage') || this.baseScissorEfficiencyPercentage);

    this.rockEfficiencyUpgradeCost = Number(localStorage.getItem('rockEfficiencyUpgradeCost') || this.rockEfficiencyUpgradeCost);
    this.paperEfficiencyUpgradeCost = Number(localStorage.getItem('paperEfficiencyUpgradeCost') || this.paperEfficiencyUpgradeCost);
    this.scissorEfficiencyUpgradeCost = Number(localStorage.getItem('scissorEfficiencyUpgradeCost') || this.scissorEfficiencyUpgradeCost);

    this.rockGenerationAmount = Number(localStorage.getItem('rockGenerationAmount') || this.rockGenerationAmount);
    this.paperGenerationAmount = Number(localStorage.getItem('paperGenerationAmount') || this.paperGenerationAmount);
    this.scissorGenerationAmount = Number(localStorage.getItem('scissorGenerationAmount') || this.scissorGenerationAmount);

    this.rockGenerationUpgradeCost = Number(localStorage.getItem('rockGenerationUpgradeCost') || this.rockGenerationUpgradeCost);
    this.paperGenerationUpgradeCost = Number(localStorage.getItem('paperGenerationUpgradeCost') || this.paperGenerationUpgradeCost);
    this.scissorGenerationUpgradeCost = Number(localStorage.getItem('scissorGenerationUpgradeCost') || this.scissorGenerationUpgradeCost);

    this.rockGeneratorInterval = Number(localStorage.getItem('rockGeneratorInterval') || this.rockGeneratorInterval);
    this.paperGeneratorInterval = Number(localStorage.getItem('paperGeneratorInterval') || this.paperGeneratorInterval);
    this.scissorGeneratorInterval = Number(localStorage.getItem('scissorGeneratorInterval') || this.scissorGeneratorInterval);

    this.rockActiveLevel = Number(localStorage.getItem('rockActiveLevel') || this.rockActiveLevel);
    this.paperActiveLevel = Number(localStorage.getItem('paperActiveLevel') || this.paperActiveLevel);
    this.scissorActiveLevel = Number(localStorage.getItem('scissorActiveLevel') || this.scissorActiveLevel);

    this.rockIntervalUpgradeCost = Number(localStorage.getItem('rockIntervalUpgradeCost') || this.rockIntervalUpgradeCost);
    this.paperIntervalUpgradeCost = Number(localStorage.getItem('paperIntervalUpgradeCost') || this.paperIntervalUpgradeCost);
    this.scissorIntervalUpgradeCost = Number(localStorage.getItem('scissorIntervalUpgradeCost') || this.scissorIntervalUpgradeCost);
    
    this.rockActiveUpgradeCost = Number(localStorage.getItem('rockActiveUpgradeCost') || this.rockActiveUpgradeCost);
    this.paperActiveUpgradeCost = Number(localStorage.getItem('paperActiveUpgradeCost') || this.paperActiveUpgradeCost);
    this.scissorActiveUpgradeCost = Number(localStorage.getItem('scissorActiveUpgradeCost') || this.scissorActiveUpgradeCost);

    this.rockIntervalUpgradeLevel = Number(localStorage.getItem('rockIntervalUpgradeLevel') || this.rockIntervalUpgradeLevel);
    this.paperIntervalUpgradeLevel = Number(localStorage.getItem('paperIntervalUpgradeLevel') || this.paperIntervalUpgradeLevel);
    this.scissorIntervalUpgradeLevel = Number(localStorage.getItem('scissorIntervalUpgradeLevel') || this.scissorIntervalUpgradeLevel);

  }

  saveGameData(): void {
    this.pointsPerWin = (this.streakBonus + this.baseScoreBonusAdditive) * this.mult;
    this.achievementService.evaluateFromGameData(this);
    localStorage.setItem('currentMove', this.currentMove);
    localStorage.setItem('points', String(this.points));
    localStorage.setItem('scoreBonus', String(this.scoreBonus));
    localStorage.setItem('streakBonus', String(this.streakBonus));
    localStorage.setItem('streak', String(this.streak));
    localStorage.setItem('mult', String(this.mult));
    localStorage.setItem('pointsPerWin', String(this.pointsPerWin));

    localStorage.setItem('scoreBonusUpgradeCost', String(this.scoreBonusUpgradeCost));
    localStorage.setItem('scoreMultUpgradeCost', String(this.scoreMultUpgradeCost));
    localStorage.setItem('baseScoreBonusAdditive', String(this.baseScoreBonusAdditive));
    localStorage.setItem('sniperCost', String(this.sniperCost));

    localStorage.setItem('rockGeneratorActive', String(this.rockGeneratorActive));
    localStorage.setItem('paperGeneratorActive', String(this.paperGeneratorActive));
    localStorage.setItem('scissorGeneratorActive', String(this.scissorGeneratorActive));

    localStorage.setItem('rockSniperActive', String(this.rockSniperActive));
    localStorage.setItem('paperSniperActive', String(this.paperSniperActive));
    localStorage.setItem('scissorSniperActive', String(this.scissorSniperActive));

    localStorage.setItem('firstRockGenUpgrade', String(this.firstRockGenUpgrade));
    localStorage.setItem('firstPaperGenUpgrade', String(this.firstPaperGenUpgrade));
    localStorage.setItem('firstScissorGenUpgrade', String(this.firstScissorGenUpgrade));

    localStorage.setItem('rocks', String(this.rocks));
    localStorage.setItem('papers', String(this.papers));
    localStorage.setItem('scissors', String(this.scissors));

    localStorage.setItem('baseRockEfficiencyPercentage', String(this.baseRockEfficiencyPercentage));
    localStorage.setItem('basePaperEfficiencyPercentage', String(this.basePaperEfficiencyPercentage));
    localStorage.setItem('baseScissorEfficiencyPercentage', String(this.baseScissorEfficiencyPercentage));

    localStorage.setItem('rockEfficiencyUpgradeCost', String(this.rockEfficiencyUpgradeCost));
    localStorage.setItem('paperEfficiencyUpgradeCost', String(this.paperEfficiencyUpgradeCost));
    localStorage.setItem('scissorEfficiencyUpgradeCost', String(this.scissorEfficiencyUpgradeCost));

    localStorage.setItem('rockGenerationAmount', String(this.rockGenerationAmount));
    localStorage.setItem('paperGenerationAmount', String(this.paperGenerationAmount));
    localStorage.setItem('scissorGenerationAmount', String(this.scissorGenerationAmount));

    localStorage.setItem('rockGenerationUpgradeCost', String(this.rockGenerationUpgradeCost));
    localStorage.setItem('paperGenerationUpgradeCost', String(this.paperGenerationUpgradeCost));
    localStorage.setItem('scissorGenerationUpgradeCost', String(this.scissorGenerationUpgradeCost));

    localStorage.setItem('rockGeneratorInterval', String(this.rockGeneratorInterval));
    localStorage.setItem('paperGeneratorInterval', String(this.paperGeneratorInterval));
    localStorage.setItem('scissorGeneratorInterval', String(this.scissorGeneratorInterval));

    localStorage.setItem('rockActiveLevel', String(this.rockActiveLevel));
    localStorage.setItem('paperActiveLevel', String(this.paperActiveLevel));
    localStorage.setItem('scissorActiveLevel', String(this.scissorActiveLevel));

    localStorage.setItem('rockIntervalUpgradeCost', String(this.rockIntervalUpgradeCost));
    localStorage.setItem('paperIntervalUpgradeCost', String(this.paperIntervalUpgradeCost));
    localStorage.setItem('scissorIntervalUpgradeCost', String(this.scissorIntervalUpgradeCost));

    localStorage.setItem('rockActiveUpgradeCost', String(this.rockActiveUpgradeCost));
    localStorage.setItem('paperActiveUpgradeCost', String(this.paperActiveUpgradeCost));
    localStorage.setItem('scissorActiveUpgradeCost', String(this.scissorActiveUpgradeCost));

    localStorage.setItem('rockIntervalUpgradeLevel', String(this.rockIntervalUpgradeLevel));
    localStorage.setItem('paperIntervalUpgradeLevel', String(this.paperIntervalUpgradeLevel));
    localStorage.setItem('scissorIntervalUpgradeLevel', String(this.scissorIntervalUpgradeLevel));

  } 
}
