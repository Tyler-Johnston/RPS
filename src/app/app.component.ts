import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameDataService } from './game-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rock-paper-scissors';

    constructor(
      private gameData: GameDataService,
    ) {}
  
  ngOnInit(): void {
    this.initializeGame();
    this.gameData.startGameplayLoop();
  }

  async initializeGame(): Promise<void> {
    await this.gameData.loadGameData();
  }
}
