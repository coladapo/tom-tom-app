export const theme = {
  colors: {
    // Base colors
    background: '#F9F7F6',
    surface: '#EDECEB',
    divider: '#D3D1D0',
    
    // Primary colors
    primary: '#A5B4AB', // Soft Sage Green
    primaryDark: '#7A8B84',
    
    // Secondary colors
    secondary: '#D1A097', // Muted Coral
    
    // Text colors
    text: '#333333',
    textSecondary: '#4F4F4F',
    textLight: '#666666',
    
    // Sentiment colors (subtle)
    sentimentCalm: '#C7D3DD',
    sentimentEnergy: '#EAD9B8',
    sentimentReflection: '#CFC5D3',
    
    // System colors
    white: '#FFFFFF',
    error: '#D32F2F',
    success: '#388E3C',
    warning: '#F57C00',
  },
  
  typography: {
    fontFamily: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semiBold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
    
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

export type Theme = typeof theme;
