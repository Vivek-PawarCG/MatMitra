import React from 'react';
import { timelineData } from '../../data/electionData';
import './Timeline.css';

export function Timeline() {
  return (
    <div className="tab-content">
      <div className="section-header">
        <div className="section-kicker">चुनाव प्रक्रिया — Election Process</div>
        <div className="section-headline">8 Stages of an Indian General Election</div>
        <div className="section-deck">From voter registration to Parliament session — every step of India's democratic process explained.</div>
      </div>
      <div className="timeline">
        {timelineData.map((t, i) => (
          <div key={i} className="tl-item">
            <div className={`tl-dot ${t.done ? "done" : t.active ? "active" : ""}`} />
            <div className="tl-header">
              <span className="tl-phase" style={{ background: t.color }}>{t.phase}</span>
              <span className="tl-title">{t.title}</span>
            </div>
            <div className="tl-date">{t.date}</div>
            <div className="tl-body">{t.body}</div>
            <div className="tl-sub">{t.pills.map((p, j) => <span key={j} className="tl-pill">{p}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
