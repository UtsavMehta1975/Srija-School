# Database Server Setup Guide

## Current Issue
The database connection is timing out because MySQL on the server (185.196.21.112) is not configured to accept external connections.

## Required Steps to Fix

### 1. SSH into your server
```bash
ssh root@185.196.21.112
```

### 2. Install MySQL (if not already installed)
```bash
apt update
apt install mysql-server
```

### 3. Start and enable MySQL service
```bash
systemctl start mysql
systemctl enable mysql
```

### 4. Secure MySQL installation
```bash
mysql_secure_installation
```
Follow the prompts and set a root password.

### 5. Create the database and user
```bash
mysql -u root -p
```

Then run these SQL commands:
```sql
CREATE DATABASE srijadb;
CREATE USER 'srijadb'@'%' IDENTIFIED BY 'SrijanSecure@2025!';
GRANT ALL PRIVILEGES ON srijadb.* TO 'srijadb'@'%';
FLUSH PRIVILEGES;
EXIT;
```

### 6. Configure MySQL to accept external connections
Edit the MySQL configuration file:
```bash
nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

Find the line:
```
bind-address = 127.0.0.1
```

Change it to:
```
bind-address = 0.0.0.0
```

### 7. Restart MySQL service
```bash
systemctl restart mysql
```

### 8. Configure firewall to allow MySQL connections
```bash
ufw allow 3306/tcp
ufw reload
```

### 9. Test the connection from your local machine
After completing the above steps, run:
```bash
cd backend
node test-db.js
```

### 10. Run the database schema setup
Once the connection works, run:
```bash
node setup-database.js
```

## Alternative: Use the quick setup script
If you prefer, you can use the existing quick setup script:
```bash
node quick-setup.js
```

## Verification
After setup, you should be able to:
1. Connect to the database from your local machine
2. See all tables created in the `srijadb` database
3. Access the admin panel with username: `admin`, password: `admin123`

## Troubleshooting
- If connection still fails, check if MySQL is running: `systemctl status mysql`
- Check MySQL error logs: `tail -f /var/log/mysql/error.log`
- Verify firewall rules: `ufw status`
- Test local connection: `mysql -u srijadb -p -h localhost srijadb`




