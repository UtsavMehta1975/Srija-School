#!/bin/bash

# Database Setup Script for Genesis School
# Run this on your Contabo VPS after MySQL is installed

set -e

echo "🗄️ Setting up Genesis School Database..."

# Database configuration
DB_NAME="srijadb"
DB_USER="srijadb"
DB_PASSWORD="SrijanSecure@2025!"

# Create database and user
echo "Creating database and user..."
mysql -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"
mysql -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';"
mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

echo "✅ Database and user created successfully!"

# Import schema
echo "📋 Importing database schema..."
mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME < database/schema.sql

echo "✅ Database setup completed successfully!"
echo "📊 Database: $DB_NAME"
echo "👤 User: $DB_USER"
echo "🔑 Password: $DB_PASSWORD"
