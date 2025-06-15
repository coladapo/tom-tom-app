# Tom Tom - Voice-First Productivity App

## 🎯 Vision
Tom Tom is a voice-first, emotionally aware productivity app designed for creatives, founders, and deep thinkers. It transforms spontaneous thoughts into structured, evolving tasks through AI-powered processing and sentiment analysis.

## ✨ Core Features
- **Voice-First Capture**: One-tap voice recording for frictionless thought capture
- **AI Task Processing**: LLM-powered parsing of voice inputs into structured tasks
- **Emotional Awareness**: Sentiment analysis to understand and reflect user's emotional state
- **Continuity Engine**: Tasks evolve and connect across days
- **Daily Rituals**: Morning and evening reflection routines
- **Minimalist Design**: Clean, calming interface that promotes focus

## 🛠 Tech Stack
- **Framework**: React Native with TypeScript
- **State Management**: Redux Toolkit
- **Voice Processing**: @react-native-voice/voice
- **AI Integration**: OpenAI API (or alternative LLM)
- **Local Storage**: AsyncStorage + SQLite
- **UI Components**: Custom design system based on PRD specifications

## 📱 Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn
- React Native development environment set up
- iOS: Xcode 14+
- Android: Android Studio

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/coladapo/tom-tom-app.git
cd tom-tom-app

# Run the setup script (macOS/Linux)
chmod +x setup.sh
./setup.sh

# Or manual setup:
npm install
cd ios && pod install && cd ..
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 🚨 Troubleshooting

**Having iOS build issues?** Check these guides:
- [iOS Build Fix Instructions](./iOS_BUILD_FIX.md) - Quick fixes for common issues
- [iOS Build Troubleshooting Guide](./iOS_BUILD_TROUBLESHOOTING.md) - Comprehensive solutions for Xcode errors

**Common Issues:**
- Always open `ios/TomTom.xcworkspace` in Xcode, not the `.xcodeproj` file
- If you see "React/RCTAppSetupUtils.h not found", run `npm run clean-ios`
- For voice features, test on a real device (simulator won't capture audio)

## 🎨 Design System

### Color Palette
- **Background**: #F9F7F6 (Warm Off-White)
- **Primary Accent**: #A5B4AB (Soft Sage Green)
- **Secondary Accent**: #D1A097 (Muted Coral)
- **Text**: #333333 (Deep Grey)

### Typography
- **Primary Font**: Inter
- **Headings**: Inter Semi-Bold

## 📂 Project Structure
```
src/
├── components/     # Reusable UI components
├── screens/        # App screens
├── services/       # API and external services
├── store/          # Redux store and slices
├── utils/          # Helper functions
├── types/          # TypeScript type definitions
└── theme/          # Design system and styling
```

## 🚀 Development Roadmap

### MVP Features
- [x] Voice capture UI with visual feedback
- [x] Task card components with sentiment indicators
- [x] Morning/Evening ritual screens
- [x] Redux store setup
- [ ] Actual voice recording integration
- [ ] LLM API integration
- [ ] Local data persistence

### Post-MVP
- [ ] Advanced continuity engine
- [ ] Calendar integration
- [ ] Export functionality
- [ ] Personalized AI coaching
- [ ] Cross-device sync

## 🔧 Useful Scripts

```bash
# Clean everything and reinstall
npm run clean

# Clean iOS build artifacts
npm run clean-ios

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🤝 Contributing
Please read our contributing guidelines before submitting PRs.

## 📄 License
This project is licensed under the MIT License.
