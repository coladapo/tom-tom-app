# iOS Build Fix Instructions

## Step-by-Step Fix for Xcode Build Issues

### 1. Clean Everything First
```bash
# From the project root
cd tom-tom-app

# Clean all caches
npm run clean-ios
```

### 2. Install Dependencies
```bash
# Install Node modules
npm install

# Install CocoaPods
cd ios
pod install
cd ..
```

### 3. Fix React Native Voice Package Name
The package `react-native-voice` should be `@react-native-voice/voice`. Update your imports:

```typescript
// Change from:
import Voice from 'react-native-voice';

// To:
import Voice from '@react-native-voice/voice';
```

### 4. Open Xcode Correctly
```bash
# Always open the workspace, not the project
open ios/TomTom.xcworkspace
```

### 5. In Xcode, Set Build Settings
1. Select your project in the navigator
2. Select the TomTom target
3. Go to Build Settings
4. Search for "Deployment Target" and set to iOS 13.0
5. Search for "Suppress Warnings" and set to Yes

### 6. Fix Specific Issues

#### For React-RCTAppSetupUtils.h not found:
1. In Xcode, go to Product → Clean Build Folder (Cmd+Shift+K)
2. Close Xcode
3. Delete `ios/build` folder
4. Run `cd ios && pod install && cd ..`
5. Open Xcode and try building again

#### For GNU extension warnings:
These are warnings from React Native libraries and can be safely ignored for now. They don't prevent the build.

### 7. Build Command
```bash
# From project root
npx react-native run-ios

# Or with specific simulator
npx react-native run-ios --simulator="iPhone 14"
```

### 8. If Still Having Issues
```bash
# Nuclear option - complete reset
rm -rf node_modules
rm -rf ios/Pods
rm -rf ios/build
npm cache clean --force
watchman watch-del-all
npm install
cd ios && pod install && cd ..
npx react-native run-ios
```

### 9. Common Fixes
- Make sure you're using Node 18+
- Make sure Xcode is up to date
- Make sure Command Line Tools are installed: `xcode-select --install`
- Reset Metro bundler cache: `npx react-native start --reset-cache`

### 10. Voice Permissions
Add to `ios/TomTom/Info.plist`:
```xml
<key>NSMicrophoneUsageDescription</key>
<string>Tom Tom needs microphone access to capture your thoughts through voice</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>Tom Tom needs speech recognition to convert your voice to text</string>
```
