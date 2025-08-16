import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

// Placeholder components for other routes - we'll implement these later

const CategoriesPage = () => (
  <div style={{ padding: '80px 20px', textAlign: 'center' }}>
    <h1>Categories Page</h1>
    <p>Category browsing will be implemented here</p>
  </div>
);

const ArtisansPage = () => (
  <div style={{ padding: '80px 20px', textAlign: 'center' }}>
    <h1>Artisans Page</h1>
    <p>Artisan profiles will be implemented here</p>
  </div>
);

const AboutPage = () => (
  <div style={{ padding: '80px 20px', textAlign: 'center' }}>
    <h1>About Us</h1>
    <p>Learn more about our mission to support artisans</p>
  </div>
);



function App() {
  return (
    <Router>
      <GlobalStyles />
      <AppWrapper>
        <Header 
          isAuthenticated={false} 
          userRole="buyer" 
          cartItemCount={0} 
        />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/artisans" element={<ArtisansPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </MainContent>
        <Footer />
      </AppWrapper>
    </Router>
  );
}

export default App;
