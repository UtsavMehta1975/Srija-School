# Quick Deployment Guide - Genesis School

## 🚀 One-Command Deployment

### For Contabo VPS (Recommended)

1. **Make scripts executable:**
   ```bash
   chmod +x deploy.sh deploy-frontend.sh setup-database.sh
   ```

2. **Deploy backend:**
   ```bash
   ./deploy.sh
   ```

3. **Deploy frontend:**
   ```bash
   ./deploy-frontend.sh
   ```

4. **Access your website:**
   - Website: http://185.196.21.112
   - API: http://185.196.21.112/api
   - Admin: http://185.196.21.112/admin
   - Health: http://185.196.21.112/health

### Default Admin Credentials
- **Username:** `admin`
- **Password:** `admin123`

**⚠️ Important:** Change these credentials immediately after deployment!

## 🔧 Server Management

### Check Status
```bash
ssh root@185.196.21.112
pm2 status
systemctl status nginx
systemctl status mysql
```

### View Logs
```bash
pm2 logs genesis-school-api
tail -f /var/log/nginx/access.log
```

### Restart Services
```bash
pm2 restart genesis-school-api
systemctl restart nginx
systemctl restart mysql
```

### Backup Database
```bash
mysqldump -u genesis_user -p genesis_school > backup_$(date +%Y%m%d).sql
```

## 📁 File Structure on Server

```
/var/www/genesis-school/
├── server.js              # Backend application
├── package.json           # Backend dependencies
├── .env                   # Environment variables
├── uploads/               # Uploaded images
│   ├── about/
│   ├── carousel/
│   ├── faculty/
│   └── gallery/
└── frontend/              # React build files
    ├── index.html
    ├── static/
    └── ...
```

## 🌐 Nginx Configuration

The Nginx server is configured to:
- Serve React frontend on `/`
- Proxy API requests to `/api` → Node.js backend
- Serve uploaded files from `/uploads`
- Handle health checks on `/health`

## 🔒 Security Features

- Firewall configured (ports 22, 80, 443)
- File upload restrictions
- CORS properly configured
- Security headers enabled
- Sensitive file access blocked

## 📊 Monitoring

- PM2 process manager for backend
- Nginx access and error logs
- MySQL query logs
- System resource monitoring

## 🆘 Troubleshooting

### Backend not starting
```bash
pm2 logs genesis-school-api
pm2 restart genesis-school-api
```

### Database connection issues
```bash
mysql -u genesis_user -p genesis_school
systemctl status mysql
```

### Nginx issues
```bash
nginx -t
systemctl status nginx
tail -f /var/log/nginx/error.log
```

### Frontend not loading
```bash
ls -la /var/www/genesis-school/frontend/
systemctl restart nginx
```

## 🔄 Updates and Maintenance

### Update Backend
1. Make changes to your code
2. Run `./deploy.sh` again
3. PM2 will automatically restart the application

### Update Frontend
1. Make changes to your React code
2. Run `./deploy-frontend.sh`
3. Nginx will serve the new build

### Database Updates
1. SSH into server
2. Run SQL commands directly or upload new schema
3. Restart backend if needed

## 📞 Support

If you encounter issues:
1. Check the logs first
2. Verify all services are running
3. Check firewall and port configurations
4. Ensure all environment variables are set correctly

Your Genesis School website is now fully deployed and ready to use! 🎉
