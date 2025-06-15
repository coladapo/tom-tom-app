# 🎯 TomTom iOS App - Project Documentation

---

## 📊 Project Overview

### Quick Stats
- **Project Start**: June 2025
- **Platform**: iOS (React Native)
- **Status**: 🟡 In Development
- **Current Phase**: Setup & Foundation
- **Team Size**: Solo Developer
- **Progress**: 70% Setup Complete

### Vision Statement
Tom Tom is a voice-first, emotionally aware productivity app designed for creatives, founders, and deep thinkers. It transforms spontaneous thoughts into structured, evolving tasks through AI-powered processing and sentiment analysis.

---

## 🚀 Development Status

### ✅ Completed Tasks
- [x] Project initialization & setup
- [x] React Native development environment
- [x] iOS Simulator configuration
- [x] Voice recording integration (@react-native-voice/voice)
- [x] OpenAI API integration for task parsing
- [x] Microphone permissions (iOS/Android)
- [x] TypeScript configuration & error fixes
- [x] Basic project structure
- [x] Environment variables setup

### 🔄 In Progress
- [ ] iOS project configuration (boost dependency issue)
- [ ] First app build & testing
- [ ] Voice recording UI testing

### 📋 Next Sprint
- [ ] Complete iOS build configuration
- [ ] Test voice recording functionality
- [ ] Verify AI task parsing with OpenAI
- [ ] UI/UX implementation
- [ ] Task storage system

---

## 🛠 Technical Architecture

### Tech Stack
- **Framework**: React Native 0.72.0
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Voice Processing**: @react-native-voice/voice
- **AI Integration**: OpenAI GPT-3.5-turbo
- **Storage**: AsyncStorage
- **Navigation**: React Navigation

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── TaskCard/       # Task display components
│   └── VoiceRecorder/  # Voice recording UI
├── screens/            # App screens
├── services/           # External service integrations
│   ├── ai.service.ts   # OpenAI integration
│   ├── voice.service.ts # Voice recording logic
│   └── storage.service.ts # Data persistence
├── store/              # Redux state management
├── types/              # TypeScript definitions
├── theme/              # Design system
└── utils/              # Helper functions
```

### Key Dependencies
```json
{
  "@react-native-voice/voice": "^3.2.4",
  "openai": "^5.3.0",
  "@reduxjs/toolkit": "^1.9.0",
  "@react-navigation/native": "^6.1.0"
}
```

---

## 🎨 Design System

### Color Palette
- **Background**: #F9F7F6 (Warm Off-White)
- **Primary Accent**: #A5B4AB (Soft Sage Green)
- **Secondary Accent**: #D1A097 (Muted Coral)
- **Text**: #333333 (Deep Grey)

### Typography
- **Primary Font**: Inter
- **Headings**: Inter Semi-Bold

### Key Screens
1. **HomeScreen** - Main task dashboard
2. **VoiceRecorder** - Voice capture interface
3. **RitualScreen** - Morning/evening routines
4. **HistoryScreen** - Past tasks & insights
5. **SettingsScreen** - App configuration

---

## 🔧 Development Environment

### Prerequisites
- Node.js v22.15.0 ✅
- Watchman ✅
- CocoaPods ✅
- Xcode Command Line Tools ✅
- iOS Simulator ✅

### Setup Commands
```bash
# Install dependencies
npm install

# iOS setup
cd ios && pod install

