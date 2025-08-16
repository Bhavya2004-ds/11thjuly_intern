import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Container, colors, FlexBox, Grid } from '../../styles/GlobalStyles';

const FooterWrapper = styled.footer`
  background: linear-gradient(135deg, ${colors.neutral.black} 0%, #2c2c2c 100%);
  color: white;
  margin-top: auto;
`;

const FooterContent = styled(Container)`
  padding: 60px 20px 30px;

  @media (max-width: 768px) {
    padding: 40px 16px 20px;
  }
`;

const FooterGrid = styled(Grid)`
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  @media (max-width: 568px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 18px;
    margin-bottom: 20px;
    color: ${colors.primaryLight};
    font-family: 'Playfair Display', serif;
  }

  p {
    color: #cccccc;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  ul {
    list-style: none;
    
    li {
      margin-bottom: 12px;
      
      a {
        color: #cccccc;
        text-decoration: none;
        transition: color 0.2s ease;
        
        &:hover {
          color: ${colors.primaryLight};
        }
      }
    }
  }
`;

const BrandSection = styled(FooterSection)`
  .logo {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 700;
    color: ${colors.primaryLight};
    margin-bottom: 16px;
    display: block;
  }

  .tagline {
    font-style: italic;
    color: ${colors.secondaryLight};
    margin-bottom: 20px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(184, 134, 11, 0.2);
  color: ${colors.primaryLight};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  color: #cccccc;

  svg {
    color: ${colors.primaryLight};
    flex-shrink: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: ${colors.primaryLight};
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #404040;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #999999;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 568px) {
    flex-direction: column;
    gap: 12px;
  }

  a {
    color: #999999;
    text-decoration: none;
    
    &:hover {
      color: ${colors.primaryLight};
    }
  }
`;

const NewsletterForm = styled.form`
  margin-top: 20px;

  input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #404040;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    margin-bottom: 12px;
    
    &::placeholder {
      color: #999999;
    }
    
    &:focus {
      outline: none;
      border-color: ${colors.primaryLight};
    }
  }

  button {
    width: 100%;
    padding: 12px 16px;
    background-color: ${colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: ${colors.primaryDark};
    }
  }
`;

const Footer: React.FC = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd handle newsletter subscription here
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterGrid>
                  <BrandSection>
          <div className="logo">शिल्पकारी</div>
          <p className="tagline">"जहाँ परंपरा मिलती है दुनिया से"</p>
            <p>
              Connecting talented artisans with art lovers worldwide. We celebrate 
              the rich heritage of Indian handicrafts and provide a platform for 
              skilled craftspeople to showcase their authentic creations.
            </p>
            <SocialLinks>
              <SocialIcon href="#" aria-label="Facebook">
                <Facebook size={20} />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Instagram">
                <Instagram size={20} />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Twitter">
                <Twitter size={20} />
              </SocialIcon>
            </SocialLinks>
          </BrandSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/artisans">Featured Artisans</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/custom-orders">Custom Orders</Link></li>
              <li><Link to="/bulk-orders">Bulk Orders</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Support</h3>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/returns">Returns & Exchanges</Link></li>
              <li><Link to="/size-guide">Size Guide</Link></li>
              <li><Link to="/care-instructions">Care Instructions</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <MapPin size={16} />
              <span>Mumbai, Maharashtra, India</span>
            </ContactInfo>
            <ContactInfo>
              <Phone size={16} />
              <a href="tel:+911234567890">+91 123 456 7890</a>
            </ContactInfo>
            <ContactInfo>
              <Mail size={16} />
              <a href="mailto:support@craftbazaar.com">support@craftbazaar.com</a>
            </ContactInfo>

            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <h3>Stay Updated</h3>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
              />
              <button type="submit">Subscribe</button>
            </NewsletterForm>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <div>
            &copy; 2024 शिल्पकारी (Shilpkari). All rights reserved. Made with ❤️ for artisans.
          </div>
          <LegalLinks>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </LegalLinks>
        </FooterBottom>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;