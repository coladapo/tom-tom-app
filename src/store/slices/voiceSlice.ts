import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VoiceState {
  isRecording: boolean;
  transcription: string;
  processing: boolean;
  error: string | null;
}

const initialState: VoiceState = {
  isRecording: false,
  transcription: '',
  processing: false,
  error: null,
};

const voiceSlice = createSlice({
  name: 'voice',
  initialState,
  reducers: {
    startRecording: (state) => {
      state.isRecording = true;
      state.error = null;
      state.transcription = '';
    },
    stopRecording: (state) => {
      state.isRecording = false;
    },
    setTranscription: (state, action: PayloadAction<string>) => {
      state.transcription = action.payload;
    },
    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.processing = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isRecording = false;
      state.processing = false;
    },
    resetVoice: (state) => {
      return initialState;
    },
  },
});

export const {
  startRecording,
  stopRecording,
  setTranscription,
  setProcessing,
  setError,
  resetVoice,
} = voiceSlice.actions;

export default voiceSlice.reducer;
