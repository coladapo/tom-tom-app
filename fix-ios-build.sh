#!/bin/bash

echo "🔧 Fixing Tom Tom iOS Build Issues..."

# Navigate to ios directory
cd ios

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf build
rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf Pods
rm -f Podfile.lock

# Clean pod cache
echo "🗑️  Cleaning pod cache..."
pod cache clean --all

# Install pods
echo "📦 Installing pods..."
pod install --repo-update

# Navigate back
cd ..

# Fix metro config if needed
echo "📝 Creating metro.config.js..."
cat > metro.config.js << 'EOF'
const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
EOF

# Create react-native.config.js
echo "📝 Creating react-native.config.js..."
cat > react-native.config.js << 'EOF'
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
  dependencies: {
    'react-native-voice': {
      platforms: {
        ios: {
          // Fix for react-native-voice
        },
      },
    },
  },
};
EOF

echo "✅ iOS build fixes applied!"
echo ""
echo "Next steps:"
echo "1. Open Xcode: open ios/TomTom.xcworkspace"
echo "2. Select a simulator (iPhone 14 or newer recommended)"
echo "3. Click the play button to build and run"
echo ""
echo "Alternative: Run 'npm run ios' from the project root"
