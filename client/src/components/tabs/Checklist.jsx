import React, { useState, useEffect } from 'react';
import { checklistData } from '../../data/electionData';
import { db } from '../../services/firebase';
import './Checklist.css';

export function Checklist() {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('matmitra_checklist');
    if (saved) {
      setChecked(JSON.parse(saved));
    }
  }, []);

  async function toggle(i) {
    const newChecked = checked.includes(i) ? checked.filter(x => x !== i) : [...checked, i];
    setChecked(newChecked);
    localStorage.setItem('matmitra_checklist', JSON.stringify(newChecked));
  }

  return (
    <div className="tab-content">
      <div className="section-header">
        <div className="section-kicker">मतदाता तैयारी — Voter Prep</div>
        <div className="section-headline">Your Election Day Checklist</div>
      </div>
      <div className="checklist-progress">
        {checked.length} / {checklistData.length} COMPLETE
      </div>
      <div className="checklist">
        {checklistData.map((c, i) => (
          <div key={i} className={`cl-item ${checked.includes(i) ? "checked" : ""}`} onClick={() => toggle(i)}>
            <div className="cl-box">{checked.includes(i) ? "✓" : ""}</div>
            <div>
              <div className="cl-label">{c.label}</div>
              <div className="cl-sub">{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
