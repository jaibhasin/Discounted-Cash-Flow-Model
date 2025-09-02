# 🎨 DCF Calculator Frontend

> Modern, responsive web interface for the DCF Calculator built with Next.js 15, React 19, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🛠 Technology Stack

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - Latest React with concurrent features
- **[TypeScript 5](https://www.typescriptlang.org)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev)** - Beautiful icon library
- **[Turbopack](https://turbo.build/pack)** - Ultra-fast bundler for development

## 📱 Features

### User Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Modern Styling**: Clean, professional interface with Tailwind CSS
- **Interactive Forms**: Real-time validation and user feedback
- **Progress Visualization**: Visual breakdown of DCF value components

### Performance
- **Fast Development**: Turbopack for instant hot reloads
- **Optimized Builds**: Next.js automatic optimization
- **Type Safety**: Full TypeScript implementation
- **SEO Ready**: Server-side rendering support

### User Experience
- **Form Validation**: Real-time input validation and error messages
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error handling and user feedback
- **Accessibility**: WCAG compliant design

## 🏗 Project Structure

```
frontend/
├── src/
│   └── app/                  # Next.js App Router
│       ├── globals.css       # Global styles
│       ├── layout.tsx        # Root layout component
│       └── page.tsx          # Home page component
├── public/                   # Static assets
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
├── eslint.config.mjs       # ESLint configuration
└── README.md               # This file
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Development Server

The development server runs on `http://localhost:3000` with:
- Hot module replacement
- Fast refresh
- Real-time error overlay
- TypeScript checking

### Environment Setup

1. Ensure the backend API is running on `http://localhost:8000`
2. The frontend is configured to connect to this API endpoint
3. CORS is handled by the backend FastAPI application

## 🎯 Key Components

### Form Handling
- Real-time input validation
- Error message display
- Responsive form layout
- Accessible form controls

### Results Display
- Tabular data presentation
- Progress bars for value breakdown
- Responsive card layouts
- Interactive elements

### API Integration
- Type-safe API calls
- Error handling and user feedback
- Loading states management
- Response data validation

## 🔍 API Integration

The frontend integrates with the DCF Calculator API:

```typescript
// Example API call
const response = await fetch('http://localhost:8000/calculate-dcf', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features
- [React Documentation](https://react.dev) - Learn React concepts
- [TypeScript Handbook](https://www.typescriptlang.org/docs) - TypeScript guide
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Tailwind utilities

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build with:
- Minified JavaScript and CSS
- Optimized images and fonts
- Static generation where possible
- Performance optimizations

### Deploy on Vercel

The easiest way to deploy is using [Vercel Platform](https://vercel.com/new):

1. Connect your GitHub repository
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

For other deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

**Part of the [DCF Calculator Web Application](../README.md) project.**
