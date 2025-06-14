export type RitualType = 'morning' | 'evening';

export interface RitualEntry {
  id: string;
  type: RitualType;
  date: string;
  transcription: string;
  sentiment?: 'calm' | 'energy' | 'reflection' | 'neutral';
  processedInsights?: string[];
  completedAt: string;
}

export interface RitualPrompt {
  type: RitualType;
  prompt: string;
  followUpPrompts?: string[];
}
