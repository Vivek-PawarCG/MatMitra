import React, { useState } from 'react';
import { quizData } from '../../data/electionData';
import { db } from '../../services/firebase';
import './Quiz.css';

export function Quiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  async function handleDone(finalScore) {
    setDone(true);
    localStorage.setItem('matmitra_quiz_score', finalScore);
    
    // Track in BigQuery (Guest Mode)
    fetch(`${import.meta.env.VITE_API_URL || '/api'}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        eventType: 'quiz_complete', 
        userId: 'guest',
        details: { score: finalScore } 
      })
    }).catch(console.error);
  }

  function pick(i) {
    if (selected !== null) return;
    setSelected(i);
    if (i === quizData[idx].ans) setScore(s => s + 1);
  }

  function next() {
    if (idx + 1 >= quizData.length) { 
        handleDone(score);
        return; 
    }
    setIdx(i => i + 1); 
    setSelected(null);
  }

  function restart() { 
    setIdx(0); 
    setSelected(null); 
    setScore(0); 
    setDone(false); 
  }

  if (done) return (
    <div className="tab-content">
      <div className="section-header">
        <div className="section-kicker">नागरिक परीक्षा</div>
        <div className="section-headline">Quiz Complete! 🇮🇳</div>
      </div>
      <div className="quiz-card card">
        <div className="score-box">
          <div className="score-num">{score}/{quizData.length}</div>
          <div className="score-label">
            {score === quizData.length ? "Perfect! आप एक जागरूक मतदाता हैं! 🎉" : "Great effort!"}
          </div>
        </div>
        <div className="quiz-nav">
          <button className="quiz-btn primary" onClick={restart}>Retake Quiz</button>
        </div>
      </div>
    </div>
  );

  const q = quizData[idx];
  return (
    <div className="tab-content">
      <div className="section-header">
        <div className="section-kicker">नागरिक परीक्षा — Civic Quiz</div>
        <div className="section-headline">Test Your Election IQ</div>
      </div>
      <div className="quiz-card card">
        <div className="quiz-progress">Question {idx + 1} of {quizData.length} · Score: {score}</div>
        <div className="quiz-q">{q.q}</div>
        <div className="quiz-options">
          {q.opts.map((opt, i) => (
            <button key={i}
              className={`quiz-option ${selected === null ? "" : i === q.ans ? "correct" : i === selected ? "wrong" : ""}`}
              onClick={() => pick(i)} disabled={selected !== null}>{opt}
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className={`quiz-feedback ${selected === q.ans ? "correct" : "wrong"}`}>
            {selected === q.ans ? "✓ Sahi jawab! " : "✗ Galat jawab. "}{q.exp}
          </div>
        )}
        {selected !== null && (
          <div className="quiz-nav">
            <button className="quiz-btn primary" onClick={next}>
              {idx + 1 >= quizData.length ? "See Results" : "Next Question →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
