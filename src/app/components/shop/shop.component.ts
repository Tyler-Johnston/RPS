import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameDataService } from '../../game-data.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  constructor(public gameData: GameDataService) {
    this.gameData.loadGameData();
  }

  purchaseScoreMultUpgrade(): void {
    if (this.gameData.points >= this.gameData.scoreMultUpgradeCost) {
      this.gameData.points -= this.gameData.scoreMultUpgradeCost;
      this.gameData.scoreMultUpgradeCost = Math.floor(this.gameData.scoreMultUpgradeCost * 2);
      this.gameData.mult++;
      this.gameData.saveGameData();
    }
  }

  purchaseScoreBonusUpgrade(): void {
    if (this.gameData.points >= this.gameData.scoreBonusUpgradeCost) {
      this.gameData.points -= this.gameData.scoreBonusUpgradeCost;
      this.gameData.baseScoreBonusAdditive += this.gameData.bonusPointIncrement;
      this.gameData.scoreBonusUpgradeCost = Math.floor((this.gameData.baseScoreBonusAdditive + this.gameData.bonusPointIncrement) * 10);
      this.gameData.scoreBonus = this.gameData.scoreBonus + this.gameData.baseScoreBonusAdditive;
      this.gameData.saveGameData();
    }
  }

  purchaseSniper(sniperType: 'rock' | 'paper' | 'scissor'): void {
    if (this.gameData.points >= this.gameData.sniperCost) {
        this.gameData.points -= this.gameData.sniperCost;
        switch (sniperType) {
            case 'rock':
                this.gameData.rockSniperActive = true;
                break;
            case 'paper':
                this.gameData.paperSniperActive = true;
                break;
            case 'scissor':
                this.gameData.scissorSniperActive = true;
                break;
        }
        this.gameData.sniperCost = Math.floor(this.gameData.sniperCost * 3);
        this.gameData.saveGameData();
    }
}

purchaseFuel(sniperType: 'rock' | 'paper' | 'scissor'): void {
  if (this.gameData.points >= this.gameData.fuelCost) {
    this.gameData.points -= this.gameData.fuelCost;

    switch (sniperType) {
      case 'rock':
        this.gameData.rocks += this.gameData.fuelAmount;
        break;
      case 'paper':
        this.gameData.papers += this.gameData.fuelAmount;
        break;
      case 'scissor':
        this.gameData.scissors += this.gameData.fuelAmount;
        break;
    }
    

    this.gameData.saveGameData();
  }
}

purchaseSniperEfficiency(sniperType: 'rock' | 'paper' | 'scissor'): void {
  let efficiencyCost: number;

  switch (sniperType) {
      case 'rock':
          efficiencyCost = this.gameData.rockEfficiencyUpgradeCost;
          break;
      case 'paper':
          efficiencyCost = this.gameData.paperEfficiencyUpgradeCost;
          break;
      case 'scissor':
          efficiencyCost = this.gameData.scissorEfficiencyUpgradeCost;
          break;
      default:
          return;
  }

  if (this.gameData.points < efficiencyCost) return;
  this.gameData.points -= efficiencyCost;

  switch (sniperType) {
      case 'rock':
          this.gameData.baseRockEfficiencyPercentage += this.gameData.efficiencyIncrement;
          this.gameData.rockEfficiencyUpgradeCost = Math.floor(this.gameData.baseRockEfficiencyPercentage * 1250);
          break;
      case 'paper':
          this.gameData.basePaperEfficiencyPercentage += this.gameData.efficiencyIncrement;
          this.gameData.paperEfficiencyUpgradeCost = Math.floor(this.gameData.basePaperEfficiencyPercentage * 1250);
          break;
      case 'scissor':
          this.gameData.baseScissorEfficiencyPercentage += this.gameData.efficiencyIncrement;
          this.gameData.scissorEfficiencyUpgradeCost = Math.floor(this.gameData.baseScissorEfficiencyPercentage * 1250);
          break;
  }
  this.gameData.saveGameData();
}





}
