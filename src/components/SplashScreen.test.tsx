import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SplashScreen } from './SplashScreen';

describe('SplashScreen', () => {
  it('renders splash screen with correct content', () => {
    const mockOnComplete = vi.fn();

    render(<SplashScreen onComplete={mockOnComplete} />);

    expect(screen.getByText('Stock Market')).toBeInTheDocument();
    expect(screen.getByText('Explore NASDAQ Stocks')).toBeInTheDocument();
    expect(screen.getByText('Developed by Khaled Ashraf')).toBeInTheDocument();
    expect(screen.getByAltText('NASDAQ Logoo')).toBeInTheDocument();
  });
});
