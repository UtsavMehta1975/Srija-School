#!/bin/bash

echo "Setting up Git repository for Genesis School project..."

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
fi

# Add all files to git
echo "Adding all files to Git..."
git add .

# Create initial commit
echo "Creating initial commit..."
git commit -m "Initial commit: Genesis School website with comprehensive logging

Features:
- Complete frontend with React and Bootstrap
- Backend API with Express and MySQL
- Comprehensive logging with checkpoints throughout
- Environment configuration for easy deployment
- All pages working with proper navigation
- Database setup and configuration
- File upload functionality
- Admin dashboard
- Gallery management
- Faculty management
- Carousel management
- Rules and regulations pages
- Contact and messaging system"

# Set main branch
echo "Setting main branch..."
git branch -M main

# Add remote origin
echo "Adding remote origin..."
git remote add origin git@github.com:UtsavMehta1975/Srija-School.git

echo "Git repository setup complete!"
echo "To push to GitHub, run: git push -u origin main"
echo ""
echo "Note: Make sure you have SSH keys set up for GitHub authentication"

