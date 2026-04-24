import React, { useState } from 'react';
import { glossaryData } from '../../data/electionData';
import './Glossary.css';

export function Glossary() {
  const [search, setSearch] = useState("");
  const filtered = glossaryData.filter(g =>
    g.term.toLowerCase().includes(search.toLowerCase()) ||
    g.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tab-content">
      <div className="section-header">
        <div className="section-kicker">शब्दकोश — Reference Glossary</div>
        <div className="section-headline">Indian Election Terms</div>
      </div>
      <input 
        className="glossary-search card" 
        placeholder="Search terms… e.g. NOTA, EVM, BLO"
        value={search} onChange={e => setSearch(e.target.value)} 
      />
      <div className="glossary-list">
        {filtered.map((g, i) => (
          <div key={i} className="gl-item">
            <div className="gl-term">{g.term}</div>
            <div className="gl-def">{g.def}</div>
          </div>
        ))}
        {!filtered.length && <div className="no-results">No terms found.</div>}
      </div>
    </div>
  );
}
