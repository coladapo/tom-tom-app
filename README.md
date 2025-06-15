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

# For iOS build issues, run the nuclear fix:
chmod +x nuclear_fix_ios.sh
./nuclear_fix_ios.sh

# Or regular setup:
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

## 🚨 iOS Build Troubleshooting

### 🔴 CRITICAL: Multiple Library Errors?
**If you see 50+ "library not found" errors**, use:
- **[iOS EMERGENCY RECOVERY](./iOS_EMERGENCY_RECOVERY.md)** - Nuclear option for completely broken builds
- **Run**: `./nuclear_fix_ios.sh`

### Regular Build Issues
1. **[iOS Complete Fix Guide](./iOS_COMPLETE_FIX.md)** - Comprehensive solutions
2. **[iOS Build Fix Instructions](./iOS_BUILD_FIX.md)** - Quick reference
3. **[iOS LaunchScreen Fix](./iOS_LAUNCHSCREEN_FIX.md)** - LaunchScreen.storyboard issues

**Most Common Issue:**
- Error: "React/RCTAppSetupUtils.h not found" 
- Solution: Run `./fix_ios_build.sh` or `./nuclear_fix_ios.sh`

**Remember:** Always open `ios/TomTom.xcworkspace` NOT `ios/TomTom.xcodeproj`!

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
# Nuclear fix for completely broken iOS builds
./nuclear_fix_ios.sh

# Standard iOS build fix
./fix_ios_build.sh

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
