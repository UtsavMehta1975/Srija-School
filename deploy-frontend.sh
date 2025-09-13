#!/bin/bash

# Frontend Deployment Script for Genesis School
# This script builds and deploys the React frontend to your Contabo VPS

set -e

echo "🎨 Starting Genesis School Frontend Deployment..."

# Configuration
SERVER_IP="185.196.21.112"
SERVER_USER="root"
FRONTEND_DIR="/var/www/genesis-school/frontend"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
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

# Check if we're in the right directory
if [ ! -f "frontend/package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Building React frontend for production..."

# Navigate to frontend directory
cd frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing frontend dependencies..."
    npm install
fi

# Create production environment file
print_status "Creating production environment configuration..."
cat > .env.production << 'EOF'
REACT_APP_API_URL=http://185.196.21.112/api
REACT_APP_NAME=Genesis School
EOF

# Build the frontend
print_status "Building React application..."
npm run build

print_status "Uploading frontend to server..."

# Create frontend directory on server
ssh "$SERVER_USER@$SERVER_IP" "mkdir -p $FRONTEND_DIR"

# Upload build files
scp -r build/* "$SERVER_USER@$SERVER_IP:$FRONTEND_DIR/"

print_status "Updating Nginx configuration..."

# SSH into server and update Nginx configuration
ssh "$SERVER_USER@$SERVER_IP" << 'EOF'
FRONTEND_DIR="/var/www/genesis-school/frontend"

# Create updated Nginx configuration
cat > /etc/nginx/sites-available/genesis-school << 'NGINXEOF'
server {
    listen 80;
    server_name 185.196.21.112;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

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
        alias /var/www/genesis-school/uploads;
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options nosniff;
        
        # Security for uploaded files
        location ~* \.(php|jsp|asp|sh|cgi)$ {
            deny all;
        }
    }

    # Serve React frontend
    location / {
        root /var/www/genesis-school/frontend;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Block access to sensitive files
    location ~ /\. {
        deny all;
    }

    location ~ \.(env|log|sql)$ {
        deny all;
    }
}
NGINXEOF

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx

echo "✅ Nginx configuration updated successfully!"

EOF

print_status "Frontend deployment completed successfully!"
print_status "Your website is now available at: http://185.196.21.112"
print_status "API endpoint: http://185.196.21.112/api"
print_status "Health check: http://185.196.21.112/health"

echo ""
echo "🎉 Genesis School website is now live!"
echo "📱 Frontend: http://185.196.21.112"
echo "🔧 Backend API: http://185.196.21.112/api"
echo "👤 Admin login: http://185.196.21.112/admin"
