import React, { useState } from 'react';
import { db, auth } from '../../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import './VoterReport.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export function VoterReport() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!auth.currentUser) {
        alert("Please sign in to generate your report!");
        return;
    }
    setLoading(true);
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const snap = await getDoc(userRef);
      const data = snap.exists() ? snap.data() : { quizScore: 0, checked: [] };

      const res = await fetch(`${API_BASE}/insights/briefing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userData: {
            quizScore: data.quizScore || 0,
            completedSteps: data.checked?.length || 0,
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
