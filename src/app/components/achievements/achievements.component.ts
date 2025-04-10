import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AchievementService, Achievement } from '../../achievement.service';



@Component({
  selector: 'app-achievements',
  imports: [RouterModule, CommonModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.css'
})
export class AchievementsComponent {

  progressionAchievements: Achievement[] = [];
  // upgradeAchievements: Achievement[] = [];
  // mechanicsAchievements: Achievement[] = [];
  // miscAchievements: Achievement[] = [];


  constructor(public achievementService: AchievementService) {
    const all = achievementService.getAchievements();
    this.progressionAchievements = all.filter(a => a.id.startsWith('prog_'));
    // this.upgradeAchievements = all.filter(a => a.id.startsWith('upg_'));
    // this.mechanicsAchievements = all.filter(a => a.id.startsWith('mech_'));
    // this.miscAchievements = all.filter(a => a.id.startsWith('misc_'));
  }

  getAchievements() {
    return this.achievementService.getAchievements();
  }

  isUnlocked(id: string): boolean {
    return this.achievementService.isUnlocked(id);
  }
}
