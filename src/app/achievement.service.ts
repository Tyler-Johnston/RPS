import { Injectable } from '@angular/core';
import { GameDataService } from './game-data.service';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
  private achievements: Achievement[] = [
    // Progression
    { id: 'prog_firstWin', title: 'First Win!', description: 'Win your first match', unlocked: false },
    { id: 'prog_points1', title: 'One Small Step', description: 'Reach 1,000 points', unlocked: false },
    { id: 'prog_points2', title: 'Well Endowed', description: 'Reach 100,000 points', unlocked: false },
    { id: 'prog_points3', title: 'Millionaire', description: 'Reach 1,000,000 points', unlocked: false },
    { id: 'prog_combo1', title: 'Chain Reaction', description: 'Get a 250-win streak', unlocked: false },
    { id: 'prog_combo2', title: 'Unstoppable', description: 'Get a 1,000-win streak', unlocked: false },
    { id: 'prog_combo3', title: 'Take a Shower?', description: 'Get a 5,000-win streak', unlocked: false },
  
    // Upgrades
    { id: 'upg_firstSniper', title: 'Automagic', description: 'Unlock Your First Sniper', unlocked: false },
    { id: 'upg_tripleSniper', title: 'Triple Threat', description: 'Unlock All Snipers', unlocked: false },
    { id: 'upg_firstGenerator', title: 'Baby Steps', description: 'Unlock Your First Generator', unlocked: false },
    { id: 'upg_fullProduction', title: 'Full Production', description: 'Unlock All Generators', unlocked: false },
    { id: 'upg_firstEfficiencyMax', title: 'Full Steam Ahead', description: 'Max out any Sniper\'s efficiency', unlocked: false },
    { id: 'upg_tripleEfficiencyMax', title: 'Global Warmer', description: 'Max out every Sniper\'s efficiency', unlocked: false },
    { id: 'upg_firstFuelMax', title: 'Counterfeit Mark I', description: 'Maximize the amount of fuel you can generate for any generator', unlocked: false },
    { id: 'upg_tripleFuelMax', title: 'Overachiever', description: 'Maximize the amount of fuel you can generate for every generator', unlocked: false },
    { id: 'upg_firstIntervalMax', title: 'Counterfeit Mark II', description: 'Reduce any generators interval to 1 second', unlocked: false },
    { id: 'upg_tripleIntervalMax', title: 'No Lifer', description: 'Reduce every generator interval to 1 second', unlocked: false },
  
    // Mechanics
    { id: 'mech_fuelHoarder1', title: 'Gates', description: 'Store 1,000 rocks, papers, or scissors', unlocked: false },
    { id: 'mech_fuelHoarder2', title: 'Bezos', description: 'Store 10,000 rocks, papers, or scissors', unlocked: false },
    { id: 'mech_fuelHoarder3', title: 'Musk', description: 'Store 100,000 rocks, papers, or scissors', unlocked: false },
    { id: 'mech_ppw1', title: 'Points-Per-Win', description: 'Achieve a PPW of 250', unlocked: false },
    { id: 'mech_ppw2', title: 'Harmonic Symphony', description: 'Achieve a PPW of 1,000', unlocked: false },
    { id: 'mech_ppw3', title: 'RPS Tycoon', description: 'Achieve a PPW of 10,000', unlocked: false },
  
    // Miscellaneous
    { id: 'misc_secretFinder', title: '???', description: 'Discover the hidden easter egg', unlocked: false },
    { id: 'misc_completionist', title: 'Completionist', description: 'Unlock all achievements', unlocked: false }
  ];
  
  

  constructor() {
    this.loadAchievements();
  }

  getAchievements(): Achievement[] {
    return this.achievements;
  }

  isUnlocked(id: string): boolean {
    return this.achievements.find(a => a.id === id)?.unlocked ?? false;
  }

  unlockAchievement(id: string): void {
    const achievement = this.achievements.find(a => a.id === id);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      this.saveAchievements();
      console.log(`Achievement unlocked: ${achievement.title}`);
    }
  }

  getCompletionPercentage(): number {
    const total = this.achievements.length;
    const unlocked = this.achievements.filter(a => a.unlocked).length;
    return total === 0 ? 0 : Math.floor((unlocked / total) * 100);
  }  

  saveAchievements(): void {
    localStorage.setItem('achievements', JSON.stringify(this.achievements));
  }

  loadAchievements(): void {
    const saved = localStorage.getItem('achievements');
    if (saved) {
      const parsed = JSON.parse(saved);
      this.achievements = this.achievements.map(a => ({
        ...a,
        unlocked: parsed.find((savedA: Achievement) => savedA.id === a.id)?.unlocked ?? a.unlocked
      }));
    }
  }

  evaluateFromGameData(gameData: GameDataService): void {
    if (gameData.pointsPerWin >= 250) this.unlockAchievement('mech_ppw1');
    if (gameData.pointsPerWin >= 1000) this.unlockAchievement('mech_ppw2');
    if (gameData.pointsPerWin >= 10000) this.unlockAchievement('mech_ppw3');
    if (gameData.points >= 1000) this.unlockAchievement('prog_points1');
    if (gameData.points >= 10000) this.unlockAchievement('prog_points2');
    if (gameData.points >= 1000000) this.unlockAchievement('prog_points3');
    if (gameData.rockSniperActive || gameData.paperSniperActive || gameData.scissorSniperActive) this.unlockAchievement('upg_firstSniper');
    if (gameData.rockSniperActive && gameData.paperSniperActive && gameData.scissorSniperActive) this.unlockAchievement('upg_tripleSniper');
    if (gameData.rockGeneratorActive || gameData.paperGeneratorActive || gameData.scissorGeneratorActive) this.unlockAchievement('upg_firstGenerator')
    if (gameData.rockGeneratorActive && gameData.paperGeneratorActive && gameData.scissorGeneratorActive) this.unlockAchievement('upg_fullProduction')
    if (gameData.rocks >= 1000 || gameData.papers >= 1000 || gameData.scissors >= 1000) this.unlockAchievement("mech_fuelHoarder1")
    if (gameData.rocks >= 10000 || gameData.papers >= 10000 || gameData.scissors >= 10000) this.unlockAchievement("mech_fuelHoarder2")
    if (gameData.rocks >= 100000 || gameData.papers >= 100000 || gameData.scissors >= 100000) this.unlockAchievement("mech_fuelHoarder3")
    if (gameData.streak >= 250) this.unlockAchievement("prog_combo1")
    if (gameData.streak >= 1000) this.unlockAchievement("prog_combo2")
    if (gameData.streak >= 5000) this.unlockAchievement("prog_combo3")
    if (gameData.baseRockEfficiencyPercentage >= gameData.maxEfficiency || gameData.basePaperEfficiencyPercentage >= gameData.maxEfficiency || gameData.baseScissorEfficiencyPercentage >= gameData.maxEfficiency) this.unlockAchievement("upg_firstEfficiencyMax")
    if (gameData.baseRockEfficiencyPercentage >= gameData.maxEfficiency && gameData.basePaperEfficiencyPercentage >= gameData.maxEfficiency && gameData.baseScissorEfficiencyPercentage >= gameData.maxEfficiency) this.unlockAchievement("upg_tripleEfficiencyMax")
    if (gameData.rockGenerationAmount >= gameData.maxGenerationAmount || gameData.paperGenerationAmount >= gameData.maxGenerationAmount || gameData.scissorGenerationAmount >= gameData.maxGenerationAmount) this.unlockAchievement("upg_firstFuelMax")
    if (gameData.rockGenerationAmount >= gameData.maxGenerationAmount && gameData.paperGenerationAmount >= gameData.maxGenerationAmount && gameData.scissorGenerationAmount >= gameData.maxGenerationAmount) this.unlockAchievement("upg_tripleFuelMax")
    if (gameData.rockGeneratorInterval <= gameData.minIntervalLimit || gameData.paperGeneratorInterval <= gameData.minIntervalLimit || gameData.scissorGeneratorInterval <= gameData.minIntervalLimit) this.unlockAchievement("upg_firstIntervalMax")
    if (gameData.rockGeneratorInterval <= gameData.minIntervalLimit && gameData.paperGeneratorInterval <= gameData.minIntervalLimit && gameData.scissorGeneratorInterval <= gameData.minIntervalLimit) this.unlockAchievement("upg_tripleIntervalMax")
    if (this.getCompletionPercentage() === 100) this.unlockAchievement("misc_completionist")
  }
}
