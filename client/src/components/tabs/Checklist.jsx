import React, { useState, useEffect } from 'react';
import { checklistData } from '../../data/electionData';
import { db, auth } from '../../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './Checklist.css';

export function Checklist() {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    async function loadChecked() {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const snap = await getDoc(userRef);
        if (snap.exists() && snap.data().checked) {
          setChecked(snap.data().checked);
        }
      }
    }
    loadChecked();
  }, []);

  async function toggle(i) {
    const newChecked = checked.includes(i) ? checked.filter(x => x !== i) : [...checked, i];
    setChecked(newChecked);
    
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userRef, { checked: newChecked }, { merge: true });
    }
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
