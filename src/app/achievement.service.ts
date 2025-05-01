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
    { id: 'prog_points2', title: 'Fanatic', description: 'Reach 100,000 points', unlocked: false },
    { id: 'prog_points3', title: 'Millionaire', description: 'Reach 1,000,000 points', unlocked: false },
    { id: 'prog_combo1', title: 'Chain Reaction', description: 'Get a 250-win streak', unlocked: false },
    { id: 'prog_combo2', title: 'Unstoppable', description: 'Get a 1,000-win streak', unlocked: false },
    { id: 'prog_combo3', title: 'Take a Shower?', description: 'Get a 5,000-win streak', unlocked: false },
  
    // Upgrades
    { id: 'upg_firstSniper', title: 'Automagic', description: 'Unlock Your First Sniper', unlocked: false },
    { id: 'upg_tripleSniper', title: 'Triple Threat', description: 'Unlock All Snipers', unlocked: false },
    { id: 'upg_fullProduction', title: 'Full Production', description: 'Unlock All Generators', unlocked: false },
    { id: 'upg_tripleEfficiencyMax', title: 'Global Warmer', description: 'Max out every Sniper\'s efficiency', unlocked: false },
    { id: 'upg_tripleFuelMax', title: 'Overachiever', description: 'Maximize the amount of fuel you can generate for every generator', unlocked: false },
    { id: 'upg_tripleIntervalMax', title: 'No Lifer', description: 'Reduce every generator interval to 1 second', unlocked: false },
  
    // Mechanics
    { id: 'mech_fuelHoarder1', title: 'Hopeful Capitalist', description: 'Store 1,000 rocks, papers, or scissors', unlocked: false },
    { id: 'mech_fuelHoarder2', title: 'Status Quo Enjoyer', description: 'Store 10,000 rocks, papers, or scissors', unlocked: false },
    { id: 'mech_fuelHoarder3', title: 'Turtle Killer', description: 'Store 100,000 rocks, papers, or scissors', unlocked: false },
    { id: 'mech_ppw1', title: 'Points-Per-Win', description: 'Achieve a PPW of 250', unlocked: false },
    { id: 'mech_ppw2', title: 'Harmonic Symphony', description: 'Achieve a PPW of 1,000', unlocked: false },
    { id: 'mech_ppw3', title: 'RPS Tycoon', description: 'Achieve a PPW of 10,000', unlocked: false },
  
    // Miscellaneous
    { id: 'misc_completionist', title: 'Completionist', description: 'Unlock all achievements', unlocked: false }
  ];

  private readonly pointsThresholds = [
    { value: 1000, id: 'prog_points1' },
    { value: 100000, id: 'prog_points2' },
    { value: 1000000, id: 'prog_points3' }
  ];
  
  private readonly ppwThresholds = [
    { value: 250, id: 'mech_ppw1' },
    { value: 1000, id: 'mech_ppw2' },
    { value: 10000, id: 'mech_ppw3' }
  ];
  
  private readonly streakThresholds = [
    { value: 250, id: 'prog_combo1' },
    { value: 1000, id: 'prog_combo2' },
    { value: 5000, id: 'prog_combo3' }
  ];
  
  private readonly fuelStorageThresholds = [
    { value: 1000, id: 'mech_fuelHoarder1' },
    { value: 10000, id: 'mech_fuelHoarder2' },
    { value: 100000, id: 'mech_fuelHoarder3' }
  ];
  
  constructor() {
  }

  getAchievements(): Achievement[] {
    return this.achievements;
  }

  setAchievements(savedAchievements: Achievement[]): void {
    this.achievements = savedAchievements;
  }

  isUnlocked(id: string): boolean {
    return this.achievements.find(a => a.id === id)?.unlocked ?? false;
  }

  unlockAchievement(id: string): void {
    const achievement = this.achievements.find(a => a.id === id);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      console.log(`Achievement unlocked: ${achievement.title}`);
    }
  }

  getCompletionPercentage(): number {
    const total = this.achievements.length;
    const unlocked = this.achievements.filter(a => a.unlocked).length;
    return total === 0 ? 0 : Math.floor((unlocked / total) * 100);
  } 

  checkCompletionist(): boolean {
    const unlocked = this.achievements.filter(a => a.unlocked).length;
    return unlocked == this.achievements.length-1;
  } 

  evaluateFromGameData(gameData: GameDataService): void {
    // Points
    for (const { value, id } of this.pointsThresholds) if (gameData.points >= value) this.unlockAchievement(id);

    // PPW
    for (const { value, id } of this.ppwThresholds) if (gameData.pointsPerWin >= value) this.unlockAchievement(id);

    // Streak
    for (const { value, id } of this.streakThresholds) if (gameData.streak >= value) this.unlockAchievement(id);

    // Fuel Hoarding
    const maxFuel = Math.max(gameData.rocks, gameData.papers, gameData.scissors);
    for (const { value, id } of this.fuelStorageThresholds) if (maxFuel >= value) this.unlockAchievement(id);

    // Sniper unlocks
    const sniperFlags = [
      gameData.rockSniperActive,
      gameData.paperSniperActive,
      gameData.scissorSniperActive
    ];
    if (sniperFlags.some(v => v)) this.unlockAchievement('upg_firstSniper');
    if (sniperFlags.every(v => v)) this.unlockAchievement('upg_tripleSniper');

    // Generator unlocks
    const generatorFlags = [
      gameData.rockGeneratorActive,
      gameData.paperGeneratorActive,
      gameData.scissorGeneratorActive
    ];
    if (generatorFlags.every(v => v)) this.unlockAchievement('upg_fullProduction');
  
    // Efficiency unlocks
    const efficiencyPercentages = [
      gameData.baseRockEfficiencyPercentage,
      gameData.basePaperEfficiencyPercentage,
      gameData.baseScissorEfficiencyPercentage
    ];
    if (efficiencyPercentages.every(e => e >= gameData.maxEfficiency)) this.unlockAchievement('upg_tripleEfficiencyMax');
  
    // Fuel amount unlocks
    const generationAmounts = [
      gameData.rockGenerationAmount,
      gameData.paperGenerationAmount,
      gameData.scissorGenerationAmount
    ];
    if (generationAmounts.every(a => a >= gameData.maxGenerationAmount)) this.unlockAchievement('upg_tripleFuelMax');

    // Generator interval unlocks
    const generationIntervals = [
      gameData.rockGeneratorInterval,
      gameData.paperGeneratorInterval,
      gameData.scissorGeneratorInterval
    ];
    if (generationIntervals.every(i => i <= gameData.minIntervalLimit)) this.unlockAchievement('upg_tripleIntervalMax');

    // Completionist
    if (this.checkCompletionist()) this.unlockAchievement('misc_completionist');
  }  
}
