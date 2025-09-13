#!/bin/bash

# MySQL Server Setup Script for Genesis School
# Run this script on your server (185.196.21.112) to configure MySQL

set -e

echo "🗄️ Setting up MySQL server for Genesis School..."

# Update system
echo "📦 Updating system packages..."
apt update

# Install MySQL if not already installed
echo "🔧 Installing MySQL server..."
apt install -y mysql-server

# Start and enable MySQL service
echo "🚀 Starting MySQL service..."
systemctl start mysql
systemctl enable mysql

# Create database and user
echo "👤 Creating database and user..."
mysql -e "CREATE DATABASE IF NOT EXISTS srijadb;"
mysql -e "CREATE USER IF NOT EXISTS 'srijadb'@'%' IDENTIFIED BY 'SrijanSecure@2025!';"
mysql -e "GRANT ALL PRIVILEGES ON srijadb.* TO 'srijadb'@'%';"
mysql -e "FLUSH PRIVILEGES;"

# Configure MySQL to accept external connections
echo "🌐 Configuring MySQL for external connections..."
sed -i 's/bind-address = 127.0.0.1/bind-address = 0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf

# Restart MySQL service
echo "🔄 Restarting MySQL service..."
systemctl restart mysql

# Configure firewall
echo "🔥 Configuring firewall..."
ufw allow 3306/tcp
ufw --force enable

# Test connection
echo "🧪 Testing database connection..."
mysql -u srijadb -p'SrijanSecure@2025!' -h localhost -e "USE srijadb; SHOW TABLES;"

echo "✅ MySQL server setup completed successfully!"
echo "📊 Database: srijadb"
echo "👤 User: srijadb"
echo "🔑 Password: SrijanSecure@2025!"
echo "🌐 External access: Enabled"
echo ""
echo "Now you can run the database schema setup from your local machine:"
echo "cd backend && node setup-database.js"




