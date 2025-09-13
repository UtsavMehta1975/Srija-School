#!/bin/bash

# Genesis School Website Stop Script
# This script stops all running services

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

# Stop services
stop_services() {
    print_status "Stopping Genesis School services..."
    
    # Stop backend
    if [ -f "logs/backend.pid" ]; then
        BACKEND_PID=$(cat logs/backend.pid)
        if kill -0 $BACKEND_PID 2>/dev/null; then
            print_status "Stopping backend server (PID: $BACKEND_PID)..."
            kill $BACKEND_PID
            print_success "Backend server stopped."
        else
            print_warning "Backend server was not running."
        fi
        rm -f logs/backend.pid
    else
        print_warning "Backend PID file not found."
    fi
    
    # Stop frontend
    if [ -f "logs/frontend.pid" ]; then
        FRONTEND_PID=$(cat logs/frontend.pid)
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            print_status "Stopping frontend server (PID: $FRONTEND_PID)..."
            kill $FRONTEND_PID
            print_success "Frontend server stopped."
        else
            print_warning "Frontend server was not running."
        fi
        rm -f logs/frontend.pid
    else
        print_warning "Frontend PID file not found."
    fi
    
    # Kill any remaining Node.js processes related to our project
    print_status "Cleaning up any remaining processes..."
    pkill -f "node.*server.js" 2>/dev/null || true
    pkill -f "react-scripts start" 2>/dev/null || true
    
    print_success "All services stopped successfully!"
}

# Main function
main() {
    echo "🛑 Genesis School Website Stop Script"
    echo "====================================="
    
    stop_services
    
    echo ""
    echo "✅ All services have been stopped."
    echo "📊 Logs are still available in the logs/ directory."
}

# Run main function
main "$@"



