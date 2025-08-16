import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&family=Kalam:wght@300;400;700&family=Mukti:wght@300;400;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans Devanagari', 'Mukti', 'Kalam', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #faf6f0;
    background-image: 
      radial-gradient(circle at 25px 25px, rgba(184, 134, 11, 0.1) 2px, transparent 0),
      radial-gradient(circle at 75px 75px, rgba(205, 133, 63, 0.1) 2px, transparent 0);
    background-size: 100px 100px;
    color: #2d1810;
    line-height: 1.7;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Cinzel', 'Cormorant Garamond', 'Noto Sans Devanagari', serif;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: 0.5px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea, select {
    border: none;
    outline: none;
    font-family: inherit;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

// Traditional Indian color palette inspired by ancient crafts
export const colors = {
  primary: '#C9A96E', // Golden brass - traditional metalwork
  primaryLight: '#E4C88A',
  primaryDark: '#A67C3A',
  
  secondary: '#8B4513', // Saddle brown - earthen pottery and wood
  secondaryLight: '#CD853F',
  secondaryDark: '#654321',
  
  accent: '#B22222', // Fire brick - traditional Indian red
  accentLight: '#DC143C',
  accentDark: '#8B0000',
  
  tertiary: '#2F4F4F', // Dark slate gray - traditional indigo
  tertiaryLight: '#708090',
  
  neutral: {
    white: '#FFF8F0', // Warm white like handmade paper
    light: '#F5F1E8', // Cream like khadi fabric
    medium: '#D3C7B8', // Light brown like jute
    dark: '#5D4E37', // Dark brown like leather
    black: '#2D1810' // Dark chocolate brown
  },
  
  traditional: {
    saffron: '#FF9933', // Saffron - auspicious color
    turmeric: '#E4B429', // Turmeric yellow
    henna: '#CD853F', // Henna brown
    indigo: '#4B0082', // Traditional indigo dye
    vermillion: '#FF4500' // Vermillion red
  },
  
  success: '#228B22',
  warning: '#FF8C00',
  error: '#B22222',
  info: '#4682B4'
};

// Common styled components
export const Container = styled.div<{ maxWidth?: string }>`
  width: 100%;
  max-width: ${props => props.maxWidth || '1200px'};
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
  
  ${props => {
    switch (props.size) {
      case 'small':
        return 'padding: 8px 16px; font-size: 14px; line-height: 1.4;';
      case 'large':
        return 'padding: 16px 32px; font-size: 18px; line-height: 1.4;';
      default:
        return 'padding: 12px 24px; font-size: 16px; line-height: 1.4;';
    }
  }}

  ${props => props.fullWidth && 'width: 100%;'}

  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background-color: ${colors.secondary};
          color: white;
          &:hover {
            background-color: ${colors.secondaryDark};
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(205, 133, 63, 0.3);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${colors.primary};
          border: 2px solid ${colors.primary};
          &:hover {
            background-color: ${colors.primary};
            color: white;
            transform: translateY(-1px);
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${colors.primary};
          &:hover {
            background-color: ${colors.neutral.light};
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background-color: ${colors.primary};
          color: white;
          &:hover {
            background-color: ${colors.primaryDark};
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(184, 134, 11, 0.3);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

export const Card = styled.div<{ hover?: boolean; padding?: string }>`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: ${props => props.padding || '24px'};
  transition: all 0.3s ease;

  ${props => props.hover && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
  `}
`;

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? colors.error : colors.neutral.medium};
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(184, 134, 11, 0.1);
  }

  &::placeholder {
    color: ${colors.neutral.dark};
  }
`;

export const Select = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? colors.error : colors.neutral.medium};
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
  transition: border-color 0.2s ease;
  cursor: pointer;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(184, 134, 11, 0.1);
  }
`;

export const ErrorText = styled.span`
  color: ${colors.error};
  font-size: 14px;
  margin-top: 4px;
  display: block;
`;

export const FlexBox = styled.div<{
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'stretch'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '0'};
  ${props => props.wrap && 'flex-wrap: wrap;'}
`;

export const Grid = styled.div<{
  columns?: number;
  gap?: string;
  minColumnWidth?: string;
}>`
  display: grid;
  grid-template-columns: ${props => 
    props.minColumnWidth 
      ? `repeat(auto-fit, minmax(${props.minColumnWidth}, 1fr))`
      : `repeat(${props.columns || 1}, 1fr)`
  };
  gap: ${props => props.gap || '16px'};
`;