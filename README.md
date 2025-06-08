# PineChat Assistant

A modern, intelligent chat assistant built for Pine Labs, featuring real-time conversations, business insights, and merchant analytics. This application provides an intuitive interface for users to interact with AI-powered assistance while accessing comprehensive business data and insights.

## 🚀 Features

- **Real-time Chat Interface**: Modern, responsive chat UI with typing indicators
- **Business Insights**: Access to comprehensive business analytics and insights
- **Merchant Analytics**: Detailed merchant transaction data and performance metrics
- **Search Functionality**: Search through chat history and messages
- **Responsive Design**: Beautiful, modern UI built with Tailwind CSS and Radix UI
- **Real-time Updates**: Live data updates using React Query
- **Error Handling**: Comprehensive error handling with user-friendly notifications

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Query** - Data fetching and caching
- **Wouter** - Lightweight routing
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Backend Integration
- **REST API** - Communication with backend services
- **Proxy Configuration** - Development server proxy setup

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Backend Server** running on port 8000 (see configuration section)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd PineChatAssistant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Server URLs

The application is configured to connect to a backend server. You need to update the server URLs in the following file:

#### `vite.config.ts`

Update the proxy configuration to point to your backend server:

```typescript
server: {
  host: "127.0.0.1",
  port: 5000,
  proxy: {
    "/query": {
      target: "http://127.0.0.1:8000", // ← Change this to your backend URL
      changeOrigin: true,
      secure: false,
    },
    "/business-insights": {
      target: "http://127.0.0.1:8000", // ← Change this to your backend URL
      changeOrigin: true,
      secure: false,
    },
    "/get-cards-data": {
      target: "http://127.0.0.1:8000", // ← Change this to your backend URL
      changeOrigin: true,
      secure: false,
    },
  },
}
```

**Replace `http://127.0.0.1:8000` with your actual backend server URL.**

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://127.0.0.1:5000`

### 5. Build for Production

```bash
npm run build
```

The built files will be in the `dist/public` directory.

### 6. Preview Production Build

```bash
npm run preview
```

## 🔧 Configuration

### Environment Setup

The application uses the following configuration:

- **Frontend Port**: 5000 (configurable in `vite.config.ts`)
- **Backend Port**: 8000 (default, change in proxy configuration)
- **Host**: 127.0.0.1 (localhost)

### API Endpoints

The application expects the following API endpoints on your backend server:

- `POST /query` - Chat message processing
- `GET /business-insights` - Business analytics data
- `GET /get-cards-data` - Merchant card transaction data

### Changing Server Configuration

To change the backend server URL:

1. Open `vite.config.ts`
2. Locate the `server.proxy` section
3. Update the `target` URLs for all endpoints:
   - `/query`
   - `/business-insights`
   - `/get-cards-data`
4. Restart the development server

Example for production server:
```typescript
proxy: {
  "/query": {
    target: "https://your-production-api.com",
    changeOrigin: true,
    secure: true,
  },
  // ... other endpoints
}
```

## 📁 Project Structure

```
PineChatAssistant/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Application entry point
│   └── index.html          # HTML template
├── shared/                 # Shared TypeScript types
├── vite.config.ts          # Vite configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 UI Components

The application uses a comprehensive set of UI components:

- **Chat Interface**: Modern chat bubbles with timestamps
- **Search Bar**: Real-time message search
- **Insights Dashboard**: Business metrics visualization
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: Toast notifications for errors
- **Responsive Layout**: Mobile-first design

## 🔍 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check with TypeScript

## 🚨 Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure your backend server is running on the configured port
   - Check the proxy configuration in `vite.config.ts`
   - Verify CORS settings on your backend

2. **Port Already in Use**
   - Change the port in `vite.config.ts` or kill the process using port 5000
   - Use `lsof -ti:5000 | xargs kill -9` to free the port

3. **Build Errors**
   - Run `npm run check` to identify TypeScript errors
   - Ensure all dependencies are installed with `npm install`

4. **API Errors**
   - Check browser network tab for failed requests
   - Verify backend API endpoints are accessible
   - Check server logs for backend errors

### Development Tips

- Use browser DevTools to monitor network requests
- Check the console for any JavaScript errors
- Use React DevTools for component debugging
- Monitor the backend server logs for API issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or need help:

1. Check the troubleshooting section above
2. Review the browser console for errors
3. Verify your backend server configuration
4. Check that all required API endpoints are implemented

---

**Happy Coding! 🎉** 