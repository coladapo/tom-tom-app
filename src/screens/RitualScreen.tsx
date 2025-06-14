import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { VoiceRecorder } from '../components/VoiceRecorder/VoiceRecorder';
import { completeRitual } from '../store/slices/ritualSlice';
import { theme } from '../theme';
import { RootStackParamList } from '../navigation/RootNavigator';

type RitualScreenRouteProp = RouteProp<RootStackParamList, 'Ritual'>;

export const RitualScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RitualScreenRouteProp>();
  const dispatch = useDispatch();
  const { type } = route.params;
  const [hasRecorded, setHasRecorded] = useState(false);

  const ritualPrompts = {
    morning: [
      'How are you feeling this morning?',
      'What\'s your main focus for today?',
      'What would make today great?',
    ],
    evening: [
      'How was your day?',
      'What went well today?',
      'What\'s on your mind for tomorrow?',
    ],
  };

  const prompts = ritualPrompts[type];
  const greeting = type === 'morning' ? 'Good morning' : 'Good evening';

  const handleRecordingComplete = (transcription: string) => {
    setHasRecorded(true);
    // Process the ritual recording
    dispatch(
      completeRitual({
        id: Date.now().toString(),
        type,
        date: new Date().toISOString(),
        transcription,
        completedAt: new Date().toISOString(),
      })
    );
  };

  const handleComplete = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.subtitle}>
          Take a moment to reflect on your {type === 'morning' ? 'intentions' : 'day'}
        </Text>

        <View style={styles.promptsContainer}>
          {prompts.map((prompt, index) => (
            <View key={index} style={styles.promptItem}>
              <View style={styles.promptBullet} />
              <Text style={styles.promptText}>{prompt}</Text>
            </View>
          ))}
        </View>

        <VoiceRecorder onRecordingComplete={handleRecordingComplete} />

        {hasRecorded && (
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.completeButtonText}>Complete Ritual</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'center',
  },
  greeting: {
    fontSize: theme.typography.sizes.xxxl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  promptsContainer: {
    marginBottom: theme.spacing.xl,
  },
  promptItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  promptBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.md,
  },
  promptText: {
    flex: 1,
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
  },
  completeButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  completeButtonText: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.white,
  },
});
