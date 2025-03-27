import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  public scoreBonus: number = 1;
  public points: number = 0;
  public mult: number = 1;
  public pointsPerWin: number = 1;

  public scoreMultUpgradeCost: number = 30000
  public scoreBonusUpgradeCost: number = 10;
  
  public baseScoreMultAdditive: number = 0;
  public baseScoreBonusAdditive: number = 0;

  public rockSniperActive: boolean = false;
  public scissorSniperActive : boolean = false;
  public paperSniperActive : boolean = false;

  public sniperCost: number = 100;
  public fuelCost: number = 1000;

  public rockSniperFuel : number = 100;
  public paperSniperFuel : number = 100;
  public scissorSniperFuel : number = 100;

  constructor() {
    this.loadGameData();
  }

  loadGameData(): void {
    this.scoreBonus = Number(localStorage.getItem('scoreBonus') || 1);
    this.points = Number(localStorage.getItem('points') || 0);
    this.mult = Number(localStorage.getItem('mult') || 1);
    this.pointsPerWin = Number(localStorage.getItem('pointsPerWin') || 1);

    this.scoreBonusUpgradeCost = Number(localStorage.getItem('scoreBonusUpgradeCost') || 10);
    this.scoreMultUpgradeCost = Number(localStorage.getItem('scoreMultUpgradeCost') || 30000);
    this.baseScoreBonusAdditive = Number(localStorage.getItem('baseScoreBonusAdditive') || 0);

    this.rockSniperActive = localStorage.getItem('rockSniperActive') === 'true';
    this.paperSniperActive = localStorage.getItem('paperSniperActive') === 'true';
    this.scissorSniperActive = localStorage.getItem('scissorSniperActive') === 'true';

    this.rockSniperFuel = Number(localStorage.getItem('rockSniperFuel') || 100);
    this.paperSniperFuel = Number(localStorage.getItem('paperSniperFuel') || 100);
    this.scissorSniperFuel = Number(localStorage.getItem('scissorSniperFuel') || 100);
  }

  saveGameData(): void {
    localStorage.setItem('scoreBonus', String(this.scoreBonus));
    localStorage.setItem('points', String(this.points));
    localStorage.setItem('mult', String(this.mult));
    localStorage.setItem('pointsPerWin', String(this.pointsPerWin));

    localStorage.setItem('scoreBonusUpgradeCost', String(this.scoreBonusUpgradeCost));
    localStorage.setItem('scoreMultUpgradeCost', String(this.scoreMultUpgradeCost));
    localStorage.setItem('baseScoreBonusAdditive', String(this.baseScoreBonusAdditive));

    localStorage.setItem('rockSniperActive', String(this.rockSniperActive));
    localStorage.setItem('paperSniperActive', String(this.rockSniperActive));
    localStorage.setItem('scissorSniperActive', String(this.rockSniperActive));

    localStorage.setItem('rockSniperFuel', String(this.rockSniperFuel));
    localStorage.setItem('paperSniperFuel', String(this.paperSniperFuel));
    localStorage.setItem('scissorSniperFuel', String(this.scissorSniperFuel));
  }

  purchaseScoreMultUpgrade(): void {
    if (this.points >= this.scoreMultUpgradeCost) {
      this.points -= this.scoreMultUpgradeCost;
      this.scoreMultUpgradeCost = Math.floor(this.scoreMultUpgradeCost * 2.5);
      this.mult++;
      this.saveGameData();
    }
  }

  purchaseScoreBonusUpgrade(): void {
    if (this.points >= this.scoreBonusUpgradeCost) {
      this.points -= this.scoreBonusUpgradeCost;
      this.scoreBonusUpgradeCost = Math.floor(this.scoreBonusUpgradeCost * 1.5);
      this.baseScoreBonusAdditive++;
      this.scoreBonus = this.scoreBonus + this.baseScoreBonusAdditive;
      this.saveGameData();
    }
  }

  purchaseSniper(sniperType: 'rock' | 'paper' | 'scissor'): void {
    let isActive: boolean;

    switch (sniperType) {
        case 'rock':
            isActive = this.rockSniperActive;
            break;
        case 'paper':
            isActive = this.paperSniperActive;
            break;
        case 'scissor':
            isActive = this.scissorSniperActive;
            break;
        default:
            return;
    }

    if (!isActive && this.points >= this.sniperCost) {
        this.points -= this.sniperCost;
        switch (sniperType) {
            case 'rock':
                this.rockSniperActive = true;
                break;
            case 'paper':
                this.paperSniperActive = true;
                break;
            case 'scissor':
                this.scissorSniperActive = true;
                break;
        }
        this.saveGameData();
    }
}

purchaseFuel(sniperType: 'rock' | 'paper' | 'scissor', amount: number, fuelCost: number): void {
  if (this.points >= fuelCost) {
    this.points -= fuelCost;

    switch (sniperType) {
      case 'rock':
        this.rockSniperFuel += amount;
        break;
      case 'paper':
        this.paperSniperFuel += amount;
        break;
      case 'scissor':
        this.scissorSniperFuel += amount;
        break;
    }

    this.saveGameData();
  }
}



}
