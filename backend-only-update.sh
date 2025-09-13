#!/bin/bash

# Backend Only Update Script
# This ONLY updates backend configuration - NO UI changes

echo "🔧 Updating ONLY backend configuration..."

# Update backend .env file
cat > backend/.env << 'EOF'
# Database Configuration
DB_HOST=185.196.21.112
DB_USER=root
DB_PASSWORD=SrijanSecure@2025!
DB_NAME=srijadb
DB_PORT=3306

# Server Configuration
PORT=3001
NODE_ENV=production

# CORS Configuration - Allow Vercel domains
CLIENT_URL=https://srija-school.vercel.app

# JWT Secret
JWT_SECRET=SrijanSchoolJWTSecret2024ProductionKey

# File Upload Configuration
MAX_FILE_SIZE=5242880
MAX_FILES=10
EOF

echo "✅ Backend configuration updated!"
echo "🌐 Your UI remains exactly the same!"
echo "📱 Backend ready for Vercel frontend!"
