// Storage Service for persisting data locally

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';
import { RitualEntry } from '../types/ritual';
import { UserPreferences, MoodEntry } from '../types/user';

const STORAGE_KEYS = {
  TASKS: '@tom_tom_tasks',
  RITUALS: '@tom_tom_rituals',
  PREFERENCES: '@tom_tom_preferences',
  MOOD_HISTORY: '@tom_tom_mood_history',
  ONBOARDING: '@tom_tom_onboarding',
};

export class StorageService {
  /**
   * Save tasks to local storage
   */
  static async saveTasks(tasks: Task[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

  /**
   * Load tasks from local storage
   */
  static async loadTasks(): Promise<Task[]> {
    try {
      const tasksJson = await AsyncStorage.getItem(STORAGE_KEYS.TASKS);
      return tasksJson ? JSON.parse(tasksJson) : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  }

  /**
   * Save ritual history
   */
  static async saveRituals(rituals: RitualEntry[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.RITUALS, JSON.stringify(rituals));
    } catch (error) {
      console.error('Error saving rituals:', error);
    }
  }

  /**
   * Load ritual history
   */
  static async loadRituals(): Promise<RitualEntry[]> {
    try {
      const ritualsJson = await AsyncStorage.getItem(STORAGE_KEYS.RITUALS);
      return ritualsJson ? JSON.parse(ritualsJson) : [];
    } catch (error) {
      console.error('Error loading rituals:', error);
      return [];
    }
  }

  /**
   * Save user preferences
   */
  static async savePreferences(
    preferences: UserPreferences
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.PREFERENCES,
        JSON.stringify(preferences)
      );
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }

  /**
   * Load user preferences
   */
  static async loadPreferences(): Promise<UserPreferences | null> {
    try {
      const prefsJson = await AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return prefsJson ? JSON.parse(prefsJson) : null;
    } catch (error) {
      console.error('Error loading preferences:', error);
      return null;
    }
  }

  /**
   * Save mood history
   */
  static async saveMoodHistory(history: MoodEntry[]): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.MOOD_HISTORY,
        JSON.stringify(history)
      );
    } catch (error) {
      console.error('Error saving mood history:', error);
    }
  }

  /**
   * Load mood history
   */
  static async loadMoodHistory(): Promise<MoodEntry[]> {
    try {
      const historyJson = await AsyncStorage.getItem(STORAGE_KEYS.MOOD_HISTORY);
      return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
      console.error('Error loading mood history:', error);
      return [];
    }
  }

  /**
   * Check if onboarding is completed
   */
  static async isOnboardingCompleted(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING);
      return value === 'completed';
    } catch (error) {
      return false;
    }
  }

  /**
   * Mark onboarding as completed
   */
  static async completeOnboarding(): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING, 'completed');
    } catch (error) {
      console.error('Error marking onboarding complete:', error);
    }
  }

  /**
   * Clear all stored data (for testing/reset)
   */
  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}
