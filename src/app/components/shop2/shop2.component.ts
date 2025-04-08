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
              this.gameData.rockGenerationUpgradeCost = Math.floor(985 * Math.pow(this.gameData.rockGenerationAmount, 1.2));
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
                this.gameData.paperGenerationUpgradeCost = Math.floor(985 * Math.pow(this.gameData.paperGenerationAmount, 1.2));
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
                this.gameData.scissorGenerationUpgradeCost = Math.floor(985 * Math.pow(this.gameData.scissorGenerationAmount, 1.2));
              if (this.gameData.firstScissorGenUpgrade) this.gameData.firstScissorGenUpgrade = false;
              this.gameData.saveGameData();
          }
          break;
    }
}

    chooseBranch(type: 'rock' | 'paper' | 'scissor', choice: 'interval' | 'active'): void {
      switch (type) {
        case 'rock':
          this.gameData.rockBranchChosen = choice;
          break;
        case 'paper':
          this.gameData.paperBranchChosen = choice;
          break;
        case 'scissor':
          this.gameData.scissorBranchChosen = choice;
          break;
      }
      this.gameData.saveGameData();
    }

    upgradeInterval(type: 'rock' | 'paper' | 'scissor'): void {
      switch (type) {
        case 'rock':
          if (
            this.gameData.papers >= this.gameData.rockIntervalUpgradeCost &&
            this.gameData.rockGeneratorInterval > this.gameData.minIntervalLimit
          ) {
            this.gameData.papers -= this.gameData.rockIntervalUpgradeCost;
            this.gameData.rockGeneratorInterval -= this.gameData.intervalIncrement;
    
            if (this.gameData.rockGeneratorInterval < this.gameData.minIntervalLimit) {
              this.gameData.rockGeneratorInterval = this.gameData.minIntervalLimit;
            }
    
            this.gameData.rockIntervalUpgradeLevel++;
            this.gameData.rockIntervalUpgradeCost = Math.floor(
              2000 * Math.pow(this.gameData.rockIntervalUpgradeLevel, 2.2)
            );
            this.gameData.saveGameData();
          }
          break;
    
        case 'paper':
          if (
            this.gameData.scissors >= this.gameData.paperIntervalUpgradeCost &&
            this.gameData.paperGeneratorInterval > this.gameData.minIntervalLimit
          ) {
            this.gameData.scissors -= this.gameData.paperIntervalUpgradeCost;
            this.gameData.paperGeneratorInterval -= this.gameData.intervalIncrement;
    
            if (this.gameData.paperGeneratorInterval < this.gameData.minIntervalLimit) {
              this.gameData.paperGeneratorInterval = this.gameData.minIntervalLimit;
            }
    
            this.gameData.paperIntervalUpgradeLevel++;
            this.gameData.paperIntervalUpgradeCost = Math.floor(
              2000 * Math.pow(this.gameData.paperIntervalUpgradeLevel, 2.2)
            );
            this.gameData.saveGameData();
          }
          break;
    
        case 'scissor':
          if (
            this.gameData.rocks >= this.gameData.scissorIntervalUpgradeCost &&
            this.gameData.scissorGeneratorInterval > this.gameData.minIntervalLimit
          ) {
            this.gameData.rocks -= this.gameData.scissorIntervalUpgradeCost;
            this.gameData.scissorGeneratorInterval -= this.gameData.intervalIncrement;
    
            if (this.gameData.scissorGeneratorInterval < this.gameData.minIntervalLimit) {
              this.gameData.scissorGeneratorInterval = this.gameData.minIntervalLimit;
            }
    
            this.gameData.scissorIntervalUpgradeLevel++;
            this.gameData.scissorIntervalUpgradeCost = Math.floor(
              2000 * Math.pow(this.gameData.scissorIntervalUpgradeLevel, 2.2)
            );
            this.gameData.saveGameData();
          }
          break;
      }
    }
    

    upgradeActiveGeneration(type: 'rock' | 'paper' | 'scissor'): void {
      switch (type) {
        case 'rock':
          if (this.gameData.points >= this.gameData.rockActiveUpgradeCost) {
            this.gameData.points -= this.gameData.rockActiveUpgradeCost;
            this.gameData.rockActiveLevel++;
            this.gameData.rockActiveUpgradeCost = Math.floor(5000 * Math.pow(this.gameData.rockActiveLevel + 1, 2.3));
          }
          break;
    
        case 'paper':
          if (this.gameData.points >= this.gameData.paperActiveUpgradeCost) {
            this.gameData.points -= this.gameData.paperActiveUpgradeCost;
            this.gameData.paperActiveLevel++;
            this.gameData.paperActiveUpgradeCost = Math.floor(5000 * Math.pow(this.gameData.paperActiveLevel + 1, 2.3));
          }
          break;
    
        case 'scissor':
          if (this.gameData.points >= this.gameData.scissorActiveUpgradeCost) {
            this.gameData.points -= this.gameData.scissorActiveUpgradeCost;
            this.gameData.scissorActiveLevel++;
            this.gameData.scissorActiveUpgradeCost = Math.floor(5000 * Math.pow(this.gameData.scissorActiveLevel + 1, 2.3));
          }
          break;
      }
    
      this.gameData.saveGameData();
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

}
