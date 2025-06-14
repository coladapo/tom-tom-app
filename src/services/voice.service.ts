// Voice Service for handling voice recording and transcription
// This integrates with react-native-voice

import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

export class VoiceService {
  private static isInitialized = false;

  /**
   * Initialize the voice service
   */
  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await Voice.isAvailable();
      this.isInitialized = true;
    } catch (error) {
      console.error('Voice service not available:', error);
      throw new Error('Voice recognition not available on this device');
    }
  }

  /**
   * Start voice recording
   */
  static async startRecording(
    onResults: (results: string[]) => void,
    onError: (error: Error) => void
  ): Promise<void> {
    try {
      await this.initialize();

      // Set up event listeners
      Voice.onSpeechResults = (e: SpeechResultsEvent) => {
        if (e.value) {
          onResults(e.value);
        }
      };

      Voice.onSpeechError = (e: SpeechErrorEvent) => {
        onError(new Error(e.error?.message || 'Speech recognition error'));
      };

      // Start recording
      await Voice.start('en-US');
    } catch (error) {
      onError(error as Error);
    }
  }

  /**
   * Stop voice recording
   */
  static async stopRecording(): Promise<string[]> {
    try {
      await Voice.stop();
      return [];
    } catch (error) {
      console.error('Error stopping recording:', error);
      return [];
    }
  }

  /**
   * Cancel voice recording
   */
  static async cancelRecording(): Promise<void> {
    try {
      await Voice.cancel();
    } catch (error) {
      console.error('Error cancelling recording:', error);
    }
  }

  /**
   * Clean up voice service
   */
  static async destroy(): Promise<void> {
    try {
      await Voice.destroy();
      Voice.removeAllListeners();
      this.isInitialized = false;
    } catch (error) {
      console.error('Error destroying voice service:', error);
    }
  }

  /**
   * Check if voice service is recording
   */
  static async isRecording(): Promise<boolean> {
    try {
      return await Voice.isRecognizing();
    } catch (error) {
      return false;
    }
  }
}
