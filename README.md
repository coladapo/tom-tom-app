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
- **Voice Processing**: react-native-voice
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

### Installation

```bash
# Clone the repository
git clone https://github.com/coladapo/tom-tom-app.git
cd tom-tom-app

# Install dependencies
npm install
# or
yarn install

# iOS specific
cd ios && pod install

# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

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
- [ ] Voice capture with visual feedback
- [ ] Basic LLM integration for task parsing
- [ ] Simple task view with cards
- [ ] Morning/Evening ritual flows
- [ ] Basic sentiment indicators
- [ ] Local data storage

### Post-MVP
- [ ] Advanced continuity engine
- [ ] Calendar integration
- [ ] Export functionality
- [ ] Personalized AI coaching
- [ ] Cross-device sync

## 🤝 Contributing
Please read our contributing guidelines before submitting PRs.

## 📄 License
This project is licensed under the MIT License.
