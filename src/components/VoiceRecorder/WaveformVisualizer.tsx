import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../../theme';

export const WaveformVisualizer: React.FC = () => {
  const bars = Array.from({ length: 5 }, (_, i) => useRef(new Animated.Value(0.3)).current);

  useEffect(() => {
    const animations = bars.map((bar, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(bar, {
            toValue: Math.random() * 0.7 + 0.3,
            duration: 200 + index * 50,
            useNativeDriver: true,
          }),
          Animated.timing(bar, {
            toValue: 0.3,
            duration: 200 + index * 50,
            useNativeDriver: true,
          }),
        ])
      );
    });

    animations.forEach(anim => anim.start());

    return () => {
      animations.forEach(anim => anim.stop());
    };
  }, [bars]);

  return (
    <View style={styles.container}>
      {bars.map((bar, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bar,
            {
              transform: [{ scaleY: bar }],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginBottom: theme.spacing.md,
  },
  bar: {
    width: 4,
    height: 40,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 2,
    borderRadius: 2,
  },
});
