import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  startRecording,
  stopRecording,
  setTranscription,
  setError,
  setProcessing,
} from '../store/slices/voiceSlice';
import { VoiceService } from '../services/voice.service';
import { AIService } from '../services/ai.service';
import { addTask } from '../store/slices/taskSlice';
import { IdUtils } from '../utils/id.utils';

export const useVoiceRecording = () => {
  const dispatch = useDispatch();
  const { isRecording, transcription, processing, error } = useSelector(
    (state: RootState) => state.voice
  );

  const handleStartRecording = useCallback(async () => {
    try {
      dispatch(startRecording());
      
      await VoiceService.startRecording(
        (results) => {
          if (results.length > 0) {
            dispatch(setTranscription(results[0]));
          }
        },
        (error) => {
          dispatch(setError(error.message));
        }
      );
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  }, [dispatch]);

  const handleStopRecording = useCallback(async () => {
    try {
      dispatch(stopRecording());
      await VoiceService.stopRecording();
      
      if (transcription) {
        dispatch(setProcessing(true));
        
        // Process through AI
        const processed = await AIService.processTranscription(transcription);
        
        // Create tasks from processed results
        for (const taskData of processed.tasks) {
          const task = {
            id: IdUtils.generateId(),
            title: taskData.title || '',
            description: taskData.description,
            originalTranscription: transcription,
            sentiment: processed.sentiment,
            priority: taskData.priority || 'medium',
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          dispatch(addTask(task));
        }
        
        dispatch(setProcessing(false));
      }
    } catch (error) {
      dispatch(setError((error as Error).message));
    }
  }, [dispatch, transcription]);

  useEffect(() => {
    return () => {
      VoiceService.destroy();
    };
  }, []);

  return {
    isRecording,
    transcription,
    processing,
    error,
    startRecording: handleStartRecording,
    stopRecording: handleStopRecording,
  };
};
