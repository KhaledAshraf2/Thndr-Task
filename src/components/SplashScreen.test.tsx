import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SplashScreen } from './SplashScreen';

describe('SplashScreen', () => {
  it('renders splash screen with correct content', () => {
    render(<SplashScreen isLoading={false} />);

    expect(screen.getByText('Stock Market')).toBeInTheDocument();
    expect(screen.getByText('Explore NASDAQ Stocks')).toBeInTheDocument();
    expect(screen.getByText('Developed by Khaled Ashraf')).toBeInTheDocument();
    expect(screen.getByAltText('NASDAQ Logo')).toBeInTheDocument();
  });
});
