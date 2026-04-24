import React from 'react';
import './Header.css';

const today = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

export function Header() {
  return (
    <>
      <div className="tricolor-bar">
        <div className="saffron" />
        <div className="white" />
        <div className="green" />
      </div>

      <header className="main-header">
        <div className="header-top">
          {/* <div className="header-emblem">🇮🇳</div> */}
          <div className="header-date">{today}</div>
          {/* <div className="header-badge">Google Antigravity 2025</div> */}
        </div>

        <div className="header-content">
          <div className="chakra-deco">⊙</div>
          <div className="header-eyebrow">भारत निर्वाचन आयोग · Civic Education Platform</div>
          <div className="header-title">
            <span className="mata">Mat</span><span className="data">Mitra</span>
          </div>
          <div className="header-hindi">मेरा वोट, मेरा अधिकार</div>
          <div className="header-sub">My Vote, My Right · Interactive Indian Election Education</div>
        </div>
      </header>
    </>
  );
}
