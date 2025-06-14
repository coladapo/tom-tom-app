import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences, MoodEntry } from '../../types/user';

interface UserState {
  preferences: UserPreferences;
  moodHistory: MoodEntry[];
  onboardingCompleted: boolean;
}

const initialState: UserState = {
  preferences: {
    morningRitualTime: '08:00',
    eveningRitualTime: '20:00',
    notificationsEnabled: true,
    sentimentIndicatorsEnabled: true,
    theme: 'light',
  },
  moodHistory: [],
  onboardingCompleted: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    addMoodEntry: (state, action: PayloadAction<MoodEntry>) => {
      state.moodHistory.push(action.payload);
    },
    setMoodHistory: (state, action: PayloadAction<MoodEntry[]>) => {
      state.moodHistory = action.payload;
    },
    completeOnboarding: (state) => {
      state.onboardingCompleted = true;
    },
  },
});

export const {
  updatePreferences,
  addMoodEntry,
  setMoodHistory,
  completeOnboarding,
} = userSlice.actions;

export default userSlice.reducer;
