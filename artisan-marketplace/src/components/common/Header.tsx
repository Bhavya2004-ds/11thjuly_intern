import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { Container, Button, colors, FlexBox } from '../../styles/GlobalStyles';

const HeaderWrapper = styled.header`
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  
  @media (max-width: 768px) {
    height: 70px;
  }
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  color: ${colors.primary};
  text-decoration: none;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Navigation = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    gap: 0;
    padding: 20px 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(${props => props.isOpen ? '0' : '-100%'});
    opacity: ${props => props.isOpen ? '1' : '0'};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
  }
`;

const NavLink = styled(Link)`
  color: ${colors.neutral.black};
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${colors.primary};
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    width: 100%;
    border-bottom: 1px solid ${colors.neutral.light};
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
  margin: 0 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 2px solid ${colors.neutral.medium};
  border-radius: 25px;
  font-size: 14px;
  background-color: ${colors.neutral.light};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${colors.primary};
    background-color: white;
    box-shadow: 0 0 0 3px rgba(184, 134, 11, 0.1);
  }

  &::placeholder {
    color: ${colors.neutral.dark};
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.neutral.dark};
  width: 18px;
  height: 18px;
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const IconButton = styled.button<{ notification?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: none;
  border: none;
  color: ${colors.neutral.black};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: ${colors.neutral.light};
    color: ${colors.primary};
  }

  ${props => props.notification && `
    &::after {
      content: '';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 8px;
      height: 8px;
      background-color: ${colors.accent};
      border-radius: 50%;
    }
  `}

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${colors.neutral.black};
  cursor: pointer;
  padding: 8px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileSearchContainer = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 16px 20px;
    border-bottom: 1px solid ${colors.neutral.medium};
  }
`;

const MobileSearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${colors.neutral.medium};
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
`;

const MobileSearchButton = styled(IconButton)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex !important;
  }
`;

interface HeaderProps {
  // In a real app, we'd get this from auth context
  isAuthenticated?: boolean;
  userRole?: 'artisan' | 'buyer';
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ 
  isAuthenticated = false, 
  userRole = 'buyer', 
  cartItemCount = 0 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileSearchOpen(false);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileSearchOpen(false);
  };

  const handleMobileSearchToggle = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderWrapper>
      <HeaderContent>
        <FlexBox align="center" gap="16px">
          <MobileMenuButton onClick={handleMobileMenuToggle}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
          
          <Logo to="/">
            CraftBazaar
          </Logo>
        </FlexBox>

        <Navigation isOpen={isMobileMenuOpen}>
          <NavLink to="/products" onClick={() => setIsMobileMenuOpen(false)}>
            All Products
          </NavLink>
          <NavLink to="/categories" onClick={() => setIsMobileMenuOpen(false)}>
            Categories
          </NavLink>
          <NavLink to="/artisans" onClick={() => setIsMobileMenuOpen(false)}>
            Artisans
          </NavLink>
          <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>
            About Us
          </NavLink>
        </Navigation>

        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search for handcrafted treasures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon />
          </form>
        </SearchContainer>

        <UserActions>
          <MobileSearchButton 
            onClick={handleMobileSearchToggle}
          >
                        <Search size={20} />
            </MobileSearchButton>
          
          {isAuthenticated ? (
            <>
              <IconButton onClick={() => navigate('/wishlist')}>
                <Heart size={20} />
              </IconButton>
              
              <IconButton 
                notification={cartItemCount > 0}
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart size={20} />
              </IconButton>
              
              <IconButton onClick={() => navigate('/profile')}>
                <User size={20} />
              </IconButton>
            </>
          ) : (
            <FlexBox gap="8px">
              <Button 
                variant="ghost" 
                size="small"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
              <Button 
                size="small"
                onClick={() => navigate('/register')}
              >
                Join Us
              </Button>
            </FlexBox>
          )}
        </UserActions>
      </HeaderContent>

      <MobileSearchContainer isOpen={isMobileSearchOpen}>
        <form onSubmit={handleSearch}>
          <MobileSearchInput
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </form>
      </MobileSearchContainer>


    </HeaderWrapper>
  );
};

export default Header;