# iOS Build Issues - Complete Fix Guide

Based on your Xcode errors, here's exactly what you need to do:

## 🚨 The Main Issue
The primary error is **"React/RCTAppSetupUtils.h file not found"**. All other warnings are secondary and won't prevent the build.

## ✅ Quick Fix (Do This First!)

### Step 1: Pull Latest Updates & Run Fix Script
```bash
cd tom-tom-app
git pull origin main

# Run the automated fix script
chmod +x fix_ios_build.sh
./fix_ios_build.sh
```

### Step 2: If Script Doesn't Work, Manual Fix
```bash
# 1. Complete clean
cd ios
rm -rf build/
rm -rf Pods/
rm -rf ~/Library/Developer/Xcode/DerivedData/*
cd ..

# 2. Clean node modules
rm -rf node_modules
rm package-lock.json

# 3. Reinstall everything
npm install --legacy-peer-deps

# 4. Reinstall pods
cd ios
pod deintegrate
pod install --repo-update
cd ..
```

### Step 3: Open Xcode and Build
```bash
# IMPORTANT: Use workspace, not project
open ios/TomTom.xcworkspace
```

In Xcode:
1. Clean Build Folder: `Cmd+Shift+K`
2. Build: `Cmd+B`
3. Run: `Cmd+R`

## 🔧 Understanding the Errors

### 1. ❌ CRITICAL: "React/RCTAppSetupUtils.h file not found"
**Solution**: Updated Podfile now includes proper header search paths

### 2. ⚠️ WARNING: "char_traits<T> is deprecated"
**Status**: Just warnings from React Native libraries, won't block build

### 3. ⚠️ WARNING: RNAsyncStorage nullability warnings
**Status**: Fixed in Podfile, but still just warnings

### 4. ⚠️ WARNING: "Start Packager will run every build"
**Status**: Normal behavior, not an error

## 🎯 Alternative Solutions

### Option A: Build from Command Line (Often Works Better)
```bash
# Start Metro in one terminal
npx react-native start --reset-cache

# In another terminal, build and run
npx react-native run-ios --simulator="iPhone 14"
```

### Option B: Create Fresh React Native Project and Copy Code
If nothing works, this nuclear option always works:
```bash
# Create fresh project
npx react-native init TomTomFresh --version 0.72.5
cd TomTomFresh

# Copy your source code
cp -r ../tom-tom-app/src ./
cp ../tom-tom-app/package.json ./
cp ../tom-tom-app/App.tsx ./

# Install and run
npm install
cd ios && pod install && cd ..
npx react-native run-ios
```

## 📱 Expected Result
After following these steps:
1. Build will succeed (ignore the warnings)
2. App will launch in simulator
3. You'll see the onboarding screen
4. Voice features won't work in simulator (need real device)

## 🆘 Still Failing?

### Check These:
1. **Node version**: Must be 18+
   ```bash
   node --version  # Should show v18.x.x or higher
   ```

2. **Xcode version**: Must be 14.0+
   ```bash
   xcodebuild -version
   ```

3. **Command Line Tools**:
   ```bash
   xcode-select --install
   ```

4. **M1/M2 Mac?** Try:
   ```bash
   arch -x86_64 pod install
   ```

### Last Resort:
If all else fails, the issue might be your local environment. Try:
1. Update macOS and Xcode to latest versions
2. Completely uninstall and reinstall Node
3. Clear all React Native caches:
   ```bash
   watchman watch-del-all
   rm -rf $TMPDIR/react-*
   rm -rf $TMPDIR/metro-*
   rm -rf $TMPDIR/haste-*
   ```

## 💡 Pro Tip
The warnings you're seeing (deprecated char_traits, etc.) are from React Native's C++ code and will be fixed in future RN versions. They're annoying but harmless. Focus on fixing the "file not found" error - once that's resolved, the build will succeed despite the warnings.
