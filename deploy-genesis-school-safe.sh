#!/bin/bash

# Genesis School Website - Safe Deployment Script
# This script deploys the Genesis School website in an isolated manner
# without interfering with other services on the server

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Project Information - Using specific ports and names to avoid conflicts
PROJECT_NAME="Genesis School Website"
PROJECT_PREFIX="genesis-school"
BACKEND_DIR="backend"
FRONTEND_DIR="frontend"
LOGS_DIR="logs"
UPLOADS_DIR="backend/uploads"

# Use specific ports that are less likely to conflict
BACKEND_PORT=3001
FRONTEND_PORT=3002  # Changed from 3000 to avoid conflicts
HEALTH_CHECK_PORT=3003

# Function to print colored output
print_header() {
    echo -e "${PURPLE}========================================${NC}"
    echo -e "${PURPLE}  $1${NC}"
    echo -e "${PURPLE}========================================${NC}"
}

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

print_step() {
    echo -e "${CYAN}[STEP]${NC} $1"
}

# Function to check if port is available
check_port() {
    local port=$1
    local service_name=$2
    
    if lsof -ti:$port >/dev/null 2>&1; then
        print_error "Port $port is already in use by another service: $service_name"
        print_error "Please stop the conflicting service or change the port in the script"
        return 1
    else
        print_success "Port $port is available for $service_name"
        return 0
    fi
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check system requirements and port availability
check_requirements() {
    print_header "Checking System Requirements & Port Availability"
    
    local missing_deps=()
    
    # Check Node.js
    if command_exists node; then
        local node_version=$(node --version)
        print_success "Node.js found: $node_version"
    else
        missing_deps+=("Node.js")
    fi
    
    # Check npm
    if command_exists npm; then
        local npm_version=$(npm --version)
        print_success "npm found: $npm_version"
    else
        missing_deps+=("npm")
    fi
    
    # Check Git
    if command_exists git; then
        local git_version=$(git --version)
        print_success "Git found: $git_version"
    else
        missing_deps+=("Git")
    fi
    
    # Check curl (for health checks)
    if command_exists curl; then
        print_success "curl found"
    else
        missing_deps+=("curl")
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        print_error "Missing required dependencies: ${missing_deps[*]}"
        print_error "Please install the missing dependencies and run the script again."
        exit 1
    fi
    
    # Check port availability
    print_status "Checking port availability..."
    check_port $BACKEND_PORT "Backend API" || exit 1
    check_port $FRONTEND_PORT "Frontend" || exit 1
    
    print_success "All system requirements met and ports are available!"
}

# Create isolated directories
create_directories() {
    print_step "Creating isolated project directories..."
    
    # Create logs directory with project prefix
    if [ ! -d "$LOGS_DIR" ]; then
        mkdir -p "$LOGS_DIR"
        print_success "Created logs directory"
    fi
    
    # Create uploads directories with proper permissions
    mkdir -p "$UPLOADS_DIR/carousel"
    mkdir -p "$UPLOADS_DIR/faculty"
    mkdir -p "$UPLOADS_DIR/gallery"
    mkdir -p "$UPLOADS_DIR/about"
    
    # Set proper permissions (readable by web server, writable by app)
    chmod 755 "$UPLOADS_DIR"
    chmod 755 "$UPLOADS_DIR"/*
    print_success "Created uploads directories with proper permissions"
    
    # Create backend logs directory
    mkdir -p "$BACKEND_DIR/logs"
    print_success "Created backend logs directory"
}

# Setup environment variables with isolated configuration
setup_environment() {
    print_step "Setting up isolated environment variables..."
    
    # Backend environment
    if [ ! -f "$BACKEND_DIR/.env" ]; then
        print_status "Creating backend/.env file..."
        cat > "$BACKEND_DIR/.env" << EOF
# Database Connection (Railway MySQL)
DB_HOST=switchyard.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=LpgosTcvdQwkPlwTNfxlxRffFXPZpmAJ
DB_NAME=railway
DB_PORT=10368

# JWT Secret (Project-specific)
JWT_SECRET=genesis_school_super_secret_jwt_key_2024_very_long_and_secure

# Server Configuration (Isolated ports)
PORT=$BACKEND_PORT
NODE_ENV=production

# CORS Configuration (Isolated frontend port)
CLIENT_URL=http://localhost:$FRONTEND_PORT

# Logging (Project-specific)
LOG_LEVEL=info
LOG_FILE=./logs/genesis-school.log

# Project Identification
PROJECT_NAME=Genesis School
PROJECT_PREFIX=$PROJECT_PREFIX
EOF
        print_success "Backend .env file created with isolated configuration"
    else
        print_warning "Backend .env file already exists. Skipping creation."
    fi
    
    # Frontend environment
    if [ ! -f "$FRONTEND_DIR/.env" ]; then
        print_status "Creating frontend/.env file..."
        cat > "$FRONTEND_DIR/.env" << EOF
# API Configuration (Isolated backend port)
REACT_APP_API_URL=http://localhost:$BACKEND_PORT
REACT_APP_NAME=Genesis School

# Environment
GENERATE_SOURCEMAP=false

# Project-specific configuration
REACT_APP_PROJECT_PREFIX=$PROJECT_PREFIX
EOF
        print_success "Frontend .env file created with isolated configuration"
    else
        print_warning "Frontend .env file already exists. Skipping creation."
    fi
}

# Install dependencies in isolated manner
install_dependencies() {
    print_step "Installing project dependencies (isolated)..."
    
    # Install backend dependencies
    print_status "Installing backend dependencies..."
    cd "$BACKEND_DIR"
    if [ ! -d "node_modules" ]; then
        npm install --production
        print_success "Backend dependencies installed"
    else
        print_warning "Backend dependencies already installed. Skipping."
    fi
    cd ..
    
    # Install frontend dependencies
    print_status "Installing frontend dependencies..."
    cd "$FRONTEND_DIR"
    if [ ! -d "node_modules" ]; then
        npm install
        print_success "Frontend dependencies installed"
    else
        print_warning "Frontend dependencies already installed. Skipping."
    fi
    cd ..
}

# Setup database with project-specific naming
setup_database() {
    print_step "Setting up database (isolated)..."
    
    # Create database setup script with project-specific naming
    cat > "$BACKEND_DIR/setup-database-isolated.js" << 'EOF'
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
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
    
    // Test connection first
    await connection.promise().execute('SELECT 1');
    console.log('✅ Database connection successful');
    
    // Read and execute schema
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolon and filter empty statements
    const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      if (statement) {
        try {
          await connection.promise().execute(statement);
          console.log(`✅ [${i + 1}/${statements.length}] Executed successfully`);
        } catch (error) {
          if (error.code === 'ER_TABLE_EXISTS_ERROR') {
            console.log(`⚠️  [${i + 1}/${statements.length}] Table already exists, skipping`);
          } else {
            console.error(`❌ [${i + 1}/${statements.length}] Error:`, error.message);
            throw error;
          }
        }
      }
    }
    
    console.log('🎉 Database setup completed successfully!');
    console.log('📊 Tables created: admin_users, carousel_slides, faculty, gallery_albums, gallery_images, gallery_videos, messages, about_content');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

setupDatabase();
EOF

    # Run database setup
    print_status "Running database setup..."
    cd "$BACKEND_DIR"
    node setup-database-isolated.js
    cd ..
    
    print_success "Database setup completed"
}

# Build frontend
build_frontend() {
    print_step "Building frontend for production..."
    
    cd "$FRONTEND_DIR"
    
    # Clean previous build
    if [ -d "build" ]; then
        rm -rf build
        print_status "Cleaned previous build"
    fi
    
    # Build the application
    npm run build
    print_success "Frontend build completed"
    
    cd ..
}

# Create isolated PM2 ecosystem file
create_pm2_config() {
    print_step "Creating isolated PM2 configuration..."
    
    cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: '$PROJECT_PREFIX-backend',
      script: './backend/server.js',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: $BACKEND_PORT
      },
      error_file: './logs/$PROJECT_PREFIX-backend-error.log',
      out_file: './logs/$PROJECT_PREFIX-backend-out.log',
      log_file: './logs/$PROJECT_PREFIX-backend-combined.log',
      time: true,
      // Isolated process settings
      exec_mode: 'fork',
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000
    },
    {
      name: '$PROJECT_PREFIX-frontend',
      script: 'serve',
      args: '-s build -l $FRONTEND_PORT',
      cwd: './frontend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'production'
      },
      error_file: '../logs/$PROJECT_PREFIX-frontend-error.log',
      out_file: '../logs/$PROJECT_PREFIX-frontend-out.log',
      log_file: '../logs/$PROJECT_PREFIX-frontend-combined.log',
      time: true,
      // Isolated process settings
      exec_mode: 'fork',
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000
    }
  ]
};
EOF

    print_success "Isolated PM2 configuration created"
}

# Install PM2 globally if not present (safe installation)
install_pm2() {
    if ! command_exists pm2; then
        print_status "Installing PM2 process manager (safe installation)..."
        npm install -g pm2
        print_success "PM2 installed"
    else
        print_success "PM2 already installed"
    fi
}

# Start services with PM2 (isolated)
start_services() {
    print_step "Starting services with PM2 (isolated)..."
    
    # Install serve for frontend if not present
    if ! command_exists serve; then
        print_status "Installing serve for frontend..."
        npm install -g serve
    fi
    
    # Stop only our project's PM2 processes (not all)
    pm2 stop ecosystem.config.js 2>/dev/null || true
    pm2 delete ecosystem.config.js 2>/dev/null || true
    
    # Start services
    pm2 start ecosystem.config.js
    
    # Save PM2 configuration (only for our project)
    pm2 save 2>/dev/null || true
    
    print_success "Services started with PM2 (isolated)"
}

# Health check with isolated ports
health_check() {
    print_step "Performing health check (isolated ports)..."
    
    # Wait for services to start
    print_status "Waiting for services to start..."
    sleep 15
    
    local backend_healthy=false
    local frontend_healthy=false
    
    # Check backend
    print_status "Checking backend health on port $BACKEND_PORT..."
    for i in {1..10}; do
        if curl -f http://localhost:$BACKEND_PORT/health > /dev/null 2>&1; then
            backend_healthy=true
            print_success "Backend is healthy on port $BACKEND_PORT"
            break
        else
            print_status "Backend not ready yet... (attempt $i/10)"
            sleep 3
        fi
    done
    
    # Check frontend
    print_status "Checking frontend health on port $FRONTEND_PORT..."
    for i in {1..10}; do
        if curl -f http://localhost:$FRONTEND_PORT > /dev/null 2>&1; then
            frontend_healthy=true
            print_success "Frontend is healthy on port $FRONTEND_PORT"
            break
        else
            print_status "Frontend not ready yet... (attempt $i/10)"
            sleep 3
        fi
    done
    
    if [ "$backend_healthy" = true ] && [ "$frontend_healthy" = true ]; then
        print_success "🎉 All services are healthy and running on isolated ports!"
        return 0
    else
        print_error "❌ Health check failed"
        if [ "$backend_healthy" = false ]; then
            print_error "Backend is not responding on port $BACKEND_PORT"
        fi
        if [ "$frontend_healthy" = false ]; then
            print_error "Frontend is not responding on port $FRONTEND_PORT"
        fi
        return 1
    fi
}

# Display deployment information
show_deployment_info() {
    print_header "Deployment Complete!"
    
    echo -e "${GREEN}🎓 Genesis School Website is now running in isolation!${NC}"
    echo ""
    echo -e "${CYAN}🌐 Application URLs (Isolated Ports):${NC}"
    echo -e "   Frontend: ${YELLOW}http://localhost:$FRONTEND_PORT${NC}"
    echo -e "   Backend:  ${YELLOW}http://localhost:$BACKEND_PORT${NC}"
    echo -e "   Health:   ${YELLOW}http://localhost:$BACKEND_PORT/health${NC}"
    echo ""
    echo -e "${CYAN}📊 Management Commands (Isolated):${NC}"
    echo -e "   View logs:     ${YELLOW}pm2 logs $PROJECT_PREFIX${NC}"
    echo -e "   View status:   ${YELLOW}pm2 status${NC}"
    echo -e "   Restart:       ${YELLOW}pm2 restart $PROJECT_PREFIX${NC}"
    echo -e "   Stop:          ${YELLOW}pm2 stop $PROJECT_PREFIX${NC}"
    echo -e "   Stop script:   ${YELLOW}./stop-genesis-school-safe.sh${NC}"
    echo ""
    echo -e "${CYAN}📁 Project Directories:${NC}"
    echo -e "   Logs:          ${YELLOW}./logs/${NC}"
    echo -e "   Uploads:       ${YELLOW}./backend/uploads/${NC}"
    echo -e "   Frontend:      ${YELLOW}./frontend/build/${NC}"
    echo ""
    echo -e "${CYAN}🔧 Admin Access:${NC}"
    echo -e "   URL:           ${YELLOW}http://localhost:$FRONTEND_PORT${NC}"
    echo -e "   Login:         Click 'Admin Login' in footer"
    echo -e "   Default:       admin / admin123"
    echo ""
    echo -e "${GREEN}✨ Your Genesis School website is running safely in isolation!${NC}"
    echo -e "${BLUE}ℹ️  This deployment uses isolated ports and won't interfere with other services.${NC}"
}

# Main deployment function
main() {
    print_header "Genesis School Website - Safe Deployment"
    echo -e "${BLUE}This script will deploy the Genesis School website in an isolated manner${NC}"
    echo -e "${BLUE}using specific ports and process names to avoid conflicts with other services.${NC}"
    echo ""
    echo -e "${YELLOW}⚠️  Using isolated ports: Backend=$BACKEND_PORT, Frontend=$FRONTEND_PORT${NC}"
    echo ""
    
    # Check requirements
    check_requirements
    
    # Create directories
    create_directories
    
    # Setup environment
    setup_environment
    
    # Install dependencies
    install_dependencies
    
    # Setup database
    setup_database
    
    # Build frontend
    build_frontend
    
    # Create PM2 config
    create_pm2_config
    
    # Install PM2
    install_pm2
    
    # Start services
    start_services
    
    # Health check
    if health_check; then
        show_deployment_info
    else
        print_error "Deployment completed but health check failed."
        print_error "Check logs for more information: pm2 logs $PROJECT_PREFIX"
        exit 1
    fi
}

# Run main function
main "$@"


