import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/GlobalStyles';

const IconContainer = styled.div<{ size: number; color?: string; bgColor?: string }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 8px;
  background: ${props => props.bgColor || colors.primary};
  color: ${props => props.color || colors.neutral.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: ${props => props.size / 3}px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    border: 2px solid rgba(255,255,255,0.2);
    border-radius: 6px;
  }
`;

const ImagePlaceholder = styled.div<{ width: number; height: number; text?: string }>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colors.neutral.white};
  font-weight: 600;
  font-size: ${props => Math.min(props.width, props.height) / 8}px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm12 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
  }
  
  .icon-text {
    position: relative;
    z-index: 1;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }
`;

interface IconPlaceholderProps {
  type: 'search' | 'cart' | 'user' | 'heart' | 'menu' | 'close' | 'star' | 'filter' | 'grid' | 'list' | 'phone' | 'mail' | 'location';
  size?: number;
  color?: string;
  bgColor?: string;
  className?: string;
}

interface ImagePlaceholderProps {
  type: 'product' | 'hero' | 'artisan' | 'category' | 'logo';
  width: number;
  height: number;
  text?: string;
  className?: string;
}

// Traditional Indian icon representations using Unicode symbols and text
const getIconSymbol = (type: string): string => {
  switch (type) {
    case 'search': return '🔍';
    case 'cart': return '🛒';
    case 'user': return '👤';
    case 'heart': return '♥';
    case 'menu': return '☰';
    case 'close': return '✕';
    case 'star': return '★';
    case 'filter': return '⚏';
    case 'grid': return '⊞';
    case 'list': return '☰';
    case 'phone': return '📞';
    case 'mail': return '✉';
    case 'location': return '📍';
    default: return '◉';
  }
};

const getImageText = (type: string, customText?: string): string => {
  if (customText) return customText;
  
  switch (type) {
    case 'product': return 'उत्पाद\nProduct';
    case 'hero': return 'शिल्पकारी\nHandcrafts';
    case 'artisan': return 'कारीगर\nArtisan';
    case 'category': return 'श्रेणी\nCategory';
    case 'logo': return 'शिल्पकारी';
    default: return 'चित्र\nImage';
  }
};

export const IconPlaceholder: React.FC<IconPlaceholderProps> = ({
  type,
  size = 24,
  color,
  bgColor,
  className
}) => (
  <IconContainer 
    size={size} 
    color={color} 
    bgColor={bgColor} 
    className={className}
    title={`Replace with ${type} icon`}
  >
    {getIconSymbol(type)}
  </IconContainer>
);

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  type,
  width,
  height,
  text,
  className
}) => (
  <ImagePlaceholder 
    width={width} 
    height={height} 
    className={className}
    title={`Replace with ${type} image`}
  >
    <div className="icon-text">
      {getImageText(type, text)}
    </div>
  </ImagePlaceholder>
);

// Instructions for replacing icons/images
export const IconReplacementGuide = {
  instructions: `
    🎨 ICON & IMAGE REPLACEMENT GUIDE:
    
    1. ICONS: Replace IconPlaceholder components with:
       - Traditional Indian motifs (lotus, peacock, elephant)
       - Custom SVG icons with Indian design elements
       - Icon fonts like Feather, Heroicons, or custom iconography
    
    2. IMAGES: Replace ImagePlaceholder components with:
       - High-quality photos of Indian handicrafts
       - Artisan portraits and workshop images  
       - Traditional pattern backgrounds
       - Product photography with warm lighting
    
    3. TRADITIONAL DESIGN ELEMENTS:
       - Paisley patterns for backgrounds
       - Mandala designs for decorative elements
       - Elephant and peacock motifs for categories
       - Lotus flowers for spiritual/premium products
       - Traditional geometric patterns (rangoli-inspired)
    
    4. COLOR SCHEME:
       - Gold/brass tones for premium feel
       - Earthy browns for handcrafted authenticity
       - Traditional reds for accent colors
       - Saffron/turmeric for auspicious elements
    
    5. FONT COMBINATIONS:
       - Devanagari script for Hindi text
       - Cinzel/Cormorant for elegant English headers
       - Clean sans-serif for body text
  `,
  
  recommendations: {
    icons: [
      'Search: Magnifying glass with traditional handle design',
      'Cart: Woven basket or clay pot design',
      'User: Indian classical dancer silhouette',
      'Heart: Lotus petal heart shape',
      'Menu: Traditional three-line pattern',
      'Star: Elaborate star with traditional points'
    ],
    
    images: [
      'Hero: Artisan hands working on pottery/textiles',
      'Products: Professional photos with warm, natural lighting',
      'Categories: Close-up shots of materials (silk, wood, clay)',
      'Artisans: Portrait photos in natural workshop settings',
      'Backgrounds: Subtle traditional patterns'
    ]
  }
};

export default { IconPlaceholder, ImagePlaceholder, IconReplacementGuide };