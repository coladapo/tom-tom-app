# Tom Tom iOS Build Troubleshooting Guide

Based on your Xcode build errors, here's how to fix them:

## 🚨 Quick Fix Steps

### 1. First, Clean Everything
```bash
# From project root
cd tom-tom-app

# Clean all build artifacts
rm -rf ios/build
rm -rf ios/Pods
rm -rf node_modules
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# Clear caches
watchman watch-del-all
npm cache clean --force
```

### 2. Reinstall Dependencies
```bash
# Install node modules
npm install

# Install iOS dependencies
cd ios
pod install
cd ..
```

### 3. Fix the 'React/RCTAppSetupUtils.h' file not found Error

This is the most critical error. Add this to your `ios/Podfile` (already added in the repo):

```ruby
post_install do |installer|
  # ... existing code ...
  
  installer.pods_project.targets.each do |target|
    if target.name == 'React-RCTAppDelegate'
      target.build_configurations.each do |config|
        config.build_settings['HEADER_SEARCH_PATHS'] ||= []
        config.build_settings['HEADER_SEARCH_PATHS'] << '"$(PODS_ROOT)/Headers/Private/React-Core"'
      end
    end
  end
end
```

### 4. Open Xcode Correctly
```bash
# IMPORTANT: Always open the .xcworkspace file, NOT .xcodeproj
open ios/TomTom.xcworkspace
```

### 5. In Xcode, Update Build Settings

1. Select TomTom project in navigator
2. Select TomTom target
3. Go to Build Settings tab
4. Make these changes:
   - **iOS Deployment Target**: Set to 13.0
   - **EXCLUDED_ARCHS**: Add `arm64` for "Any iOS Simulator SDK" (if on M1/M2 Mac)
   - **Suppress Warnings**: Yes

### 6. Fix Specific Warnings

#### For "char_traits<T> is deprecated" warnings:
These are from React Native libraries and are warnings only. To suppress:
1. In Build Settings, search for "Other C++ Flags"
2. Add: `-Wno-deprecated-declarations`

#### For RNGestureHandler warnings:
These are also just warnings and won't prevent building. They'll be fixed in future library updates.

### 7. Build from Command Line First
```bash
# This often works better than Xcode GUI
npx react-native run-ios --simulator="iPhone 14"
```

### 8. If Still Failing - Nuclear Option
```bash
# Complete reset script
chmod +x setup.sh
./setup.sh

# Then try building again
npx react-native run-ios
```

## 🔧 Common Issues & Solutions

### Issue: Command PhaseScriptExecution failed
**Solution**: Make sure you have proper permissions and the script exists:
```bash
cd ios
chmod +x Pods/Target\ Support\ Files/Pods-TomTom/Pods-TomTom-frameworks.sh
```

### Issue: Module 'React' not found
**Solution**: 
```bash
cd ios
pod deintegrate
pod install
```

### Issue: Build succeeds but app crashes
**Solution**: Check that Info.plist has microphone permissions (already added in repo)

## 📱 Testing Voice Features

Once built successfully:
1. The app will ask for microphone permissions on first launch
2. If testing on simulator, voice features won't work (need real device)
3. For simulator testing, the UI will work but voice capture will be simulated

## 🆘 Still Having Issues?

1. Check Xcode version (should be 14.0+)
2. Check Command Line Tools: `xcode-select --install`
3. Try building for a real device instead of simulator
4. Check React Native doctor: `npx react-native doctor`

## 💡 Pro Tips

- Always use `.xcworkspace` not `.xcodeproj`
- Clean build folder in Xcode: Cmd+Shift+K
- Reset Metro bundler: `npx react-native start --reset-cache`
- If on M1/M2 Mac, you might need Rosetta: `softwareupdate --install-rosetta`

Remember: Most of these are warnings, not errors. The critical error is the missing header file which the Podfile fix should resolve.
