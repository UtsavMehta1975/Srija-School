#!/bin/bash

# Update Server Code Script
# This script updates the code on your server from GitHub

set -e

echo "🔄 Updating Srijan School code on server..."

# Configuration
SERVER_IP="185.196.21.112"
SERVER_USER="vibenetadmin"
APP_DIR="/home/vibenetadmin/srija/Srija-School"

print_status() {
    echo -e "\033[0;32m[INFO]\033[0m $1"
}

print_status "Connecting to server and updating code..."

# SSH into server and update code
ssh "$SERVER_USER@$SERVER_IP" << EOF
set -e

echo "📁 Navigating to application directory..."
cd $APP_DIR

echo "🔄 Pulling latest code from GitHub..."
git pull origin main

echo "📦 Installing backend dependencies..."
cd backend
npm install --production

echo "🔄 Restarting backend service..."
pm2 restart srijan-school-api

echo "✅ Code update completed successfully!"
echo "🌐 Backend API: http://185.196.21.112/api"
echo "❤️ Health check: http://185.196.21.112/health"

EOF

print_status "Code update completed successfully!"
