import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { startRecording, stopRecording } from '../../store/slices/voiceSlice';
import { theme } from '../../theme';
import { WaveformVisualizer } from './WaveformVisualizer';

interface VoiceRecorderProps {
  onRecordingComplete?: (transcription: string) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onRecordingComplete,
}) => {
  const dispatch = useDispatch();
  const { isRecording, processing } = useSelector(
    (state: RootState) => state.voice
  );
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording, pulseAnim]);

  const handlePress = () => {
    if (isRecording) {
      dispatch(stopRecording());
      // In a real app, this would trigger voice processing
      // For now, we'll simulate it
      setTimeout(() => {
        if (onRecordingComplete) {
          onRecordingComplete('Sample transcription');
        }
      }, 1000);
    } else {
      dispatch(startRecording());
    }
  };

  return (
    <View style={styles.container}>
      {isRecording && <WaveformVisualizer />}
      
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.recordButton,
            isRecording && styles.recordingButton,
            processing && styles.processingButton,
          ]}
          onPress={handlePress}
          disabled={processing}>
          <Icon
            name={isRecording ? 'square' : 'mic'}
            size={32}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      </Animated.View>
      
      {isRecording && (
        <Text style={styles.recordingText}>Listening...</Text>
      )}
      {processing && (
        <Text style={styles.processingText}>Processing...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  recordingButton: {
    backgroundColor: theme.colors.error,
  },
  processingButton: {
    backgroundColor: theme.colors.textLight,
  },
  recordingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.error,
  },
  processingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.textLight,
  },
});
