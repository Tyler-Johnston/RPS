import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AchievementService, Achievement } from '../../achievement.service';

@Component({
  selector: 'app-achievements4',
  imports: [RouterModule, CommonModule],
  templateUrl: './achievements4.component.html',
  styleUrl: '../achievements/achievements.component.css'
})
export class Achievements4Component {
  miscAchievements: Achievement[] = [];

  constructor(public achievementService: AchievementService) {
    const all = achievementService.getAchievements();
    this.miscAchievements = all.filter(a => a.id.startsWith('misc_'));
  }
  
}
