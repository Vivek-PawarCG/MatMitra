import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Glossary } from './Glossary';
import React from 'react';

describe('Glossary Component', () => {
  it('✅ Data: Should render election terms like NOTA', () => {
    render(<Glossary />);
    const term = screen.getByText(/NOTA/i);
    expect(term).toBeDefined();
  });

  it('✅ Interactive: Should contain a search input', () => {
    render(<Glossary />);
    const input = screen.getByPlaceholderText(/Search terms.../i);
    expect(input).toBeDefined();
  });
});
