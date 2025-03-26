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
  public scoreBonusUpgradeCost: number = 10;
  public scoreBonus: number = 1;
  public points: number = 0;
  public baseScoreBonusAdditive: number = 0;
  public rockSniperActive: boolean = false;
  public scissorSniperActive : boolean = false;
  public paperSniperActive : boolean = false;
  public sniperCost: number = 100;

  constructor() {
    this.loadGameData();
  }

  loadGameData(): void {
    this.scoreBonus = Number(localStorage.getItem('scoreBonus') || 1);
    this.points = Number(localStorage.getItem('points') || 0);
    this.scoreBonusUpgradeCost = Number(localStorage.getItem('scoreBonusUpgradeCost') || 10);
    this.baseScoreBonusAdditive = Number(localStorage.getItem('baseScoreBonusAdditive') || 0);
    this.rockSniperActive = localStorage.getItem('rockSniperActive') === 'true';
    this.scissorSniperActive = localStorage.getItem('scissorSniperActive') === 'true';
    this.paperSniperActive = localStorage.getItem('paperSniperActive') === 'true';
  }

  saveGameData(): void {
    localStorage.setItem('scoreBonus', String(this.scoreBonus));
    localStorage.setItem('points', String(this.points));
    localStorage.setItem('scoreBonusUpgradeCost', String(this.scoreBonusUpgradeCost));
    localStorage.setItem('baseScoreBonusAdditive', String(this.baseScoreBonusAdditive));
    localStorage.setItem('rockSniperActive', String(this.rockSniperActive));
    localStorage.setItem('scissorSniperActive', String(this.rockSniperActive));
    localStorage.setItem('paperSniperActive', String(this.rockSniperActive));
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


}
