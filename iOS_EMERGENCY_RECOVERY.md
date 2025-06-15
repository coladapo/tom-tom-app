# 🚨 iOS EMERGENCY BUILD RECOVERY 🚨

Your iOS build has **58 library errors** - this guide will fix them all.

## ⚡ QUICK FIX (Try This First!)

```bash
# 1. Pull latest fixes
cd tom-tom-app
git pull origin main

# 2. Run the nuclear fix script
chmod +x nuclear_fix_ios.sh
./nuclear_fix_ios.sh

# 3. Wait for it to complete (5-10 minutes)
# 4. Open Xcode and try building
```

## 🔴 If Quick Fix Fails - MANUAL RECOVERY

### Step 1: Complete Environment Reset
```bash
# Kill everything
killall Xcode
pkill -f "react-native"
pkill -f "watchman"
pkill -f "node"

# Clean EVERYTHING
rm -rf ~/Library/Developer/Xcode/DerivedData/*
rm -rf ~/Library/Caches/CocoaPods
cd tom-tom-app
rm -rf node_modules
rm -rf ios/Pods
rm -rf ios/build
rm -f ios/Podfile.lock
rm -f package-lock.json
```

### Step 2: Reinstall From Scratch
```bash
# Install Node modules with legacy deps flag
npm install --legacy-peer-deps

# Go to iOS directory
cd ios

# Clean CocoaPods completely
pod cache clean --all
pod deintegrate

# Install pods fresh
pod install --repo-update

# Go back to project root
cd ..
```

### Step 3: Fix Xcode Project Settings

1. **Open the WORKSPACE (not project):**
   ```bash
   open ios/TomTom.xcworkspace
   ```

2. **In Xcode:**
   - Click on "TomTom" in the project navigator
   - Select the "TomTom" target
   - Go to "Build Settings" tab
   - Search for "Search Paths"
   
3. **Fix Header Search Paths:**
   - Double-click "Header Search Paths"
   - Add these (if not present):
     ```
     $(inherited)
     "${PODS_ROOT}/Headers/Public"
     "${PODS_ROOT}/Headers/Private"
     "${PODS_CONFIGURATION_BUILD_DIR}"
     ```

4. **Fix Library Search Paths:**
   - Double-click "Library Search Paths"
   - Add these:
     ```
     $(inherited)
     "${PODS_CONFIGURATION_BUILD_DIR}"
     "${PODS_ROOT}"
     ```

### Step 4: Verify Pod Installation

Check that Pods installed correctly:
```bash
ls -la ios/Pods/
```

You should see folders for all React Native libraries like:
- React-Core
- React-RCTAnimation
- React-RCTBlob
- React-RCTImage
- etc.

If not, pods didn't install properly. Run:
```bash
cd ios
pod install --verbose
```

### Step 5: Clean Build in Xcode
1. In Xcode: `Product` → `Clean Build Folder` (Cmd+Shift+K)
2. Close Xcode completely
3. Delete DerivedData again: `rm -rf ~/Library/Developer/Xcode/DerivedData/*`
4. Reopen Xcode: `open ios/TomTom.xcworkspace`
5. Let Xcode index (wait for it to finish - see progress bar at top)
6. Build: `Product` → `Build` (Cmd+B)

## 🔥 NUCLEAR OPTION - Start Fresh

If nothing works, create a fresh React Native project and migrate:

```bash
# Create fresh project
cd ..
npx react-native init TomTomFresh --version 0.72.5
cd TomTomFresh

# Copy source code
cp -r ../tom-tom-app/src ./
cp ../tom-tom-app/App.tsx ./
cp ../tom-tom-app/package.json ./
cp ../tom-tom-app/tsconfig.json ./
cp ../tom-tom-app/babel.config.js ./
cp -r ../tom-tom-app/ios/TomTom/Info.plist ./ios/TomTomFresh/
cp -r ../tom-tom-app/ios/TomTom/LaunchScreen.storyboard ./ios/TomTomFresh/

# Install and run
npm install
cd ios && pod install && cd ..
npx react-native run-ios
```

## 🎯 Common Causes of This Error

1. **Corrupted Pods installation** - Most likely cause
2. **Xcode opened .xcodeproj instead of .xcworkspace**
3. **M1/M2 Mac architecture issues**
4. **Interrupted pod install**
5. **Xcode cache corruption**

## ✅ How to Verify Fix Worked

After following the steps, in Xcode you should see:
- No red errors about libraries not found
- Build succeeds (ignore yellow warnings)
- App launches in simulator

## 🆘 Still Failing?

1. **Check CocoaPods version:**
   ```bash
   pod --version  # Should be 1.11.0 or higher
   ```

2. **Update if needed:**
   ```bash
   sudo gem install cocoapods
   ```

3. **Try building from command line:**
   ```bash
   npx react-native run-ios --simulator="iPhone 14"
   ```

4. **Check React Native doctor:**
   ```bash
   npx react-native doctor
   ```

## 📞 Last Resort

If absolutely nothing works:
1. Your Xcode installation might be corrupted
2. Try on a different Mac
3. Post the full error log to GitHub issues

Remember: The warnings about "char_traits deprecated" are normal and can be ignored. Focus on fixing the "library not found" errors.
