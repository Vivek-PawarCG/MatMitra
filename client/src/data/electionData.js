export const timelineData = [
  {
    phase: "मतदाता पंजीकरण", color: "#000080", done: true,
    title: "Voter Registration (Form 6)",
    date: "Ongoing — deadline ~30 days before election",
    body: "Every Indian citizen aged 18+ can register on the Electoral Roll. Submit Form 6 online at voters.eci.gov.in or at your local BLO (Booth Level Officer). New voters added during Special Summary Revision drives every January.",
    pills: ["Form 6", "Aadhaar-EPIC linking", "Voters.eci.gov.in", "BLO office", "NVSP portal"]
  },
  {
    phase: "आचार संहिता", color: "#7b3f00", done: true,
    title: "Model Code of Conduct (MCC)",
    date: "Announced with election schedule",
    body: "The Election Commission of India (ECI) announces the schedule, triggering the Model Code of Conduct. Political parties and candidates must follow rules on rallies, advertising, government announcements, and use of state resources.",
    pills: ["ECI announcement", "MCC enforcement", "No freebies rule", "Media code", "cVIGIL app"]
  },
  {
    phase: "नामांकन", color: "#000080", done: true,
    title: "Candidate Nomination",
    date: "Typically 1–4 weeks before polling",
    body: "Candidates file nomination papers with the Returning Officer. Independent candidates pay ₹25,000 (General) / ₹12,500 (SC/ST) deposit. Party candidates get the official party symbol. Nominations are scrutinized and can be rejected.",
    pills: ["Form 2A", "₹25,000 deposit", "Affidavit", "Returning Officer", "Symbol allotment"]
  },
  {
    phase: "प्रचार", color: "#7b3f00", done: false, active: true,
    title: "Election Campaign",
    date: "From MCC to 48 hours before polling",
    body: "Candidates campaign via rallies, door-to-door canvassing, social media, and TV. All campaign expenditure is monitored — limit is ₹95 lakh per Lok Sabha candidate. Campaign ends at 6 PM, 48 hours before polling day (Silence Period).",
    pills: ["₹95 lakh limit", "Paid news rules", "STAR campaigner", "Silence period", "cVIGIL complaint"]
  },
  {
    phase: "मतदान", color: "#138808", done: false,
    title: "Voting Day (Polling)",
    date: "Notified by ECI — varies by phase",
    body: "Polls are held in phases across India. Bring your EPIC (Voter ID) or any of the 12 alternative photo IDs. Polling hours are 7 AM–6 PM. Press the EVM button next to your candidate's name and symbol. VVPAT gives you a 7-second paper slip to verify.",
    pills: ["EPIC / Voter ID", "EVM voting", "VVPAT verification", "7 AM – 6 PM", "Indelible ink"]
  },
  {
    phase: "मतगणना", color: "#000080", done: false,
    title: "Vote Counting & Results",
    date: "Counting Day — announced separately",
    body: "EVM votes are counted by Returning Officers under strict supervision of candidates' counting agents. Postal ballots (for armed forces, overseas voters) are counted first. Results are declared seat by seat and published on ECI's results portal.",
    pills: ["Counting agents", "Postal ballots", "EVM strong room", "ECI results portal", "Form 20"]
  },
  {
    phase: "सरकार गठन", color: "#7b3f00", done: false,
    title: "Government Formation",
    date: "Within days of election results",
    body: "The party or coalition with majority (272+ seats in Lok Sabha) is invited by the President to form the government. The leader is sworn in as Prime Minister by the President at Rashtrapati Bhavan. Council of Ministers is then appointed.",
    pills: ["272+ majority", "President's invitation", "Coalition", "Swearing-in", "Cabinet formation"]
  },
  {
    phase: "संसद सत्र", color: "#000080", done: false,
    title: "Parliament Session & Budget",
    date: "Within 6 months of election",
    body: "The newly elected Parliament holds its first Budget Session. The President addresses a joint sitting of both Houses. A new Speaker is elected for the Lok Sabha. The first full Union Budget is presented by the Finance Minister.",
    pills: ["Budget Session", "President's address", "Lok Sabha Speaker", "Union Budget", "Question Hour"]
  }
];

export const quizData = [
  {
    q: "What is the minimum age to vote in Indian elections?",
    opts: ["16 years", "18 years", "21 years", "25 years"],
    ans: 1,
    exp: "Under Article 326 of the Indian Constitution, every citizen aged 18 and above is entitled to vote. The voting age was lowered from 21 to 18 by the 61st Constitutional Amendment Act, 1988."
  },
  {
    q: "Which body conducts elections in India?",
    opts: ["Parliament of India", "Supreme Court of India", "Election Commission of India (ECI)", "NITI Aayog"],
    ans: 2,
    exp: "The Election Commission of India (ECI) is an autonomous constitutional body established under Article 324. It is responsible for administering free and fair elections to Parliament, State Legislatures, and the offices of President and Vice President."
  },
  {
    q: "What does EVM stand for in Indian elections?",
    opts: ["Electronic Voter Machine", "Electronic Voting Machine", "Elected Vote Monitor", "Electoral Verification Module"],
    ans: 1,
    exp: "EVM stands for Electronic Voting Machine. India replaced paper ballots with EVMs starting in 1999. They are paired with VVPAT (Voter Verifiable Paper Audit Trail) machines since 2013 for transparency."
  },
  {
    q: "How many seats does a party need to win a majority in Lok Sabha?",
    opts: ["200 seats", "251 seats", "272 seats", "300 seats"],
    ans: 2,
    exp: "The Lok Sabha has 543 elected seats. A simple majority requires 272 seats (more than half of 543). If no single party wins 272, a coalition government is formed."
  }
];

export const glossaryData = [
  { term: "EPIC / Voter ID", def: "Elector's Photo Identity Card — the official voter identity document issued by the Election Commission of India." },
  { term: "EVM", def: "Electronic Voting Machine — used across India since 1999 to record and count votes electronically, replacing paper ballots." },
  { term: "VVPAT", def: "Voter Verifiable Paper Audit Trail — a printer attached to the EVM that shows a 7-second paper slip confirming your vote." },
  { term: "NOTA", def: "None of the Above — a voting option that allows voters to officially express dissatisfaction with all candidates in an election." },
  { term: "BLO", def: "Booth Level Officer — a local government official who acts as the primary contact for voters in a specific geographic area (booth)." },
  { term: "Form 6", def: "The application form for new voter registration submitted to the Electoral Registration Officer or online at voters.eci.gov.in." },
  { term: "Model Code of Conduct", def: "A set of ECI guidelines binding on political parties and candidates from election announcement to result declaration." },
  { term: "cVIGIL", def: "A mobile application released by the ECI for citizens to report Model Code of Conduct violations in real-time." },
  { term: "Silence Period", def: "A 48-hour period before the end of polling during which all active campaigning, rallies, and public meetings must stop." },
  { term: "Returning Officer", def: "The designated officer in each constituency responsible for overseeing the entire election process and declaring results." }
];

export const checklistData = [
  { label: "Check your name on the Electoral Roll", sub: "Visit voters.eci.gov.in or use the Voter Helpline 1950" },
  { label: "Link your Aadhaar to your Voter ID (EPIC)", sub: "Do this on NVSP portal or via your BLO to strengthen your registration" },
  { label: "Find your Polling Booth number and location", sub: "Your booth is printed on your EPIC or search on eci.gov.in" },
  { label: "Carry your Voter ID or any of the 12 valid photo IDs", sub: "Alternatives: Aadhaar, Passport, PAN Card, Driving Licence, Bank Passbook with photo" }
];
