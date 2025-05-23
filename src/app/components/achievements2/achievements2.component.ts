import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameDataService } from '../../game-data.service';
import { AchievementService, Achievement } from '../../achievement.service';

@Component({
  selector: 'app-achievements2',
  imports: [RouterModule, CommonModule],
  templateUrl: './achievements2.component.html',
  styleUrl: '../achievements/achievements.component.css'
})
export class Achievements2Component {
  upgradeAchievements: Achievement[] = [];

  constructor(public gameData: GameDataService, public achievementService: AchievementService) {
    const all = achievementService.getAchievements();
    this.upgradeAchievements = all.filter(a => a.id.startsWith('upg_'));
  }

}
