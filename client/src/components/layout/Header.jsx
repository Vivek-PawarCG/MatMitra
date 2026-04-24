import React from 'react';
import './Header.css';

export function Header() {
  return (
    <>
      <a href="#main-content" className="sr-only skip-link">Skip to main content</a>
      <header className="header-glass" role="banner">
        <div className="container header-grid">
          <div className="logo-section">
            <div className="flag-badge" aria-hidden="true">
              <div className="orange"></div>
              <div className="white"></div>
              <div className="green"></div>
            </div>
            <div className="logo-text">
              <h1 className="logo-title" aria-label="MatMitra Platform">Mat<span>Mitra</span></h1>
              <p className="logo-tagline">Empowering Democracy with AI</p>
            </div>
          </div>
          
          <div className="stats-box" role="status" aria-label="Election Statistics">
            <div className="stat-item">
              <span className="stat-label">Voters</span>
              <span className="stat-val">960M+</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-label">States</span>
              <span className="stat-val">28+8</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
