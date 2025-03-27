import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,  // Mark as standalone
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rock-paper-scissors';
  isMusicPlaying: boolean = true;

  ngOnInit(): void {
    this.setMusicVolume(.05);
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

}
