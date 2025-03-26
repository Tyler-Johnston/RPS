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
  public multUpgradeCost: number = 10;
  public mult: number = 1;
  public score: number = 0;

  constructor() {
    this.loadGameData();
  }

  loadGameData(): void {
    this.mult = Number(localStorage.getItem('mult') || 1);
    this.score = Number(localStorage.getItem('score') || 0);
    this.multUpgradeCost = Number(localStorage.getItem('multUpgradeCost') || 10);
  }

  saveGameData(): void {
    localStorage.setItem('mult', String(this.mult));
    localStorage.setItem('score', String(this.score));
    localStorage.setItem('multUpgradeCost', String(this.multUpgradeCost));
  }

  purchasemultUpgrade(): void {
    if (this.score >= this.multUpgradeCost) {
      this.score -= this.multUpgradeCost;
      this.mult++;
      this.multUpgradeCost = Math.floor(this.multUpgradeCost * 1.5);
      this.saveGameData();
    }
  }
}
