import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameDataService } from '../../game-data.service';

@Component({
  selector: 'app-shop2',
  imports: [RouterModule, CommonModule],
  templateUrl: './shop2.component.html',
  styleUrl: '../shop/shop.component.css'
})
export class Shop2Component {
  constructor(public gameData: GameDataService) {
    this.gameData.loadGameData();
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
              if (this.gameData.firstRockGenUpgrade)
              {
                this.gameData.rockGenerationAmount += this.gameData.generationIncrement - 1;
              }
              else
              {
                this.gameData.rockGenerationAmount += this.gameData.generationIncrement;
              }
              this.gameData.rockGenerationUpgradeCost = this.gameData.rockGenerationAmount * 1250;
              if (this.gameData.firstRockGenUpgrade) this.gameData.firstRockGenUpgrade = false;
              this.gameData.saveGameData();
          }
          break;
      case 'paper':
          if (this.gameData.points >= this.gameData.paperGenerationUpgradeCost && this.gameData.paperGenerationAmount < this.gameData.maxGenerationAmount) {
              this.gameData.points -= this.gameData.paperGenerationUpgradeCost;
              if (this.gameData.firstPaperGenUpgrade)
                {
                  this.gameData.paperGenerationAmount += this.gameData.generationIncrement - 1;
                }
                else
                {
                  this.gameData.paperGenerationAmount += this.gameData.generationIncrement;
                }
              this.gameData.paperGenerationUpgradeCost = this.gameData.paperGenerationAmount * 1250;
              if (this.gameData.firstPaperGenUpgrade) this.gameData.firstPaperGenUpgrade = false;
              this.gameData.saveGameData();
          }
          break;
      case 'scissor':
          if (this.gameData.points >= this.gameData.scissorGenerationUpgradeCost && this.gameData.scissorGenerationAmount < this.gameData.maxGenerationAmount) {
              this.gameData.points -= this.gameData.scissorGenerationUpgradeCost;
              if (this.gameData.firstScissorGenUpgrade)
                {
                  this.gameData.scissorGenerationAmount += this.gameData.generationIncrement - 1;
                }
                else
                {
                  this.gameData.scissorGenerationAmount += this.gameData.generationIncrement;
                }
              this.gameData.scissorGenerationUpgradeCost = this.gameData.scissorGenerationAmount * 1250;
              if (this.gameData.firstScissorGenUpgrade) this.gameData.firstScissorGenUpgrade = false;
              this.gameData.saveGameData();
          }
          break;
    }
}


}
