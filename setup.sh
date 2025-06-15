#!/bin/bash

# Tom Tom App Setup Script
echo "🎤 Setting up Tom Tom App..."

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# iOS Setup
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Setting up iOS..."
    
    # Install pods
    cd ios
    pod install
    cd ..
    
    echo "✅ iOS setup complete"
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your API keys"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your API keys"
echo "2. Run 'npm run ios' to start the iOS app"
echo "3. Run 'npm run android' to start the Android app"
echo ""
echo "If you encounter build issues, check iOS_BUILD_FIX.md"
