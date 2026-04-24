import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import React from 'react';

describe('Header Component', () => {
  it('✅ Brand: Should render the MatMitra title', () => {
    render(<Header />);
    const linkElement = screen.getByText(/Mat/i);
    expect(linkElement).toBeDefined();
  });

  it('✅ Accessibility: Should have a skip link for screen readers', () => {
    render(<Header />);
    const skipLink = screen.getByText(/Skip to main content/i);
    expect(skipLink).toBeDefined();
    expect(skipLink.classList.contains('sr-only')).toBe(true);
  });
});
