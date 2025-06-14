import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from '../../types/task';
import { theme } from '../../theme';
import { SentimentIndicator } from './SentimentIndicator';

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
  onComplete?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  onComplete,
}) => {
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }] },
        task.completed && styles.completedContainer,
      ]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                task.completed && styles.completedText,
              ]}
              numberOfLines={2}>
              {task.title}
            </Text>
            {task.sentiment && <SentimentIndicator sentiment={task.sentiment} />}
          </View>
          
          {task.description && (
            <Text
              style={[
                styles.description,
                task.completed && styles.completedText,
              ]}
              numberOfLines={2}>
              {task.description}
            </Text>
          )}
          
          <View style={styles.footer}>
            <Text style={styles.time}>
              {new Date(task.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            
            {!task.completed && onComplete && (
              <TouchableOpacity
                style={styles.completeButton}
                onPress={onComplete}>
                <Icon name="check" size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    ...theme.shadows.sm,
  },
  completedContainer: {
    opacity: 0.7,
  },
  content: {
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  title: {
    flex: 1,
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.text,
    marginRight: theme.spacing.sm,
  },
  description: {
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: theme.colors.textLight,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: theme.typography.sizes.xs,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textLight,
  },
  completeButton: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
