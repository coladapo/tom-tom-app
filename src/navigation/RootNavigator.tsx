import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { MainTabNavigator } from './MainTabNavigator';
import { RitualScreen } from '../screens/RitualScreen';
import { theme } from '../theme';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  Ritual: { type: 'morning' | 'evening' };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const onboardingCompleted = useSelector(
    (state: RootState) => state.user.onboardingCompleted
  );

  return (
    <Stack.Navigator
      initialRouteName={onboardingCompleted ? 'Main' : 'Onboarding'}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen
        name="Ritual"
        component={RitualScreen}
        options={{
          presentation: 'modal',
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
};
