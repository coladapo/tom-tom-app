import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import voiceReducer from './slices/voiceSlice';
import ritualReducer from './slices/ritualSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    voice: voiceReducer,
    rituals: ritualReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
