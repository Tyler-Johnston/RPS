import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameDataService } from './game-data.service';
import { SupabaseService } from './supabase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rock-paper-scissors';
  isMusicPlaying: boolean = true;

    constructor(
      private gameData: GameDataService,
      private supabaseService: SupabaseService
    ) {}
  
  ngOnInit(): void {
    this.setMusicVolume(.05);
    this.initializeGame();
    this.gameData.startGameplayLoop();
  }

  public setMusicVolume(vol: number): void {
    const music = document.getElementById('backgroundMusic') as HTMLAudioElement;
    if (music) {
      music.volume = vol;
    }
  }

  public toggleMusic(): void {
    const music = document.getElementById('backgroundMusic') as HTMLAudioElement;
    if (music) {
      if (music.paused) {
        music.play();
        this.isMusicPlaying = true;
      } else {
        music.pause();
        this.isMusicPlaying = false;
      }
    }
  }

  async checkLogin(): Promise<void> {
    const user = await this.supabaseService.getUser();
    this.gameData.isLoggedIn = !!user;
  }

  async initializeGame(): Promise<void> {
    await this.gameData.loadGameData();
  }

}
