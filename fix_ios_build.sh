#!/bin/bash

# Tom Tom iOS Build Fix Script
# This script fixes all the common iOS build issues

echo "🔧 Fixing Tom Tom iOS Build Issues..."

# 1. Clean everything first
echo "🧹 Cleaning build artifacts..."
cd ios
rm -rf build/
rm -rf ~/Library/Developer/Xcode/DerivedData
pod cache clean --all
cd ..

# 2. Remove problematic packages and reinstall
echo "📦 Reinstalling dependencies..."
rm -rf node_modules
rm -rf ios/Pods
rm package-lock.json

# Install with legacy peer deps to avoid conflicts
npm install --legacy-peer-deps

# 3. Fix React Native configuration
echo "🔨 Fixing React Native configuration..."

# Create .xcode.env.local if it doesn't exist
if [ ! -f "ios/.xcode.env.local" ]; then
  echo "export NODE_BINARY=$(which node)" > ios/.xcode.env.local
fi

# 4. Install pods with specific flags
echo "🍎 Installing CocoaPods..."
cd ios
pod deintegrate
pod install --repo-update
cd ..

# 5. Fix the Start Packager script issue
echo "📝 Patching build scripts..."

# Create a patch for the build phase
cat > ios/fix_build_phases.rb << 'EOF'
require 'xcodeproj'

project_path = './TomTom.xcodeproj'
project = Xcodeproj::Project.open(project_path)

# Fix the "Start Packager" script phase
project.targets.each do |target|
  if target.name == "TomTom"
    target.build_phases.each do |phase|
      if phase.is_a?(Xcodeproj::Project::Object::PBXShellScriptBuildPhase)
        if phase.name == "Start Packager"
          # Make it only run on debug builds
          phase.shell_script = "if [ \"$CONFIGURATION\" == \"Debug\" ]; then\n  export RCT_METRO_PORT=\"${RCT_METRO_PORT:=8081}\"\n  echo \"export RCT_METRO_PORT=${RCT_METRO_PORT}\" > \"${SRCROOT}/../node_modules/react-native/scripts/.packager.env\"\n  if [ -z \"${RCT_NO_LAUNCH_PACKAGER+xxx}\" ] ; then\n    if nc -w 5 -z localhost ${RCT_METRO_PORT} ; then\n      if ! curl -s \"http://localhost:${RCT_METRO_PORT}/status\" | grep -q \"packager-status:running\" ; then\n        echo \"Port ${RCT_METRO_PORT} already in use, packager is either not running or not running correctly\"\n        exit 2\n      fi\n    else\n      open \"$SRCROOT/../node_modules/react-native/scripts/launchPackager.command\" || echo \"Can't start packager automatically\"\n    fi\n  fi\nfi"
        end
      end
    end
  end
end

project.save
EOF

cd ios
ruby fix_build_phases.rb
rm fix_build_phases.rb
cd ..

echo "✅ Build fixes applied!"
echo ""
echo "Next steps:"
echo "1. Open Xcode: open ios/TomTom.xcworkspace"
echo "2. Clean build folder: Cmd+Shift+K"
echo "3. Build and run: Cmd+R"
echo ""
echo "If Metro bundler doesn't start automatically:"
echo "Run 'npx react-native start' in a separate terminal"
