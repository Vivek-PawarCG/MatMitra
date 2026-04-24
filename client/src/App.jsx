import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Timeline } from './components/tabs/Timeline';
import { AiSahayak } from './components/tabs/AiSahayak';
import { Quiz } from './components/tabs/Quiz';
import { Glossary } from './components/tabs/Glossary';
import { Checklist } from './components/tabs/Checklist';
import { VoterReport } from './components/Briefing/VoterReport';
import './App.css';

const TABS = [
  { id: "timeline", label: "📅 Timeline", Comp: Timeline },
  { id: "quiz", label: "🧠 Quiz", Comp: Quiz },
  { id: "ai", label: "🤖 AI Sahayak", Comp: AiSahayak },
  { id: "glossary", label: "📖 Glossary", Comp: Glossary },
  { id: "checklist", label: "✅ Checklist", Comp: Checklist },
];

function App() {
  const [active, setActive] = useState("timeline");
  const { Comp } = TABS.find(t => t.id === active) || TABS[0];

  return (
    <div className="app-root">
      <Header />
      
      <nav className="tab-nav">
        {TABS.map(t => (
          <button 
            key={t.id} 
            className={`nav-tab ${active === t.id ? "active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="container">
        <Comp />
        
        {/* Personalized Briefing Section (Vertex AI Integration Way 2) */}
        {active !== 'ai' && <VoterReport />}
      </main>

      <footer className="footer">
        <span className="accent">MatMitra</span> · Built for <span className="accent">Google Antigravity Prompt Wars 2025</span> ·
        Powered by Gemini & Vertex AI · <span className="green">जय हिन्द 🇮🇳</span>
      </footer>
    </div>
  );
}

export default App;
