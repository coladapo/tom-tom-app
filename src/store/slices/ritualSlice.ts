import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RitualType, RitualEntry } from '../../types/ritual';

interface RitualState {
  morningRitual: RitualEntry | null;
  eveningRitual: RitualEntry | null;
  currentRitual: RitualType | null;
  ritualHistory: RitualEntry[];
}

const initialState: RitualState = {
  morningRitual: null,
  eveningRitual: null,
  currentRitual: null,
  ritualHistory: [],
};

const ritualSlice = createSlice({
  name: 'rituals',
  initialState,
  reducers: {
    startRitual: (state, action: PayloadAction<RitualType>) => {
      state.currentRitual = action.payload;
    },
    completeRitual: (state, action: PayloadAction<RitualEntry>) => {
      const { type } = action.payload;
      if (type === 'morning') {
        state.morningRitual = action.payload;
      } else {
        state.eveningRitual = action.payload;
      }
      state.ritualHistory.push(action.payload);
      state.currentRitual = null;
    },
    setRitualHistory: (state, action: PayloadAction<RitualEntry[]>) => {
      state.ritualHistory = action.payload;
    },
  },
});

export const {
  startRitual,
  completeRitual,
  setRitualHistory,
} = ritualSlice.actions;

export default ritualSlice.reducer;
