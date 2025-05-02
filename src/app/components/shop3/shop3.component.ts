import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameDataService } from '../../game-data.service';
@Component({
  selector: 'app-shop3',
  imports: [RouterModule, CommonModule],
  templateUrl: './shop3.component.html',
  styleUrl: '../shop/shop.component.css'
})
export class Shop3Component {
  constructor(public gameData: GameDataService) {
  }

  purchaseOtc(): void {
    this.gameData.isOTCPurchased = true;
    this.gameData.points -= this.gameData.OTCCost;
    this.gameData.saveGameData();
  }

  purchaseMidasCurse(): void {
    this.gameData.isMidasCursePurchased = true;
    this.gameData.gold -= this.gameData.midasCurseCost;
    this.gameData.saveGameData();
  }
}
