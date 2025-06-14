import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TaskSentiment } from '../../types/task';
import { theme } from '../../theme';

interface SentimentIndicatorProps {
  sentiment: TaskSentiment;
  size?: 'small' | 'medium';
}

export const SentimentIndicator: React.FC<SentimentIndicatorProps> = ({
  sentiment,
  size = 'small',
}) => {
  const getColor = () => {
    switch (sentiment) {
      case 'calm':
        return theme.colors.sentimentCalm;
      case 'energy':
        return theme.colors.sentimentEnergy;
      case 'reflection':
        return theme.colors.sentimentReflection;
      default:
        return theme.colors.divider;
    }
  };

  return (
    <View
      style={[
        styles.indicator,
        size === 'medium' && styles.mediumIndicator,
        { backgroundColor: getColor() },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  mediumIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
