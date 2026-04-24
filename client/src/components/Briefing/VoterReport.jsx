import React, { useState } from 'react';
import { db } from '../../services/firebase';
import './VoterReport.css';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export function VoterReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const quizScore = localStorage.getItem('matmitra_quiz_score') || 0;
      const checkedRaw = localStorage.getItem('matmitra_checklist');
      const checked = checkedRaw ? JSON.parse(checkedRaw) : [];

      const res = await fetch(`${API_BASE}/insights/briefing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userData: {
            quizScore: parseInt(quizScore, 10),
            completedSteps: checked.length,
            totalSteps: 8
          }
        })
      });
      const result = await res.json();
      setReport(result.briefing);
    } catch (err) {
      console.error(err);
      alert("Briefing generation failed.");
    }
    setLoading(false);
  }

  return (
    <div className="card report-box">
      <h3>Personalized Civic readiness briefing</h3>
      <p>Analyze your progress and get AI-driven recommendations based on your activity.</p>
      
      {!report && (
        <button className="primary-btn" onClick={generate} disabled={loading}>
          {loading ? "Analyzing..." : "Generate My Briefing →"}
        </button>
      )}

      {report && (
        <div className="report-content">
          <div className="report-markdown">
            {report.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <button className="quiz-btn" onClick={() => setReport(null)} style={{marginTop: '20px'}}>Reset</button>
        </div>
      )}
    </div>
  );
}
