# Genesis School Website - Deployment Guide

This guide provides two deployment options for the Genesis School website:

## Option 1: Contabo VPS Deployment (Recommended)
Deploy both frontend and backend on your Contabo VPS server with MySQL database.

## Option 2: Cloud Platform Deployment
Deploy React frontend on Vercel and Node.js backend on Railway with MySQL database.

---

# Option 1: Contabo VPS Deployment

This option deploys everything on your Contabo VPS server (185.196.21.112) for full control and cost efficiency.

## Prerequisites for VPS Deployment

- Contabo VPS server (Ubuntu 24.04.3 LTS)
- SSH access to your VPS
- Domain name (optional, can use IP address)
- Basic knowledge of Linux commands

## Prerequisites for Cloud Deployment

- GitHub account
- Railway account (sign up at [railway.app](https://railway.app))
- Vercel account (sign up at [vercel.com](https://vercel.com))
- MySQL client (optional, for database setup)

## Project Structure

```
SchoolProject/
├── backend/                 # Node.js/Express API
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── routes/
│   ├── uploads/            # Image storage
│   ├── package.json
│   ├── server.js
│   └── .env.production
├── frontend/               # React application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vercel.json
├── deploy.sh               # VPS deployment script
├── ecosystem.config.js     # PM2 configuration
├── nginx.conf             # Nginx configuration
└── setup-database.sh      # Database setup script
```

---

## VPS Deployment Steps

### Step 1: Prepare Your Local Machine

1. **Make the deployment script executable:**
   ```bash
   chmod +x deploy.sh
   chmod +x setup-database.sh
   ```

2. **Ensure you have SSH access to your VPS:**
   ```bash
   ssh root@185.196.21.112
   ```

### Step 2: Run the Deployment Script

1. **Execute the deployment script from your project root:**
   ```bash
   ./deploy.sh
   ```

   This script will:
   - Install Node.js, MySQL, Nginx, and PM2
   - Set up the database and user
   - Deploy your backend application
   - Configure Nginx as a reverse proxy
   - Set up PM2 for process management
   - Configure firewall rules

### Step 3: Verify Backend Deployment

1. **Check if the API is running:**
   ```bash
   curl http://185.196.21.112/api/health
   ```

2. **SSH into your server to check status:**
   ```bash
   ssh root@185.196.21.112
   pm2 status
   pm2 logs genesis-school-api
   ```

### Step 4: Deploy Frontend

1. **Build the frontend for production:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Upload the build to your VPS:**
   ```bash
   scp -r build/* root@185.196.21.112:/var/www/genesis-school/frontend/
   ```

3. **Update Nginx configuration to serve the frontend:**
   ```bash
   ssh root@185.196.21.112
   nano /etc/nginx/sites-available/genesis-school
   ```

   Add this location block:
   ```nginx
   # Serve React frontend
   location / {
       root /var/www/genesis-school/frontend;
       try_files $uri $uri/ /index.html;
   }
   ```

4. **Restart Nginx:**
   ```bash
   nginx -t
   systemctl restart nginx
   ```

### Step 5: Configure Frontend for Production

1. **Update frontend API URL:**
   ```bash
   cd frontend
   echo "REACT_APP_API_URL=http://185.196.21.112/api" > .env.production
   ```

2. **Rebuild and redeploy:**
   ```bash
   npm run build
   scp -r build/* root@185.196.21.112:/var/www/genesis-school/frontend/
   ```

### Step 6: SSL Certificate (Optional but Recommended)

1. **Install Certbot:**
   ```bash
   ssh root@185.196.21.112
   apt install certbot python3-certbot-nginx
   ```

2. **Get SSL certificate:**
   ```bash
   certbot --nginx -d your-domain.com
   ```

### Step 7: Server Management Commands

**Useful commands for managing your deployment:**

```bash
# Check application status
pm2 status

# View logs
pm2 logs genesis-school-api

# Restart application
pm2 restart genesis-school-api

# Stop application
pm2 stop genesis-school-api

# Check Nginx status
systemctl status nginx

# Restart Nginx
systemctl restart nginx

# Check MySQL status
systemctl status mysql

# Access MySQL
mysql -u genesis_user -p genesis_school
```

### Step 8: Monitoring and Maintenance

1. **Set up log rotation:**
   ```bash
   ssh root@185.196.21.112
   pm2 install pm2-logrotate
   ```

2. **Monitor server resources:**
   ```bash
   htop
   df -h
   free -h
   ```

3. **Backup database regularly:**
   ```bash
   mysqldump -u genesis_user -p genesis_school > backup_$(date +%Y%m%d).sql
   ```

---

# Option 2: Cloud Platform Deployment

## Step 1: Database Setup

### 1.1 Create Railway MySQL Database

1. Go to [Railway](https://railway.app) and sign in
2. Click "New Project"
3. Select "Provision MySQL"
4. Wait for the database to be created
5. Go to the database service and copy the connection details

### 1.2 Run Database Schema

1. Connect to your Railway MySQL database using a MySQL client
2. Run the SQL script from `backend/database/schema.sql`
3. This will create all necessary tables and insert sample data

**Alternative: Use Railway's built-in MySQL client**
1. Go to your MySQL service in Railway
2. Click "Query" tab
3. Copy and paste the contents of `backend/database/schema.sql`
4. Execute the script

## Step 2: Backend Deployment (Railway)

### 2.1 Prepare Backend for Deployment

1. Update `backend/.env` with your Railway MySQL credentials:
```env
DB_HOST=your-railway-mysql-host
DB_USER=your-railway-mysql-user
DB_PASSWORD=your-railway-mysql-password
DB_NAME=your-railway-mysql-database
DB_PORT=your-railway-mysql-port

JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_secure_genesis_school_2024

PORT=3001

CLIENT_URL=https://your-frontend-domain.vercel.app
```

### 2.2 Deploy to Railway

1. Push your code to GitHub
2. Go to Railway dashboard
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Select the `backend` folder as the root directory
7. Railway will automatically detect it's a Node.js project
8. Add environment variables in Railway dashboard:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `DB_PORT`
   - `JWT_SECRET`
   - `PORT`
   - `CLIENT_URL`

### 2.3 Configure Railway Environment

1. In Railway dashboard, go to your backend service
2. Go to "Variables" tab
3. Add all the environment variables from your `.env` file
4. Set `CLIENT_URL` to your Vercel domain (you'll update this after frontend deployment)

### 2.4 Get Backend URL

1. Once deployed, Railway will provide a URL like: `https://your-backend-name.up.railway.app`
2. Note this URL - you'll need it for the frontend configuration

## Step 3: Frontend Deployment (Vercel)

### 3.1 Prepare Frontend for Deployment

1. Update `frontend/.env` with your Railway backend URL:
```env
REACT_APP_API_URL=https://your-backend-name.up.railway.app
REACT_APP_NAME=Genesis School
```

### 3.2 Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Set the root directory to `frontend`
5. Vercel will automatically detect it's a React project
6. Add environment variables:
   - `REACT_APP_API_URL`: Your Railway backend URL
   - `REACT_APP_NAME`: Genesis School
7. Click "Deploy"

### 3.3 Update Backend CORS

1. Go back to Railway dashboard
2. Update the `CLIENT_URL` environment variable to your Vercel domain
3. Redeploy the backend service

## Step 4: Image Storage Configuration

The application uses local file storage on Railway for uploaded images. Images are served as static files through the Express backend.

### 4.1 Image Storage Paths

- Carousel images: `/uploads/carousel/`
- Faculty photos: `/uploads/faculty/`
- Gallery images: `/uploads/gallery/`
- About section images: `/uploads/about/`

### 4.2 Accessing Images

Images are accessible via:
```
https://your-backend-name.up.railway.app/uploads/category/filename.jpg
```

## Step 5: Domain Configuration (Optional)

### 5.1 Custom Domain for Backend

1. In Railway dashboard, go to your backend service
2. Go to "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### 5.2 Custom Domain for Frontend

1. In Vercel dashboard, go to your project
2. Go to "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Step 6: SSL and Security

Both Railway and Vercel provide automatic SSL certificates. Ensure:

1. All API endpoints use HTTPS
2. JWT secrets are strong and unique
3. CORS is properly configured
4. File upload limits are set appropriately

## Step 7: Monitoring and Maintenance

### 7.1 Railway Monitoring

1. Monitor backend logs in Railway dashboard
2. Set up alerts for errors
3. Monitor database performance

### 7.2 Vercel Monitoring

1. Monitor frontend build logs
2. Check analytics in Vercel dashboard
3. Monitor performance metrics

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `CLIENT_URL` in backend matches your frontend domain
   - Check that CORS middleware is properly configured

2. **Database Connection Issues**
   - Verify all database environment variables are correct
   - Check Railway MySQL service status
   - Ensure database schema is properly created

3. **Image Upload Issues**
   - Check file size limits (currently 5MB)
   - Verify upload directories exist
   - Check file permissions

4. **Build Failures**
   - Check environment variables are set correctly
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

### Environment Variables Checklist

**Backend (Railway):**
- [ ] `DB_HOST`
- [ ] `DB_USER`
- [ ] `DB_PASSWORD`
- [ ] `DB_NAME`
- [ ] `DB_PORT`
- [ ] `JWT_SECRET`
- [ ] `PORT`
- [ ] `CLIENT_URL`

**Frontend (Vercel):**
- [ ] `REACT_APP_API_URL`
- [ ] `REACT_APP_NAME`

## Default Admin Credentials

After running the database schema, you can log in with:
- **Username:** `admin`
- **Password:** `admin123`

**Important:** Change these credentials immediately after deployment!

## Support

For issues with:
- **Railway:** Check Railway documentation or support
- **Vercel:** Check Vercel documentation or support
- **Application:** Check the application logs and error messages

## Post-Deployment Checklist

- [ ] Database schema created successfully
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Admin login working
- [ ] Image uploads working
- [ ] All pages loading correctly
- [ ] Contact form working
- [ ] CORS configured properly
- [ ] SSL certificates active
- [ ] Default admin credentials changed
- [ ] Environment variables secured
- [ ] Monitoring set up

Your Genesis School website should now be live and fully functional!

