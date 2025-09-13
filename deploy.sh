#!/bin/bash

# Genesis School Website Deployment Script
# This script handles the complete deployment process for both frontend and backend

set -e  # Exit on any error

echo "🚀 Starting Genesis School Website Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    
    print_success "All dependencies are installed."
}

# Setup environment variables
setup_environment() {
    print_status "Setting up environment variables..."
    
    # Backend environment
    if [ ! -f "backend/.env" ]; then
        print_status "Creating backend/.env file..."
        cat > backend/.env << EOF
# Database Connection (From Railway)
DB_HOST=switchyard.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=LpgosTcvdQwkPlwTNfxlxRffFXPZpmAJ
DB_NAME=railway
DB_PORT=10368

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_secure_12345

# Server Port
PORT=3001

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
EOF
        print_success "Backend .env file created."
    else
        print_warning "Backend .env file already exists. Skipping creation."
    fi
    
    # Frontend environment
    if [ ! -f "frontend/.env" ]; then
        print_status "Creating frontend/.env file..."
        cat > frontend/.env << EOF
REACT_APP_API_URL=http://localhost:3001
REACT_APP_NAME=Genesis School
EOF
        print_success "Frontend .env file created."
    else
        print_warning "Frontend .env file already exists. Skipping creation."
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    print_success "Backend dependencies installed."
    
    print_status "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
    print_success "Frontend dependencies installed."
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    # Create database setup script
    cat > setup-database.js << 'EOF'
const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

async function setupDatabase() {
  try {
    console.log('🔌 Connecting to database...');
    
    // Read and execute schema
    const schema = fs.readFileSync('./database/schema.sql', 'utf8');
    const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.promise().execute(statement);
        console.log('✅ Executed:', statement.substring(0, 50) + '...');
      }
    }
    
    console.log('🎉 Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
EOF

    # Move the script to backend directory
    mv setup-database.js backend/
    
    print_status "Running database setup..."
    cd backend
    node setup-database.js
    cd ..
    
    print_success "Database setup completed."
}

# Build frontend
build_frontend() {
    print_status "Building frontend for production..."
    cd frontend
    npm run build
    cd ..
    print_success "Frontend build completed."
}

# Start services
start_services() {
    print_status "Starting services..."
    
    # Start backend in background
    print_status "Starting backend server..."
    cd backend
    nohup npm start > ../logs/backend.log 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > ../logs/backend.pid
    cd ..
    
    # Wait a moment for backend to start
    sleep 5
    
    # Start frontend in background
    print_status "Starting frontend server..."
    cd frontend
    nohup npm start > ../logs/frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > ../logs/frontend.pid
    cd ..
    
    print_success "Services started successfully!"
    print_status "Backend PID: $BACKEND_PID"
    print_status "Frontend PID: $FRONTEND_PID"
}

# Create logs directory
create_logs_directory() {
    if [ ! -d "logs" ]; then
        mkdir logs
        print_success "Logs directory created."
    fi
}

# Health check
health_check() {
    print_status "Performing health check..."
    
    # Wait for services to start
    sleep 10
    
    # Check backend
    if curl -f http://localhost:3001/health > /dev/null 2>&1; then
        print_success "Backend is running and healthy."
    else
        print_error "Backend health check failed."
        return 1
    fi
    
    # Check frontend
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_success "Frontend is running and healthy."
    else
        print_error "Frontend health check failed."
        return 1
    fi
}

# Main deployment function
main() {
    echo "🎓 Genesis School Website Deployment Script"
    echo "============================================="
    
    # Create logs directory
    create_logs_directory
    
    # Check dependencies
    check_dependencies
    
    # Setup environment
    setup_environment
    
    # Install dependencies
    install_dependencies
    
    # Setup database
    setup_database
    
    # Build frontend
    build_frontend
    
    # Start services
    start_services
    
    # Health check
    if health_check; then
        print_success "🎉 Deployment completed successfully!"
        echo ""
        echo "🌐 Application URLs:"
        echo "   Frontend: http://localhost:3000"
        echo "   Backend:  http://localhost:3001"
        echo ""
        echo "📊 Logs:"
        echo "   Backend:  logs/backend.log"
        echo "   Frontend: logs/frontend.log"
        echo ""
        echo "🛑 To stop services, run: ./stop.sh"
    else
        print_error "❌ Deployment failed. Check logs for details."
        exit 1
    fi
}

# Run main function
main "$@"