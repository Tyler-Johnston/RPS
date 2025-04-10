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
  // progressionAchievements: Achievement[] = [];
  // upgradeAchievements: Achievement[] = [];
  // mechanicsAchievements: Achievement[] = [];
  miscAchievements: Achievement[] = [];


  constructor(public achievementService: AchievementService) {
    const all = achievementService.getAchievements();
    // this.progressionAchievements = all.filter(a => a.id.startsWith('prog_'));
    // this.upgradeAchievements = all.filter(a => a.id.startsWith('upg_'));
    // this.mechanicsAchievements = all.filter(a => a.id.startsWith('mech_'));
    this.miscAchievements = all.filter(a => a.id.startsWith('misc_'));
  }

  getAchievements() {
    return this.achievementService.getAchievements();
  }

  isUnlocked(id: string): boolean {
    return this.achievementService.isUnlocked(id);
  }
}
