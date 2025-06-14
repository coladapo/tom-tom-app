import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { completeOnboarding } from '../store/slices/userSlice';
import { VoiceRecorder } from '../components/VoiceRecorder/VoiceRecorder';
import { theme } from '../theme';
import { RootStackParamList } from '../navigation/RootNavigator';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);

  const steps = [
    {
      title: 'Welcome to Tom Tom',
      description: 'Your voice-first productivity companion that understands not just what you need to do, but how you feel about it.',
    },
    {
      title: 'Just speak your mind',
      description: 'Tap the microphone and share your thoughts, tasks, or feelings. Tom Tom will transform them into organized, actionable items.',
    },
    {
      title: 'Try it now',
      description: 'Let\'s start with something simple. Tell me what\'s on your mind today.',
      showRecorder: true,
    },
  ];

  const handleNext = () => {
    if (step === steps.length - 1) {
      dispatch(completeOnboarding());
      navigation.replace('Main');
    } else {
      setStep(step + 1);
    }
  };

  const handleRecordingComplete = () => {
    setHasRecorded(true);
  };

  const canProceed = step < 2 || (step === 2 && hasRecorded);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.stepIndicator}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepDot,
                index === step && styles.activeStepDot,
              ]}
            />
          ))}
        </View>

        <Text style={styles.title}>{steps[step].title}</Text>
        <Text style={styles.description}>{steps[step].description}</Text>

        {steps[step].showRecorder && (
          <View style={styles.recorderContainer}>
            <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
            {hasRecorded && (
              <Text style={styles.successText}>
                Great! Tom Tom is ready to help you stay productive.
              </Text>
            )}
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            !canProceed && styles.buttonDisabled,
          ]}
          onPress={handleNext}
          disabled={!canProceed}>
          <Text style={styles.buttonText}>
            {step === steps.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'center',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.xxl,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.divider,
    marginHorizontal: 4,
  },
  activeStepDot: {
    backgroundColor: theme.colors.primary,
    width: 24,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.sizes.lg,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.sizes.lg * theme.typography.lineHeights.relaxed,
  },
  recorderContainer: {
    marginTop: theme.spacing.xxl,
    alignItems: 'center',
  },
  successText: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.success,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: theme.colors.divider,
  },
  buttonText: {
    fontSize: theme.typography.sizes.base,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.white,
  },
});
