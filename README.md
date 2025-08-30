# Loan Management System - Frontend

A modern Angular 20.x web application for managing loan applications, approvals, and user authentication. This system provides a comprehensive solution for financial institutions to streamline their loan processing workflow.

## 🎯 What This Project Does

The Loan Management System Frontend is a complete web application that enables:

### Core Functionality
- **User Authentication & Authorization**: Secure login/registration with role-based access control (Admin/User)
- **Loan Application Management**: Users can create, submit, and track loan applications
- **Multi-step Approval Workflow**: Admins can review, approve, or reject loan applications with comments
- **Dashboard Analytics**: Overview of loan statistics, pending applications, and user metrics
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile devices

### User Roles
- **Regular Users**: Can apply for loans, track application status, view their loan history
- **Administrators**: Can review applications, manage approval workflows, view system analytics

### Key Features
- Real-time application status updates
- Document upload and management
- Email notifications for status changes
- Advanced search and filtering
- Export capabilities for reports
- Secure API integration with backend services

## 🚀 Tech Stack

- **Frontend Framework**: Angular 20.1.x
- **Styling**: CSS3 with responsive design
- **HTTP Client**: Angular HttpClient for API communication
- **Routing**: Angular Router for SPA navigation
- **Forms**: Angular Reactive Forms with validation
- **Authentication**: JWT-based authentication
- **Build Tool**: Angular CLI with esbuild
- **Testing**: Jasmine + Karma

## 📋 Prerequisites

Before setting up this project, ensure you have:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Angular CLI**: Version 20.x (`npm install -g @angular/cli`)
- **Git**: For version control

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd loan-management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

The application uses different environment configurations:

#### Development Environment
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  appName: 'Loan Management System',
  version: '1.0.0'
};
```

#### Production Environment
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-api.com/api',
  appName: 'Loan Management System',
  version: '1.0.0'
};
```

### 4. Start Development Server
```bash
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200/`

## 🚀 Deployment

### Deploy to Vercel

1. **Prepare for deployment:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Set environment variables in Vercel dashboard:
     - `API_URL`: Your production backend URL
   - Deploy automatically triggers on git push

3. **Environment Variables in Vercel:**
   - Go to Project Settings → Environment Variables
   - Add `API_URL` with your backend URL
   - Set environment to "Production"

### Manual Deployment
```bash
# Build for production
npm run build

# The build artifacts will be in dist/loan-management/browser/
# Deploy these files to your web server
```

## 🔧 Available Scripts

```bash
# Development
npm start                    # Start development server
npm run build               # Build for production
npm run build:dev           # Build for development
npm test                    # Run unit tests
npm run watch               # Build and watch for changes

# Linting & Formatting
npm run lint                # Lint code (if configured)
npm run format              # Format code (if configured)
```

## 📁 Project Structure

```
src/
├── app/
│   ├── auth/                 # Authentication module
│   │   ├── login/           # Login component
│   │   └── auth.service.ts  # Authentication service
│   ├── dashboard/           # Dashboard module
│   ├── loan-application/    # Loan application module
│   ├── approval-workflow/   # Admin approval workflow
│   ├── shared/              # Shared components/services
│   └── app.component.ts     # Root component
├── environments/            # Environment configurations
├── assets/                  # Static assets
└── styles.css              # Global styles
```

## 🔐 Authentication Flow

1. User navigates to login page
2. Credentials are validated against backend API
3. JWT token is stored securely
4. User is redirected to appropriate dashboard based on role
5. All API requests include authentication headers

## 🔄 API Integration

The frontend communicates with a backend API for:
- User authentication and authorization
- Loan application CRUD operations
- File upload and document management
- Real-time notifications
- Analytics and reporting data

**Backend Repository**: [Link to backend repository if available]

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed (`npm install`)
2. **API Connection Issues**: Verify backend is running and API URLs are correct
3. **Authentication Problems**: Check JWT token expiration and backend connectivity

### Development Tips

- Use Angular DevTools browser extension for debugging
- Enable source maps for better error tracking
- Check network tab for API request/response debugging

## 📞 Support

For support and questions:
- Create an issue in this repository
- For questions or support, please contact me via email.