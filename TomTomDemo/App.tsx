import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';

interface Task {
  id: string;
  title: string;
  sentiment: 'energy' | 'calm' | 'reflection' | 'neutral';
  originalText: string;
}

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Welcome to TomTom!',
      sentiment: 'energy',
      originalText: 'Demo task to show the interface',
    },
  ]);
  const [pulseAnim] = useState(new Animated.Value(1));

  const startRecording = () => {
    setIsRecording(true);
    
    // Start pulse animation
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

    // Simulate recording for 3 seconds
    setTimeout(() => {
      stopRecording();
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    pulseAnim.setValue(1);
    
    // Simulate AI processing
    const sampleTexts = [
      'I need to call my dentist tomorrow',
      'Prepare for the big presentation',
      'Take time to reflect on my goals',
      'Schedule a meeting with the team',
      'Buy groceries for dinner',
    ];
    
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    const sentiments: Task['sentiment'][] = ['energy', 'calm', 'reflection', 'neutral'];
    const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    
    setTimeout(() => {
      const newTask: Task = {
        id: Date.now().toString(),
        title: randomText,
        sentiment: randomSentiment,
        originalText: `Voice input: "${randomText}"`,
      };
      
      setTasks(prev => [newTask, ...prev]);
    }, 1000);
  };

  const getSentimentColor = (sentiment: Task['sentiment']) => {
    switch (sentiment) {
      case 'energy': return '#FFE5B4';
      case 'calm': return '#E5F3FF';
      case 'reflection': return '#F0E5FF';
      default: return '#F5F5F5';
    }
  };

  const getSentimentTextColor = (sentiment: Task['sentiment']) => {
    switch (sentiment) {
      case 'energy': return '#CC8800';
      case 'calm': return '#0066CC';
      case 'reflection': return '#6600CC';
      default: return '#666666';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎯 TomTom</Text>
        <Text style={styles.subtitle}>Voice-First Productivity</Text>
        <Text style={styles.description}>
          Tap the microphone to record your thoughts and watch AI convert them into tasks!
        </Text>
      </View>

      <View style={styles.voiceSection}>
        <Animated.View style={[styles.recordButtonContainer, { transform: [{ scale: pulseAnim }] }]}>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={isRecording ? undefined : startRecording}
            disabled={isRecording}
          >
            <Text style={styles.recordButtonText}>
              {isRecording ? '🎙️' : '🎤'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.status}>
          {isRecording ? '🎙️ Recording... speak now!' : 'Tap to record your thoughts'}
        </Text>
        {isRecording && (
          <View style={styles.waveform}>
            <Text style={styles.waveformText}>🌊 Processing voice...</Text>
          </View>
        )}
      </View>

      <View style={styles.tasksSection}>
        <Text style={styles.tasksHeader}>📋 Today's Tasks</Text>
        <ScrollView style={styles.tasksList} showsVerticalScrollIndicator={false}>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <View
                style={[
                  styles.sentimentBadge,
                  { backgroundColor: getSentimentColor(task.sentiment) },
                ]}
              >
                <Text
                  style={[
                    styles.sentimentText,
                    { color: getSentimentTextColor(task.sentiment) },
                  ]}
                >
                  {task.sentiment}
                </Text>
              </View>
              <Text style={styles.taskOriginal}>{task.originalText}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          📱 This is the TomTom iOS app running in Expo!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F6',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  voiceSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  recordButtonContainer: {
    marginBottom: 15,
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#A5B4AB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  recordingButton: {
    backgroundColor: '#D1A097',
  },
  recordButtonText: {
    fontSize: 32,
  },
  status: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  waveform: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  waveformText: {
    fontSize: 14,
    color: '#666666',
  },
  tasksSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tasksHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 15,
  },
  tasksList: {
    flex: 1,
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#A5B4AB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  sentimentBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  sentimentText: {
    fontSize: 12,
    fontWeight: '500',
  },
  taskOriginal: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#A5B4AB',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
