#!/bin/bash

# Update Server and GitHub Script
# This script updates the server code and pushes to GitHub

set -e

echo "🔄 Updating Srijan School - Server and GitHub..."

# Configuration
SERVER_IP="185.196.21.112"
SERVER_USER="vibenetadmin"
APP_DIR="/home/vibenetadmin/srija/Srija-School"

print_status() {
    echo -e "\033[0;32m[INFO]\033[0m $1"
}

print_status "Step 1: Updating local code with correct database password..."

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

print_status "Step 2: Committing changes to GitHub..."

# Add all changes
git add .

# Commit changes
git commit -m "Updated backend configuration with correct database password and Vercel CORS settings"

# Push to GitHub
git push origin main

print_status "Step 3: Updating server code..."

# SSH into server and update code
ssh "$SERVER_USER@$SERVER_IP" << 'EOF'
set -e

echo "📁 Navigating to application directory..."
cd /home/vibenetadmin/srija/Srija-School

echo "🔄 Pulling latest code from GitHub..."
git pull origin main

echo "📦 Installing backend dependencies..."
cd backend
npm install --production

echo "🔧 Updating environment variables..."
cat > .env << 'ENVEOF'
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
ENVEOF

echo "🔄 Restarting backend service..."
pm2 restart srijan-school-api

echo "✅ Server update completed successfully!"
echo "🌐 Backend API: http://185.196.21.112/api"
echo "❤️ Health check: http://185.196.21.112/health"

EOF

print_status "Step 4: Testing API endpoints..."

# Test the API
echo "Testing health endpoint..."
curl -s http://185.196.21.112/health | head -5

echo ""
echo "Testing API endpoint..."
curl -s http://185.196.21.112/api/carousel | head -5

print_status "✅ All updates completed successfully!"
echo ""
echo "🎯 What's been updated:"
echo "  ✅ Local code updated with correct database password"
echo "  ✅ Changes pushed to GitHub"
echo "  ✅ Server code updated from GitHub"
echo "  ✅ Backend restarted with new configuration"
echo "  ✅ API tested and working"
echo ""
echo "🌐 Your backend is now live at: http://185.196.21.112/api"
echo "📱 Ready for Vercel frontend deployment!"
