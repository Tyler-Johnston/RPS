import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AchievementService, Achievement } from '../../achievement.service';

@Component({
  selector: 'app-achievements3',
  imports: [RouterModule, CommonModule],
  templateUrl: './achievements3.component.html',
  styleUrl: '../achievements/achievements.component.css'
})
export class Achievements3Component {
  mechanicsAchievements: Achievement[] = [];

  constructor(public achievementService: AchievementService) {
    const all = achievementService.getAchievements();
    this.mechanicsAchievements = all.filter(a => a.id.startsWith('mech_'));
  }

}

