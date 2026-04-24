import React, { useState, useEffect, useRef } from 'react';
import './AiSahayak.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export function AiSahayak() {
  const [msgs, setMsgs] = useState([
    { role: "ai", text: "नमस्ते! 🙏 I'm your Indian Election Assistant. Ask me anything about the Indian election process — voter registration, EVM, ECI, how to vote, your rights as a voter, or how the government is formed." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  async function send() {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setInput("");
    setMsgs(m => [...m, { role: "user", text: q }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: q,
          history: msgs.map(m => ({ 
            role: m.role === 'ai' ? 'model' : 'user', 
            parts: [{ text: m.text }] 
          }))
        })
      });
      const data = await res.json();
      setMsgs(m => [...m, { role: "ai", text: data.text || "I'm having trouble connecting right now." }]);
      
      // Track interaction in BigQuery
      fetch(`${API_BASE}/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: 'ai_chat', details: { query: q } })
      }).catch(console.error);

    } catch (err) {
      setMsgs(m => [...m, { role: "ai", text: "Connection issue. Please try again." }]);
    }
    setLoading(false);
  }

  const suggestions = [
    "EVM kaise kaam karta hai?",
    "How do I register to vote?",
    "What is NOTA?",
    "How is PM selected?"
  ];

  return (
    <div className="tab-content">
      <div className="section-header">
        <div className="section-kicker">AI सहायक — AI Assistant</div>
        <div className="section-headline">Ask the Election Assistant</div>
        <div className="section-deck">Powered by Gemini & Vertex AI — nonpartisan, bilingual, and factual.</div>
      </div>
      
      <div className="chat-wrap card">
        <div className="chat-header">
          <div className="chat-avatar">🗳️</div>
          <div>
            <div className="chat-title">MatMitra AI Assistant</div>
            <div className="chat-subtitle">Powered by Google Gemini · Niष्पक्ष</div>
          </div>
        </div>
        
        <div className="chat-msgs">
          {msgs.map((m, i) => (
            <div key={i} className={`cmsg ${m.role}`}>
              <div className="cmsg-av">{m.role === "ai" ? "AI" : "आप"}</div>
              <div className="cmsg-bubble">{m.text}</div>
            </div>
          ))}
          {loading && <div className="cmsg ai"><div className="cmsg-av">AI</div><div className="cmsg-bubble muted">Soch raha hoon…</div></div>}
          <div ref={endRef} />
        </div>
        
        <div className="chat-input-row">
          <input 
            className="chat-input" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="English ya Hindi mein poochhen…" 
          />
          <button className="chat-send" onClick={send} disabled={loading || !input.trim()}>पूछें →</button>
        </div>
      </div>
      
      <div className="suggestions">
        {suggestions.map(q => (
          <button key={q} className="suggest-btn" onClick={() => setInput(q)}>{q}</button>
        ))}
      </div>
    </div>
  );
}
