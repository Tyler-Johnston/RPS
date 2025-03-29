import { Injectable } from '@angular/core';

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
  public efficiencyIncrement = 10;
  public rockEfficiencyUpgradeCost = 2000;
  public paperEfficiencyUpgradeCost = 2000;
  public scissorEfficiencyUpgradeCost = 2000;
  public maxEfficiency = 90;

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

  constructor() {
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

  }

  saveGameData(): void {
    this.pointsPerWin = (this.streakBonus + this.baseScoreBonusAdditive) * this.mult;
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

  }
  
}
