# Loan Dashboard

A modern React-based loan dashboard application for managing borrower pipelines, viewing detailed borrower information, and tracking broker performance. This application demonstrates modern front-end development practices with a focus on user experience and responsive design.

## 🚀 Features

- **Borrower Pipeline Management**: Tabbed interface for managing different stages of loan applications (New, In Review, Approved)
- **Detailed Borrower View**: Comprehensive borrower information with AI explainability features and risk signals
- **Broker Overview**: Real-time broker statistics, contact functionality, and onboarding workflow
- **Modern UI**: Built with Tailwind CSS and ShadCN UI components for a professional look
- **Toast Notifications**: Non-intrusive notification system replacing browser alerts
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **TypeScript**: Full type safety throughout the application
- **End-to-End Testing**: Comprehensive test suite with Playwright

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with functional components
- **Styling**: Tailwind CSS + ShadCN UI components
- **State Management**: Zustand
- **Type Checking**: TypeScript
- **Icons**: Lucide React icons
- **Form Handling**: React Hook Form with Zod validation
- **Testing**: Playwright for E2E testing
- **Build Tool**: Create React App

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd loan-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The application will automatically reload when you make changes

### Available Scripts

```bash
npm start          # Runs the app in development mode
npm test           # Launches the test runner
npm run build      # Builds the app for production
npm run test:e2e   # Runs end-to-end tests with Playwright
npm run test:e2e:ui # Runs Playwright tests with UI
```

## 🎯 Application Features

### Borrower Pipeline

- **Tabbed Navigation**: Switch between New, In Review, and Approved borrowers
- **Borrower Cards**: Display key information with status indicators
- **Interactive Selection**: Click any borrower to view detailed information

### Borrower Details

- **Comprehensive Profile**: Personal and financial information
- **AI Explainability**: Expandable section showing risk analysis and AI flags
- **Action Buttons**: Request documents, send to valuer, approve, or escalate
- **Risk Signals**: Visual warnings for potential issues

### Broker Overview

- **Performance Metrics**: Deals, approval rates, and pending amounts
- **Contact Options**: Phone, email, and chat functionality
- **Workflow Steps**: 7-step onboarding process visualization
- **AI Assistant Toggle**: Enable/disable AI-powered assistance

## 🧪 Testing

The application includes comprehensive end-to-end tests using Playwright:

```bash
# Run all tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui
```

Test coverage includes:

- Borrower selection and detail updates
- AI explainability section expansion
- Action button functionality
- Responsive design validation
- Broker information display

## 📁 Project Structure

```
loan-dashboard/
├── public/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── BorrowerDetail.tsx
│   │       ├── BorrowerPipeline.tsx
│   │       ├── BrokerOverview.tsx
│   │       ├── Layout.tsx
│   │       └── Toast.tsx
│   ├── services/
│   │   └── api.ts
│   ├── store/
│   │   └── useStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── cn.ts
│   ├── App.tsx
│   └── index.tsx
├── tests/
│   └── dashboard.spec.ts
├── package.json
└── README.md
```

## 🔧 API Integration

The application uses a mock API service that simulates real backend endpoints:

### Core Endpoints

- `GET /api/borrowers/pipeline` - Fetch borrower pipeline data
- `GET /api/borrowers/{id}` - Get detailed borrower information
- `POST /api/borrowers/{id}/request-documents` - Request additional documents
- `POST /api/borrowers/{id}/send-valuer` - Send application to valuer
- `POST /api/borrowers/{id}/approve` - Approve loan application
- `POST /api/borrowers/{id}/escalate` - Escalate to credit committee
- `GET /api/broker/{id}` - Get broker information
- `GET /api/onboarding/workflow` - Get workflow steps

## 🎨 UI/UX Highlights

### Toast Notification System

The application features a modern toast notification system:

```typescript
import { useStore } from "./store/useStore";

const { addToast } = useStore();

// Different notification types
addToast("Operation completed successfully!", "success");
addToast("An error occurred. Please try again.", "error");
addToast("Here's some information for you.", "info");
```

**Features:**

- Auto-dismissal after 5 seconds
- Manual dismissal with close button
- Smooth slide-in animations
- Multiple notification types with distinct styling
- Accessible with proper ARIA labels

### Responsive Design

- **Mobile**: Single column layout with stacked components
- **Tablet**: Adaptive grid system
- **Desktop**: Full 3-column layout
- **Touch-friendly**: Optimized button sizes and spacing

## 🚀 Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build` folder. The build is minified and ready for deployment.

### Deployment Options

- **Static Hosting**: Deploy to Netlify, Vercel, or GitHub Pages
- **Server**: Use nginx or Apache to serve the build folder
- **CDN**: Deploy to AWS S3 + CloudFront for global distribution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Add proper TypeScript types for new features
- Include appropriate error handling
- Write tests for new functionality
- Update documentation as needed

## 📝 License

This project is private and proprietary.

## 🙋‍♂️ Support

For questions or support, please contact the development team.

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
