import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  public points: number = 0;
  public streak: number = 0;
  public scoreBonus: number = 1;
  public mult: number = 1;
  public streakBonus: number = 0;
  public pointsPerWin: number = 1;
  public baseScoreBonusAdditive: number = 0;
  public scoreBonusUpgradeCost: number = 10;
  public scoreMultUpgradeCost: number = 10000;
  public sniperCost: number = 500;
  public fuelCost: number = 1000;
  public fuelAmount: number = 25;
  public bonusPointIncrement: number = 5;
  public streakPointDivisor: number = 5;

  public rockSniperActive: boolean = false;
  public paperSniperActive: boolean = false;
  public scissorSniperActive: boolean = false;
  public sniperLock: boolean = false;

  public rocks: number = 100;
  public papers: number = 100;
  public scissors: number = 100;

  constructor() {
    this.loadGameData();
  }

  loadGameData(): void {
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
    this.sniperLock = false; // Always reset on load

    this.rocks = Number(localStorage.getItem('rocks') || this.rocks);
    this.papers = Number(localStorage.getItem('papers') || this.papers);
    this.scissors = Number(localStorage.getItem('scissors') || this.scissors);
  }

  saveGameData(): void {
    this.pointsPerWin = (this.streakBonus + this.baseScoreBonusAdditive) * this.mult;
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

    localStorage.setItem('rockSniperActive', String(this.rockSniperActive));
    localStorage.setItem('paperSniperActive', String(this.paperSniperActive));
    localStorage.setItem('scissorSniperActive', String(this.scissorSniperActive));

    localStorage.setItem('rocks', String(this.rocks));
    localStorage.setItem('papers', String(this.papers));
    localStorage.setItem('scissors', String(this.scissors));
  }
}
