import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameDataService } from '../../game-data.service';
import { AchievementService } from '../../achievement.service';
import { SupabaseService } from '../../supabase.service';

type Move = 'Rock' | 'Paper' | 'Scissors';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {

  constructor(
    public gameData: GameDataService,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await this.supabaseService.getUser();
    this.gameData.isLoggedIn = !!user;
  }

  async logout(): Promise<void> {
    this.gameData.saveGameData();
    await this.supabaseService.signOut();
    this.gameData.isLoggedIn = false;
    await this.gameData.loadGameData();
  }

}
