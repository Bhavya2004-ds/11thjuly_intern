import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fafafa;
    color: #333;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    line-height: 1.3;
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

// Color palette inspired by traditional Indian crafts
export const colors = {
  primary: '#B8860B', // Dark goldenrod - represents traditional gold work
  primaryLight: '#DAA520',
  primaryDark: '#8B7000',
  
  secondary: '#CD853F', // Peru - earthy brown for handicrafts
  secondaryLight: '#DEB887',
  secondaryDark: '#A0522D',
  
  accent: '#DC143C', // Crimson - vibrant red like Indian textiles
  accentLight: '#FF6B6B',
  
  neutral: {
    white: '#FFFFFF',
    light: '#F8F9FA',
    medium: '#E9ECEF',
    dark: '#6C757D',
    black: '#212529'
  },
  
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8'
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