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
    this.gameData.startMissingGenerators();
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
              this.gameData.restartSingleGenerator('rock');
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
              this.gameData.restartSingleGenerator('paper');
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
              this.gameData.restartSingleGenerator('scissor');
          }
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
              100 * Math.pow(this.gameData.rockIntervalUpgradeLevel, 1.6)
            );
            this.gameData.restartSingleGenerator('rock');
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
              100 * Math.pow(this.gameData.paperIntervalUpgradeLevel, 1.6)
            );
            this.gameData.restartSingleGenerator('paper');
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
              100 * Math.pow(this.gameData.scissorIntervalUpgradeLevel, 1.6)
            );
            this.gameData.restartSingleGenerator('scissor');
          }
          break;
      }
      this.gameData.saveGameData();
    }


    converter(fromType: 'rock' | 'paper' | 'scissor', toType: 'rock' | 'paper' | 'scissor'): void {
      switch (fromType) {
        case 'rock':
          if (this.gameData.rocks >= this.gameData.baseConversionCost) {
            this.gameData.rocks -= this.gameData.baseConversionCost;
            this.gameData.papers += this.gameData.baseConversionGain;
          }
          break;
        case 'paper':
          if (this.gameData.papers >= this.gameData.baseConversionCost) {
            this.gameData.papers -= this.gameData.baseConversionCost;
            this.gameData.scissors += this.gameData.baseConversionGain;
          }
          break;
        case 'scissor':
          if (this.gameData.scissors >= this.gameData.baseConversionCost) {
            this.gameData.scissors -= this.gameData.baseConversionCost;
            this.gameData.rocks += this.gameData.baseConversionGain;
          }
          break;
      }
    }
}
