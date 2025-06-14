export interface UserPreferences {
  morningRitualTime: string;
  eveningRitualTime: string;
  notificationsEnabled: boolean;
  sentimentIndicatorsEnabled: boolean;
  theme: 'light' | 'dark';
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  sentiment: 'calm' | 'energy' | 'reflection' | 'neutral';
  note?: string;
}