# Start development
npm start
npm run ios
```

### Environment Variables
```bash
# .env file (secured)
OPENAI_API_KEY=sk-proj-[SECURED]
ENABLE_SENTIMENT_ANALYSIS=true
ENABLE_VOICE_RECORDING=true
API_BASE_URL=https://api.tomtom.app
```

---

## 🐛 Issues & Debugging

### Current Issues
1. **Boost Dependency Issue** - React Native 0.72.0 compatibility
   - Status: Known issue with checksum validation
   - Solution: Upgrade to RN 0.73.0+ or manual patch
   - Priority: High

2. **iOS Project Structure** - Missing Xcode configuration
   - Status: iOS folder created, needs pod install completion
   - Priority: High

### Resolved Issues
- ✅ TypeScript errors in SettingsScreen.tsx
- ✅ Voice service boolean type conversion
- ✅ Missing metro.config.js file

---

## 📱 Feature Specifications

### Core Features
1. **Voice-First Capture**
   - One-tap recording
   - Visual waveform feedback
   - Automatic transcription

2. **AI Task Processing**
   - OpenAI GPT-3.5-turbo integration
   - Task extraction from speech
   - Sentiment analysis
   - Priority assignment

3. **Emotional Awareness**
   - Sentiment indicators (energy, calm, reflection, neutral)
   - Mood tracking over time
   - Contextual insights

4. **Daily Rituals**
   - Morning reflection routine
   - Evening review process
   - Habit tracking

### MVP Requirements
- [ ] Voice capture with visual feedback
- [ ] Basic LLM integration for task parsing
- [ ] Simple task view with cards
- [ ] Morning/Evening ritual flows
- [ ] Basic sentiment indicators
- [ ] Local data storage

---

## 🧪 Testing Strategy

### Testing Checklist
- [ ] Voice recording permissions
- [ ] Microphone access on iOS
- [ ] OpenAI API connectivity
- [ ] Task parsing accuracy
- [ ] UI responsiveness
- [ ] Data persistence
- [ ] App store compliance

### Device Testing Matrix
- iPhone 15 Simulator ✅
- Physical iPhone (pending)
- iPad compatibility (future)

---

## 🚀 Deployment Pipeline

### Build Process
1. Development testing
2. TypeScript compilation
3. iOS app build
4. TestFlight distribution
5. App Store submission

### App Store Requirements
- [ ] App icons (all sizes)
- [ ] Screenshots
- [ ] App description
- [ ] Privacy policy
- [ ] Terms of service

---

## 📈 Analytics & Metrics

### Key Metrics to Track
- Voice recording success rate
- Task parsing accuracy
- User engagement with rituals
- Sentiment analysis effectiveness
- Daily active usage

### Tools
- Built-in analytics (pending)
- Crash reporting (pending)
- Performance monitoring (pending)

---

## 🔮 Future Roadmap

### Phase 1: MVP (Current)
- Core voice & AI functionality
- Basic task management
- Daily ritual system

### Phase 2: Enhancement
- Advanced continuity engine
- Calendar integration
- Export functionality

### Phase 3: Intelligence
- Personalized AI coaching
- Cross-device sync
- Advanced analytics

### Phase 4: Expansion
- Android version
- Web companion
- API for integrations

---

## 📞 Project Contacts

### Development Team
- **Lead Developer**: [Your Name]
- **Project Type**: Solo Development
- **Repository**: https://github.com/coladapo/tom-tom-app

### Key Resources
- **OpenAI API**: Configured ✅
- **React Native Docs**: https://reactnative.dev
- **Notion Workspace**: This page

---

## 📝 Meeting Notes & Decisions

### June 14, 2025 - Initial Setup
- ✅ Completed React Native environment setup
- ✅ Integrated OpenAI API for task parsing
- ✅ Added voice recording capabilities
- 🔄 Working on iOS build configuration
- ❗ Identified boost dependency issue

### Key Decisions Made
1. Using OpenAI GPT-3.5-turbo for cost efficiency
2. React Native 0.72.0 for stability
3. Redux Toolkit for state management
4. Voice-first approach for core UX

---

## 🔗 Quick Links

- **Repository**: https://github.com/coladapo/tom-tom-app
- **Local Development**: `/Users/wivak/puo-jects/active/tom-tom-app`
- **OpenAI Dashboard**: https://platform.openai.com
- **React Native CLI**: https://reactnative.dev/docs/environment-setup

---

*Last Updated: June 14, 2025*
*Next Review: June 21, 2025*