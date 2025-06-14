import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../store';
import { markTaskComplete } from '../store/slices/taskSlice';
import { VoiceRecorder } from '../components/VoiceRecorder/VoiceRecorder';
import { TaskCard } from '../components/TaskCard/TaskCard';
import { theme } from '../theme';
import { RootStackParamList } from '../navigation/RootNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const activeTasks = tasks.filter(task => !task.completed);

  // Check if it's time for a ritual
  useEffect(() => {
    const checkRitualTime = () => {
      const now = new Date();
      const hours = now.getHours();
      
      // Morning ritual between 6-10 AM
      if (hours >= 6 && hours < 10) {
        // Check if morning ritual hasn't been done today
        // This would be more sophisticated in a real app
      }
      
      // Evening ritual between 6-10 PM
      if (hours >= 18 && hours < 22) {
        // Check if evening ritual hasn't been done today
      }
    };

    checkRitualTime();
    const interval = setInterval(checkRitualTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [navigation]);

  const handleRecordingComplete = (transcription: string) => {
    // In a real app, this would process the transcription through AI
    console.log('Recording complete:', transcription);
  };

  const handleTaskComplete = (taskId: string) => {
    dispatch(markTaskComplete(taskId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning</Text>
        <Text style={styles.subtitle}>
          {activeTasks.length === 0
            ? 'Ready to capture your thoughts?'
            : `${activeTasks.length} ${activeTasks.length === 1 ? 'task' : 'tasks'} in focus`}
        </Text>
      </View>

      <ScrollView
        style={styles.taskList}
        contentContainerStyle={styles.taskListContent}
        showsVerticalScrollIndicator={false}>
        {activeTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Tap the microphone to start capturing your thoughts
            </Text>
          </View>
        ) : (
          activeTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={() => handleTaskComplete(task.id)}
            />
          ))
        )}
      </ScrollView>

      <View style={styles.voiceRecorderContainer}>
        <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  greeting: {
    fontSize: theme.typography.sizes.xxxl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    paddingBottom: theme.spacing.xxl,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xxl,
  },
  emptyStateText: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  voiceRecorderContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
