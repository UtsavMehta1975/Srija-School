#!/bin/bash

# Genesis School Website - Stop Script
# This script stops all running services for the Genesis School website

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

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

# Function to check if PM2 is installed
check_pm2() {
    if ! command -v pm2 &> /dev/null; then
        print_error "PM2 is not installed. Cannot stop services."
        exit 1
    fi
}

# Stop PM2 services
stop_pm2_services() {
    print_status "Stopping PM2 services..."
    
    # Stop Genesis School services
    if pm2 list | grep -q "genesis-school"; then
        print_status "Stopping Genesis School services..."
        pm2 stop ecosystem.config.js 2>/dev/null || true
        pm2 delete ecosystem.config.js 2>/dev/null || true
        print_success "Genesis School services stopped"
    else
        print_warning "No Genesis School services found in PM2"
    fi
    
    # Stop all PM2 processes (optional)
    if [ "$1" = "--all" ]; then
        print_status "Stopping all PM2 processes..."
        pm2 stop all
        pm2 delete all
        print_success "All PM2 processes stopped"
    fi
}

# Kill any remaining Node.js processes
cleanup_processes() {
    print_status "Cleaning up any remaining processes..."
    
    # Kill processes on specific ports
    local backend_pid=$(lsof -ti:3001 2>/dev/null || true)
    local frontend_pid=$(lsof -ti:3000 2>/dev/null || true)
    
    if [ ! -z "$backend_pid" ]; then
        print_status "Killing backend process on port 3001 (PID: $backend_pid)"
        kill -9 $backend_pid 2>/dev/null || true
    fi
    
    if [ ! -z "$frontend_pid" ]; then
        print_status "Killing frontend process on port 3000 (PID: $frontend_pid)"
        kill -9 $frontend_pid 2>/dev/null || true
    fi
    
    # Kill any remaining Node.js processes related to our project
    pkill -f "node.*server.js" 2>/dev/null || true
    pkill -f "serve.*build" 2>/dev/null || true
    pkill -f "react-scripts start" 2>/dev/null || true
    
    print_success "Process cleanup completed"
}

# Show status
show_status() {
    print_status "Current service status:"
    
    # Check PM2 status
    if command -v pm2 &> /dev/null; then
        echo ""
        print_status "PM2 Status:"
        pm2 list
    fi
    
    # Check port status
    echo ""
    print_status "Port Status:"
    if lsof -ti:3001 &> /dev/null; then
        print_warning "Port 3001 (Backend) is still in use"
    else
        print_success "Port 3001 (Backend) is free"
    fi
    
    if lsof -ti:3000 &> /dev/null; then
        print_warning "Port 3000 (Frontend) is still in use"
    else
        print_success "Port 3000 (Frontend) is free"
    fi
}

# Clean up log files (optional)
cleanup_logs() {
    if [ "$1" = "--clean-logs" ]; then
        print_status "Cleaning up log files..."
        
        if [ -d "logs" ]; then
            rm -f logs/*.log
            print_success "Log files cleaned"
        else
            print_warning "No logs directory found"
        fi
    fi
}

# Main function
main() {
    print_header "Genesis School Website - Stop Script"
    
    # Parse arguments
    local stop_all=false
    local clean_logs=false
    
    for arg in "$@"; do
        case $arg in
            --all)
                stop_all=true
                ;;
            --clean-logs)
                clean_logs=true
                ;;
            --help)
                echo "Usage: $0 [options]"
                echo "Options:"
                echo "  --all        Stop all PM2 processes"
                echo "  --clean-logs Clean up log files"
                echo "  --help       Show this help message"
                exit 0
                ;;
        esac
    done
    
    # Check PM2
    check_pm2
    
    # Stop PM2 services
    if [ "$stop_all" = true ]; then
        stop_pm2_services --all
    else
        stop_pm2_services
    fi
    
    # Cleanup processes
    cleanup_processes
    
    # Clean logs if requested
    if [ "$clean_logs" = true ]; then
        cleanup_logs --clean-logs
    fi
    
    # Show status
    show_status
    
    print_success "🎉 Genesis School website stopped successfully!"
    echo ""
    echo -e "${BLUE}To start the website again, run:${NC}"
    echo -e "  ${YELLOW}./deploy-genesis-school.sh${NC}"
    echo ""
    echo -e "${BLUE}To view logs:${NC}"
    echo -e "  ${YELLOW}pm2 logs${NC}"
    echo ""
    echo -e "${BLUE}To check status:${NC}"
    echo -e "  ${YELLOW}pm2 status${NC}"
}

# Run main function
main "$@"


