#!/bin/bash

# Genesis School Website Start Script
# This script starts the services if they are not already running

set -e  # Exit on any error

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

# Check if services are already running
check_services() {
    print_status "Checking if services are already running..."
    
    # Check backend
    if [ -f "logs/backend.pid" ]; then
        BACKEND_PID=$(cat logs/backend.pid)
        if kill -0 $BACKEND_PID 2>/dev/null; then
            print_warning "Backend server is already running (PID: $BACKEND_PID)."
            return 1
        else
            print_status "Backend PID file exists but process is not running. Cleaning up..."
            rm -f logs/backend.pid
        fi
    fi
    
    # Check frontend
    if [ -f "logs/frontend.pid" ]; then
        FRONTEND_PID=$(cat logs/frontend.pid)
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            print_warning "Frontend server is already running (PID: $FRONTEND_PID)."
            return 1
        else
            print_status "Frontend PID file exists but process is not running. Cleaning up..."
            rm -f logs/frontend.pid
        fi
    fi
    
    return 0
}

# Start backend
start_backend() {
    print_status "Starting backend server..."
    cd backend
    
    # Check if .env exists
    if [ ! -f ".env" ]; then
        print_error "Backend .env file not found. Please run ./deploy.sh first."
        exit 1
    fi
    
    # Start backend in background
    nohup npm start > ../logs/backend.log 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > ../logs/backend.pid
    cd ..
    
    print_success "Backend server started (PID: $BACKEND_PID)."
}

# Start frontend
start_frontend() {
    print_status "Starting frontend server..."
    cd frontend
    
    # Check if .env exists
    if [ ! -f ".env" ]; then
        print_error "Frontend .env file not found. Please run ./deploy.sh first."
        exit 1
    fi
    
    # Start frontend in background
    nohup npm start > ../logs/frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > ../logs/frontend.pid
    cd ..
    
    print_success "Frontend server started (PID: $FRONTEND_PID)."
}

# Health check
health_check() {
    print_status "Performing health check..."
    
    # Wait for services to start
    sleep 10
    
    # Check backend
    local backend_healthy=false
    for i in {1..5}; do
        if curl -f http://localhost:3001/health > /dev/null 2>&1; then
            backend_healthy=true
            break
        fi
        print_status "Waiting for backend to start... (attempt $i/5)"
        sleep 5
    done
    
    if [ "$backend_healthy" = true ]; then
        print_success "Backend is running and healthy."
    else
        print_error "Backend health check failed. Check logs/backend.log for details."
        return 1
    fi
    
    # Check frontend
    local frontend_healthy=false
    for i in {1..5}; do
        if curl -f http://localhost:3000 > /dev/null 2>&1; then
            frontend_healthy=true
            break
        fi
        print_status "Waiting for frontend to start... (attempt $i/5)"
        sleep 5
    done
    
    if [ "$frontend_healthy" = true ]; then
        print_success "Frontend is running and healthy."
    else
        print_error "Frontend health check failed. Check logs/frontend.log for details."
        return 1
    fi
}

# Create logs directory
create_logs_directory() {
    if [ ! -d "logs" ]; then
        mkdir logs
        print_success "Logs directory created."
    fi
}

# Main function
main() {
    echo "🚀 Genesis School Website Start Script"
    echo "======================================"
    
    # Create logs directory
    create_logs_directory
    
    # Check if services are already running
    if ! check_services; then
        print_warning "Services appear to be already running. Use ./stop.sh to stop them first."
        exit 1
    fi
    
    # Start backend
    start_backend
    
    # Wait a moment for backend to start
    sleep 5
    
    # Start frontend
    start_frontend
    
    # Health check
    if health_check; then
        print_success "🎉 All services started successfully!"
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
        print_error "❌ Service startup failed. Check logs for details."
        exit 1
    fi
}

# Run main function
main "$@"



