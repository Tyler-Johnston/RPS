import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });
    return { data, error };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    return { error };
  }

  async getUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  async saveGameData(userId: string, saveData: any) {
    const { data, error } = await this.supabase
      .from('game_saves')
      .upsert(
        [{ user_id: userId, data: saveData }],
        { onConflict: 'user_id' }
      );

    return { data, error };
  }

  async saveAchievements(userId: string, achievementData: any)
  {
    const { data, error } = await this.supabase
    .from('game_saves')
    .upsert(
      [{ user_id: userId, achievements: achievementData }],
      { onConflict: 'user_id' }
    );

  return { data, error };
  }

  async loadGameData(userId: string) {
    const { data, error } = await this.supabase
      .from('game_saves')
      .select('data')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Failed to load game save:', error.message);
      return { data: null, error };
    }

    if (!data) {
      console.log('No cloud save found.');
      return { data: null, error: null };
    }

    return { data: data.data, error: null }; 
  }

  async loadAchievements(userId: string) {
    const { data, error } = await this.supabase
      .from('game_saves')
      .select('achievements')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Failed to load achievements:', error.message);
      return { data: null, error };
    }

    if (!data) {
      console.log('No cloud save found.');
      return { data: null, error: null };
    }

    return { achievements: data.achievements, error: null }; 
  }

}