import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { TaskCard } from '../components/TaskCard/TaskCard';
import { theme } from '../theme';

export const HistoryScreen: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const completedTasks = tasks.filter(task => task.completed);

  // Group tasks by date
  const tasksByDate = completedTasks.reduce((acc, task) => {
    const date = new Date(task.completedAt || task.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {} as Record<string, typeof completedTasks>);

  const sortedDates = Object.keys(tasksByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {sortedDates.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Your completed tasks will appear here
            </Text>
          </View>
        ) : (
          sortedDates.map(date => (
            <View key={date} style={styles.dateSection}>
              <Text style={styles.dateHeader}>{date}</Text>
              {tasksByDate[date].map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </View>
          ))
        )}
      </ScrollView>
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
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: theme.spacing.xxl,
  },
  dateSection: {
    marginBottom: theme.spacing.lg,
  },
  dateHeader: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xxl * 2,
  },
  emptyStateText: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
});
