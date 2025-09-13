#!/bin/bash

echo "Setting up environment files for Genesis School project..."

# Create backend .env file
echo "Creating backend .env file..."
cat > backend/.env << EOF
# Backend Environment Variables
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=genesis_school
DB_PORT=3306

# Server Configuration
PORT=3001
NODE_ENV=development

# Client Configuration
CLIENT_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRES_IN=24h

# File Upload Configuration
MAX_FILE_SIZE=5242880
MAX_FILES=10

# Logging Configuration
LOG_LEVEL=debug
EOF

# Create frontend .env file
echo "Creating frontend .env file..."
cat > frontend/.env << EOF
# Frontend Environment Variables
# API Configuration
REACT_APP_API_URL=http://localhost:3001

# Development Settings
REACT_APP_ENVIRONMENT=development
REACT_APP_DEBUG=true

# Production Settings (uncomment for production)
# REACT_APP_API_URL=https://your-production-api.com
# REACT_APP_ENVIRONMENT=production
# REACT_APP_DEBUG=false
EOF

echo "Environment files created successfully!"
echo "Please update the database credentials in backend/.env file"
echo "For production, update the REACT_APP_API_URL in frontend/.env file"


