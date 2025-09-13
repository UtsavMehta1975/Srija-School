# Srijan School Website

A comprehensive school management website with frontend and backend components, featuring comprehensive logging and easy deployment.

## Features

### Frontend (React)
- **Home Page**: Welcome carousel with school information
- **About Page**: School mission, vision, and faculty information
- **Gallery**: Photo, video, and media galleries
- **Rules & Regulations**: All school policies and guidelines
- **Achievements**: School and student accomplishments
- **Contact**: Contact form and school information
- **Admin Dashboard**: Content management system

### Backend (Express.js + MySQL)
- **Authentication**: JWT-based admin authentication
- **Database**: MySQL with comprehensive schema
- **File Upload**: Image and media file handling
- **API Endpoints**: RESTful API for all frontend needs
- **Logging**: Comprehensive checkpoint-based logging
- **CORS**: Proper cross-origin resource sharing

## Project Structure

```
SchoolProject/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── context/         # React context providers
│   └── public/              # Static assets
├── backend/                 # Express.js backend API
│   ├── config/              # Database configuration
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── routes/              # API routes
│   ├── uploads/             # File upload directory
│   └── utils/               # Utility functions
└── scripts/                 # Setup and deployment scripts
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- Git

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:UtsavMehta1975/Srijan-School.git
   cd Srijan-School
   ```

2. **Setup Environment**
   ```bash
   chmod +x setup-env.sh
   ./setup-env.sh
   ```

3. **Install Dependencies**
   ```bash
   # Backend dependencies
   cd backend
   npm install
   
   # Frontend dependencies
   cd ../frontend
   npm install
   ```

4. **Database Setup**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE srijadb;
   
   # Run database setup
   cd backend
   node setup-database.js
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

### Environment Configuration

#### Backend (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=srijadb
DB_PORT=3306
PORT=3001
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key_here
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development
REACT_APP_DEBUG=true
```

## Comprehensive Logging

The project includes comprehensive logging with checkpoint numbers for easy debugging:

### Backend Logging
- `checkpoint 1-6 database.js` - Database connection and configuration
- `checkpoint 1-15 server.js` - Server startup and configuration
- Each API route includes detailed request/response logging

### Frontend Logging
- `checkpoint 1-8 api.js` - API service initialization and requests
- Each page component includes mount and data fetching checkpoints
- Detailed error logging for debugging

### Log Format
```
checkpoint [number] [filename] - [description]
```

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/me` - Get current user
- `PUT /api/admin/change-password` - Change password

### Content Management
- `GET /api/carousel` - Get carousel slides
- `GET /api/faculty` - Get faculty members
- `GET /api/gallery/albums` - Get gallery albums
- `GET /api/about` - Get about content
- `POST /api/messages` - Submit contact message

### Admin Endpoints (Protected)
- All content management endpoints with `/admin` prefix
- File upload endpoints
- CRUD operations for all content types

## Deployment

### Production Environment Variables

#### Backend
```env
NODE_ENV=production
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
CLIENT_URL=https://your-domain.com
JWT_SECRET=your_production_jwt_secret
```

#### Frontend
```env
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_ENVIRONMENT=production
REACT_APP_DEBUG=false
```

### Git Setup
```bash
chmod +x setup-git.sh
./setup-git.sh
git push -u origin main
```

## Database Schema

The database includes tables for:
- `admin_users` - Admin authentication
- `carousel_slides` - Homepage carousel
- `faculty_members` - Staff information
- `gallery_albums` - Photo gallery organization
- `gallery_images` - Image storage
- `gallery_videos` - Video content
- `about_content` - About page content
- `contact_messages` - Contact form submissions

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MySQL service is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **Frontend Compilation Errors**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Verify all environment variables

3. **File Upload Issues**
   - Check uploads directory permissions
   - Verify file size limits
   - Ensure proper CORS configuration

### Debug Mode
Enable debug logging by setting:
```env
REACT_APP_DEBUG=true
LOG_LEVEL=debug
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper logging
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: devbhoomiacademy2009@gmail.com
- Phone: 7895236185
- UDISE Code: 05110413202