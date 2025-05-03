import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameDataService } from '../../game-data.service';
import { AchievementService, Achievement } from '../../achievement.service';

@Component({
  selector: 'app-achievements',
  imports: [RouterModule, CommonModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css'
})
export class AchievementsComponent {

  progressionAchievements: Achievement[] = [];

  constructor(public gameData: GameDataService, public achievementService: AchievementService) {
    const all = achievementService.getAchievements();
    this.progressionAchievements = all.filter(a => a.id.startsWith('prog_'));
  }

}
