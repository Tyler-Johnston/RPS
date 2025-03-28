import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameDataService } from '../../game-data.service';

@Component({
  selector: 'app-shop2',
  imports: [RouterModule, CommonModule],
  templateUrl: './shop2.component.html',
  styleUrl: './shop2.component.css'
})
export class Shop2Component {

  constructor(public gameData: GameDataService) {
    this.gameData.loadGameData();
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
            this.gameData.rockEfficiencyUpgradeCost = Math.floor(this.gameData.rockEfficiencyUpgradeCost * 3);
            break;
        case 'paper':
            this.gameData.basePaperEfficiencyPercentage += this.gameData.efficiencyIncrement;
            this.gameData.paperEfficiencyUpgradeCost = Math.floor(this.gameData.paperEfficiencyUpgradeCost * 3);
            break;
        case 'scissor':
            this.gameData.baseScissorEfficiencyPercentage += this.gameData.efficiencyIncrement;
            this.gameData.scissorEfficiencyUpgradeCost = Math.floor(this.gameData.scissorEfficiencyUpgradeCost * 3);
            break;
    }
    this.gameData.saveGameData();
  }

  purchaseGenerator(type: 'rock' | 'paper' | 'scissor'): void {
    switch (type) {
        case 'rock':
          if (!this.gameData.rockGeneratorActive && this.gameData.points >= this.gameData.generatorCost) {
              this.gameData.points -= this.gameData.generatorCost;
              this.gameData.rockGeneratorActive = true;
          }
          break;
        case 'paper':
          if (!this.gameData.paperGeneratorActive && this.gameData.points >= this.gameData.generatorCost) {
              this.gameData.points -= this.gameData.generatorCost;
              this.gameData.paperGeneratorActive = true;
          }
          break;
        case 'scissor':
          if (!this.gameData.scissorGeneratorActive && this.gameData.points >= this.gameData.generatorCost) {
              this.gameData.points -= this.gameData.generatorCost;
              this.gameData.scissorGeneratorActive = true;
          }
          break;
    }
    this.gameData.generatorCost = Math.floor(this.gameData.generatorCost * 3);
    this.gameData.saveGameData();
  }

  purchaseGenerationUpgrade(type: 'rock' | 'paper' | 'scissor'): void {
    switch (type) {
      case 'rock':
          if (this.gameData.points >= this.gameData.rockGenerationUpgradeCost && this.gameData.rockGenerationAmount < this.gameData.maxGenerationAmount) {
              this.gameData.points -= this.gameData.rockGenerationUpgradeCost;
              this.gameData.rockGenerationAmount += this.gameData.generationIncrement;
              this.gameData.rockGenerationUpgradeCost = Math.floor(this.gameData.rockGenerationUpgradeCost * 2);
              this.gameData.saveGameData();
          }
          break;
      case 'paper':
          if (this.gameData.points >= this.gameData.paperGenerationUpgradeCost && this.gameData.paperGenerationAmount < this.gameData.maxGenerationAmount) {
              this.gameData.points -= this.gameData.paperGenerationUpgradeCost;
              this.gameData.paperGenerationAmount += this.gameData.generationIncrement;
              this.gameData.paperGenerationUpgradeCost = Math.floor(this.gameData.paperGenerationUpgradeCost * 2);
              this.gameData.saveGameData();
          }
          break;
      case 'scissor':
          if (this.gameData.points >= this.gameData.scissorGenerationUpgradeCost && this.gameData.scissorGenerationAmount < this.gameData.maxGenerationAmount) {
              this.gameData.points -= this.gameData.scissorGenerationUpgradeCost;
              this.gameData.scissorGenerationAmount += this.gameData.generationIncrement;
              this.gameData.scissorGenerationUpgradeCost = Math.floor(this.gameData.scissorGenerationUpgradeCost * 2);
              this.gameData.saveGameData();
          }
          break;
    }
}


}
