#!/bin/bash

# Backend Only Deployment Script for Srijan School
# This script deploys only the backend to your Contabo VPS

set -e

echo "🚀 Starting Srijan School Backend Deployment..."

# Configuration
SERVER_IP="185.196.21.112"
SERVER_USER="vibenetadmin"
APP_DIR="/home/vibenetadmin/srija/Srija-School"
SERVICE_NAME="srijan-school-api"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_status "Installing system dependencies..."

# Update system and install dependencies
apt update && apt upgrade -y
apt install -y nodejs npm mysql-server nginx git curl wget

print_status "Installing PM2 process manager..."
npm install -g pm2

print_status "Setting up MySQL database..."

# Start and enable MySQL
systemctl start mysql
systemctl enable mysql

# Create database and user
mysql -e "CREATE DATABASE IF NOT EXISTS genesis_school;"
mysql -e "CREATE USER IF NOT EXISTS 'genesis_user'@'localhost' IDENTIFIED BY 'GenesisSchool2024!';"
mysql -e "GRANT ALL PRIVILEGES ON genesis_school.* TO 'genesis_user'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

print_status "Setting up application directory..."

# Navigate to application directory
cd $APP_DIR

print_status "Installing backend dependencies..."
cd backend
npm install --production

print_status "Setting up environment variables..."

# Create .env file for backend
cat > .env << 'EOF'
# Database Configuration
DB_HOST=localhost
DB_USER=genesis_user
DB_PASSWORD=GenesisSchool2024!
DB_NAME=genesis_school
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

print_status "Setting up database schema..."

# Import database schema
mysql -u genesis_user -pGenesisSchool2024! genesis_school < database/schema.sql

print_status "Creating uploads directories..."
mkdir -p uploads/{about,carousel,faculty,gallery}
chmod 755 uploads
chmod 755 uploads/*

print_status "Configuring Nginx..."

# Create Nginx configuration
cat > /etc/nginx/sites-available/srijan-school << 'EOF'
server {
    listen 80;
    server_name 185.196.21.112;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;

    # API routes
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Health check
    location /health {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Serve uploaded files
    location /uploads {
        alias /home/vibenetadmin/srija/Srija-School/backend/uploads;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options nosniff;
        
        # Security for uploaded files
        location ~* \.(php|jsp|asp|sh|cgi)$ {
            deny all;
        }
    }

    # Block access to sensitive files
    location ~ /\. {
        deny all;
    }

    location ~ \.(env|log|sql)$ {
        deny all;
    }

    # Default location - return API info
    location / {
        return 200 'Srijan School API Server - Backend Only\nAPI Endpoints: /api/*\nHealth Check: /health\nUploads: /uploads/*';
        add_header Content-Type text/plain;
    }
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/srijan-school /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx

print_status "Starting application with PM2..."

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'srijan-school-api',
    script: 'server.js',
    cwd: '/home/vibenetadmin/srija/Srija-School/backend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    error_file: '/var/log/pm2/srijan-school-api-error.log',
    out_file: '/var/log/pm2/srijan-school-api-out.log',
    log_file: '/var/log/pm2/srijan-school-api-combined.log',
    time: true
  }]
};
EOF

# Start the application
pm2 start ecosystem.config.js
pm2 save
pm2 startup

print_status "Configuring firewall..."

# Configure firewall
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

print_status "Backend deployment completed successfully!"
print_status "Your API is now available at: http://185.196.21.112/api"
print_status "Health check: http://185.196.21.112/health"
print_status "Uploads: http://185.196.21.112/uploads"

echo ""
echo "🔧 Useful commands for server management:"
echo "  Check app status: pm2 status"
echo "  View logs: pm2 logs srijan-school-api"
echo "  Restart app: pm2 restart srijan-school-api"
echo "  Stop app: pm2 stop srijan-school-api"
echo "  Check Nginx: systemctl status nginx"
echo "  Check MySQL: systemctl status mysql"

echo ""
echo "🌐 Your backend is ready for Vercel frontend!"
echo "📱 Frontend should connect to: http://185.196.21.112/api"
