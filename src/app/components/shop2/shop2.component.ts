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

}
