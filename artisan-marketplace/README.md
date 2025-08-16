# शिल्पकारी (Shilpkari) - Traditional Indian Artisan E-commerce Marketplace

An exclusive e-commerce platform designed to connect skilled Indian artisans with buyers worldwide. This platform promotes traditional handicrafts while providing modern e-commerce functionality with advanced features like demand forecasting, automated quality checks, and VR/AR integration.

## 🎯 Project Overview

**शिल्पकारी (Shilpkari)** is a comprehensive 4th year project that aims to:
- Promote the Indian handicraft industry globally
- Provide a common platform to make, market, and sell high-quality handicrafts
- Support over 23 million craftsmen across India
- Enable cross-border e-commerce for traditional artisans

## ✨ Features Implemented

### Core Marketplace Features
- **User Authentication System** - Registration and login for both artisans and buyers
- **Beautiful Homepage** - Showcasing featured products, artisan stories, and statistics
- **Product Listings** - Comprehensive product catalog with advanced filtering and search
- **Responsive Design** - Mobile-first approach ensuring great experience across all devices

### Advanced Filtering & Search
- **Category-based filtering** - Textiles, Pottery, Jewelry, Wood Craft, etc.
- **Price range filtering** - Customizable min/max price ranges
- **Material-based filtering** - Filter by Silk, Cotton, Brass, Wood, Clay, etc.
- **Rating-based filtering** - Filter by product ratings
- **Customization options** - Filter for customizable products
- **Multiple sorting options** - Price, rating, popularity, newest first

### User Experience
- **Modern UI/UX** - Clean, intuitive design with warm artisan-friendly colors
- **Mobile Responsive** - Fully responsive design that works on all screen sizes
- **Interactive Elements** - Smooth animations, hover effects, and transitions
- **Accessibility** - Proper ARIA labels and keyboard navigation support

## 🛠 Technology Stack

### Frontend
- **React.js 18** with TypeScript for type safety
- **Styled Components** for component-based styling
- **React Router** for client-side routing
- **React Hook Form** with Yup validation for form handling
- **Lucide React** for consistent iconography

### Backend (Planned)
- **Node.js/Express** for API development
- **MongoDB** for database management
- **TensorFlow/PyTorch** for AI features (demand forecasting, quality checks)

### Advanced Features (Roadmap)
- **AR.js/Three.js** for VR/AR product visualization
- **Ethereum/Hyperledger** for blockchain supply chain tracking
- **Google Translate API** for multilingual support

## 📁 Project Structure

```
artisan-marketplace/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/          # Header, Footer, Layout components
│   │   ├── auth/            # Authentication forms
│   │   ├── products/        # Product-related components
│   │   └── artisan/         # Artisan-specific components
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   ├── styles/              # Global styles and themes
│   │   └── GlobalStyles.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   └── assets/              # Images and static files
├── public/                  # Public assets
└── package.json             # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd artisan-marketplace
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
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## 🎨 Design Philosophy

### Color Palette
- **Primary Gold (#B8860B)** - Represents traditional Indian goldwork
- **Secondary Brown (#CD853F)** - Earthy tones for handicrafts
- **Accent Red (#DC143C)** - Vibrant colors of Indian textiles
- **Neutral Grays** - For clean, modern UI elements

### Typography
- **Headers**: Playfair Display (serif) for elegance
- **Body**: Inter (sans-serif) for readability

### User Experience Principles
- **Cultural Sensitivity** - Design respects Indian aesthetic traditions
- **Accessibility First** - WCAG 2.1 compliant design
- **Mobile Responsive** - Progressive enhancement approach
- **Performance Optimized** - Lazy loading, optimized images

## 🧪 Demo Features

### Test Accounts
- **Buyer Demo**: `demo@buyer.com`
- **Artisan Demo**: `demo@artisan.com`
- **Password**: Any 8+ character password with uppercase, lowercase, and number

### Sample Data
The application includes realistic mock data for:
- 15+ sample products across various categories
- Product ratings and reviews
- Artisan information
- Geographic locations

## 🚧 Upcoming Modules

### Module 2: Demand Forecasting
- AI-driven market demand prediction using TensorFlow
- Historical sales data analysis
- Seasonal trend identification

### Module 3: Automated Quality Checks
- AI-based image inspection for quality assurance
- Computer vision for defect detection
- Quality scoring algorithms

### Module 4: Sentiment Analysis & Recommendations
- Customer review sentiment analysis
- Personalized product recommendations
- Artisan feedback and improvement suggestions

### Module 5: VR/AR Viewer
- 360° product visualization
- AR try-before-you-buy features
- Virtual craft workshop tours

### Module 6: Blockchain Supply Chain
- Transparent item tracking from creation to delivery
- Authenticity verification
- Smart contracts for fair trade

### Module 7: Localization
- Multilingual UI support (Hindi, English, regional languages)
- Region-specific marketing campaigns
- Cultural customization features

## 🤝 Contributing

This is a 4th year academic project. Contributions, suggestions, and feedback are welcome for educational purposes.

### Development Guidelines
1. Follow React best practices and hooks patterns
2. Use TypeScript for type safety
3. Maintain responsive design principles
4. Write clean, commented code
5. Test components thoroughly

## 📄 License

This project is developed for educational purposes as part of a 4th year computer science project.

## 🙏 Acknowledgments

- Indian artisan community for inspiration
- Faculty advisors for guidance
- Open source community for excellent tools and libraries

---

**Built with ❤️ for preserving Indian traditional crafts and empowering artisans worldwide.**
