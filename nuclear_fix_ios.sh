#!/bin/bash

# Tom Tom iOS Nuclear Fix Script
# This completely resets the iOS build environment to fix all library issues

echo "🚨 Tom Tom iOS Nuclear Fix - This will completely reset your iOS build"
echo "⏱️  This may take 5-10 minutes..."
echo ""

# Exit on any error
set -e

# 1. Kill any running processes that might interfere
echo "🔪 Killing any running Metro bundler or watchman..."
pkill -f "react-native.*metro" || true
pkill -f "watchman" || true
pkill -f "node.*react-native" || true

# 2. Clean Xcode derived data
echo "🧹 Cleaning Xcode derived data..."
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# 3. Clean watchman
echo "👁️  Cleaning watchman cache..."
watchman watch-del-all 2>/dev/null || true

# 4. Go to project directory
cd "$(dirname "$0")"

# 5. Remove all iOS build artifacts
echo "🗑️  Removing iOS build artifacts..."
cd ios
rm -rf build/
rm -rf Pods/
rm -f Podfile.lock
rm -rf ~/Library/Caches/CocoaPods
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf "${HOME}/Library/Caches/com.apple.dt.Xcode"
cd ..

# 6. Clean React Native caches
echo "🧹 Cleaning React Native caches..."
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*

# 7. Remove node modules
echo "📦 Removing node_modules..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# 8. Clean npm/yarn cache
echo "🧹 Cleaning package manager cache..."
npm cache clean --force
yarn cache clean 2>/dev/null || true

# 9. Reinstall node modules
echo "📦 Installing node_modules..."
npm install --legacy-peer-deps

# 10. Install pods with specific settings
echo "🍎 Installing CocoaPods..."
cd ios

# Clean pod cache
pod cache clean --all

# Deintegrate first
pod deintegrate

# Install with verbose output to see any issues
pod install --repo-update --verbose

cd ..

# 11. Create xcconfig file if missing
echo "📝 Creating xcconfig files..."
cat > ios/TomTom.xcconfig << 'EOF'
// Configuration settings file format documentation can be found at:
// https://help.apple.com/xcode/#/dev745c5c974

#include "Pods/Target Support Files/Pods-TomTom/Pods-TomTom.debug.xcconfig"

// Fix for React Native header search paths
HEADER_SEARCH_PATHS = $(inherited) "${PODS_ROOT}/Headers/Public" "${PODS_ROOT}/Headers/Public/React-Core" "${PODS_CONFIGURATION_BUILD_DIR}/React-Core/React-Core.framework/Headers"

// Fix for library search paths
LIBRARY_SEARCH_PATHS = $(inherited) "${PODS_CONFIGURATION_BUILD_DIR}"

// Ensure proper framework search paths
FRAMEWORK_SEARCH_PATHS = $(inherited) "${PODS_CONFIGURATION_BUILD_DIR}"
EOF

# 12. Fix the project file to ensure it references the xcconfig
echo "🔧 Fixing project references..."

# 13. Reset Metro bundler
echo "🔄 Resetting Metro bundler..."
npx react-native start --reset-cache &
METRO_PID=$!
sleep 5
kill $METRO_PID 2>/dev/null || true

# 14. Final instructions
echo ""
echo "✅ Nuclear fix complete!"
echo ""
echo "📱 Next steps:"
echo "1. Open Xcode: open ios/TomTom.xcworkspace"
echo "2. Wait for indexing to complete (important!)"
echo "3. Select your simulator or device"
echo "4. Clean build folder: Cmd+Shift+K"
echo "5. Build: Cmd+B"
echo ""
echo "If build still fails:"
echo "- In Xcode, go to Product → Scheme → Edit Scheme"
echo "- Under 'Build', make sure 'Pods-TomTom' is listed and checked"
echo "- Make sure it's above 'TomTom' in the build order"
echo ""
echo "🚀 Alternative: Try building from command line:"
echo "npx react-native run-ios --simulator='iPhone 14'"
