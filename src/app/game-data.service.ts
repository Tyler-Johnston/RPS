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

  public rockSniperActive: boolean = false;
  public paperSniperActive: boolean = false;
  public scissorSniperActive: boolean = false;

  public rocks: number = 100;
  public papers: number = 100;
  public scissors: number = 100;

  constructor() {
    this.loadGameData();
  }

  loadGameData(): void {
    this.points = Number(localStorage.getItem('points') || 0);
    this.scoreBonus = Number(localStorage.getItem('scoreBonus') || 1);
    this.streakBonus = Number(localStorage.getItem('streakBonus') || 1);
    this.streak = Number(localStorage.getItem('streak') || 0);
    this.mult = Number(localStorage.getItem('mult') || 1);
    this.pointsPerWin = Number(localStorage.getItem('pointsPerWin') || 1);

    this.scoreBonusUpgradeCost = Number(localStorage.getItem('scoreBonusUpgradeCost') || 10);
    this.scoreMultUpgradeCost = Number(localStorage.getItem('scoreMultUpgradeCost') || 10000);
    this.baseScoreBonusAdditive = Number(localStorage.getItem('baseScoreBonusAdditive') || 0);
    this.sniperCost = Number(localStorage.getItem('sniperCost') || 500);

    this.rockSniperActive = localStorage.getItem('rockSniperActive') === 'true';
    this.paperSniperActive = localStorage.getItem('paperSniperActive') === 'true';
    this.scissorSniperActive = localStorage.getItem('scissorSniperActive') === 'true';

    this.rocks = Number(localStorage.getItem('rocks') || 100);
    this.papers = Number(localStorage.getItem('papers') || 100);
    this.scissors = Number(localStorage.getItem('scissors') || 100);
  }

  saveGameData(): void {
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
