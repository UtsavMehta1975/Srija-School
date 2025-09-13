#!/bin/bash

# Server Update Script
# Run this on your server to update the code

set -e

echo "🔄 Updating Srijan School code on server..."

# Navigate to application directory
cd /home/vibenetadmin/srija/Srija-School

echo "🔄 Pulling latest code from GitHub..."
git pull origin main

echo "📦 Installing backend dependencies..."
cd backend
npm install --production

echo "🔧 Updating environment variables..."
cat > .env << 'EOF'
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

echo "🔄 Restarting backend service..."
pm2 restart srijan-school-api

echo "✅ Server update completed successfully!"
echo "🌐 Backend API: http://185.196.21.112/api"
echo "❤️ Health check: http://185.196.21.112/health"
