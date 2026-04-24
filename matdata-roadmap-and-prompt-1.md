# 🇮🇳 MataData — Indian Election Education Platform
### मेरा वोट, मेरा अधिकार · My Vote, My Right
#### Google Antigravity Prompt Wars 2025 | Challenge 2: Election Process Education

---

## 🗺️ PROJECT ROADMAP

```
Phase 1 ──────────── Phase 2 ──────────── Phase 3 ──────────── Phase 4
  MVP Core              AI Layer              Cloud Deploy          Scale
  [Week 1]              [Week 2]              [Week 3]              [Week 4]
```

---

### ✅ Phase 1 — MVP Core (Week 1)

**Goal:** Functional React webapp with Indian election content

| Task | Description | Notes |
|------|-------------|-------|
| Project scaffold | Vite + React + TypeScript | Mukta + Tiro Devanagari Hindi fonts |
| Election Timeline | 8-stage interactive Indian election timeline | Registration → Parliament session |
| Glossary | 17+ Indian electoral terms (EVM, VVPAT, NOTA…) | Searchable |
| Voter Checklist | 8-step pre-polling checklist | With ECI app links |
| Tricolor branding | Saffron / White / Green design system | Navy Ashoka Chakra accents |
| Bilingual content | English + Hindi labels across all UI | Devanagari script support |
| Dockerize | Dockerfile + .dockerignore | Multi-stage build |

**Deliverable:** Static Indian election education site on `localhost:3000`

---

### 🤖 Phase 2 — AI Layer (Week 2)

**Goal:** Gemini-powered bilingual Q&A assistant

| Task | Description | Stack |
|------|-------------|-------|
| Gemini API integration | `gemini-2.0-flash` for bilingual chat | Google AI SDK |
| AI Sahayak chatbot | Nonpartisan Hindi + English election assistant | Gemini |
| Indian civic quiz | 7-question quiz on ECI, EVM, NOTA, MCC | React state |
| Hindi quick-ask buttons | Pre-built prompts in Hindi and English | UI |
| Rate limiting | Server-side API key protection | Express middleware |
| Constituency lookup | Ask about your state's election schedule | Gemini + ECI data |

**Deliverable:** Full-featured app with live bilingual Gemini Q&A

---

### ☁️ Phase 3 — Cloud Run Deployment (Week 3)

**Goal:** Production deployment on Google Cloud Run

| Task | Description | GCP Service |
|------|-------------|-------------|
| GCP project setup | Enable APIs, create project | Cloud Console |
| Artifact Registry | Push Docker image | Artifact Registry |
| Cloud Run service | Deploy containerized app | Cloud Run (asia-south1) |
| Secret Manager | Store Gemini API key securely | Secret Manager |
| Custom domain | Map domain via Cloud Run domain mapping | Cloud Run |
| CI/CD pipeline | Auto-deploy on push to `main` | Cloud Build |

**Region:** `asia-south1` (Mumbai) — optimal latency for Indian users

**Deliverable:** Live URL — `https://matadata-xxxxx-el.a.run.app`

---

### 📈 Phase 4 — Scale & Polish (Week 4)

**Goal:** Production-grade features for Indian voters

| Task | Description | Stack |
|------|-------------|-------|
| Regional languages | Marathi, Tamil, Telugu, Bengali, Gujarati | Gemini translation |
| State-specific timelines | Show election dates by state (Vidhan Sabha) | Firestore |
| cVIGIL integration | Deep-link to ECI's MCC violation app | App links |
| NVSP deep-link | Direct link to voter registration portal | voters.eci.gov.in |
| Accessibility | Screen reader support, high contrast mode | WCAG 2.1 AA |
| Firebase Analytics | Track quiz completions, AI queries by state | Firebase |
| PWA + offline | Offline mode for low-connectivity rural areas | Service Worker |

**Deliverable:** Multi-lingual, offline-capable civic education platform

---

## 🏗️ ARCHITECTURE

```
Browser / PWA (Mobile-first for Indian users)
     │
     ▼
┌──────────────────────────────────────────────┐
│          React Frontend (Vite + TS)          │
│  Timeline │ Quiz │ AI Sahayak │ Glossary     │
│  Bilingual: English + Hindi (Devanagari)     │
└─────────────────────┬────────────────────────┘
                      │ HTTPS
                      ▼
┌──────────────────────────────────────────────┐
│       Express.js Backend (Node 20)           │
│  /api/chat  →  Gemini 2.0 Flash (bilingual) │
│  /api/quiz  →  Dynamic quiz generation       │
└─────────────────────┬────────────────────────┘
                      │ Docker Container
                      ▼
┌──────────────────────────────────────────────┐
│         Google Cloud Run                     │
│   Region: asia-south1 (Mumbai)               │
│   Auto-scaling │ HTTPS │ IAM auth            │
│   Secret Manager (Gemini API key)            │
│   Artifact Registry (Docker images)          │
│   Cloud Build (CI/CD)                        │
└──────────────────────────────────────────────┘
```

---

## 🚀 VIBE CODER PROMPT

> Copy this entire prompt into Cursor, Windsurf, GitHub Copilot, or Claude Code to scaffold and deploy the full MataData application from scratch.

---

```
You are an expert full-stack developer and Google Cloud architect.
Build and deploy "MataData" — a Gen AI-powered Indian election education
web app for the Google Antigravity Prompt Wars 2025 hackathon.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 PRODUCT BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

App name: MataData
Tagline: "मेरा वोट, मेरा अधिकार — My Vote, My Right"
Audience: Indian voters — especially first-time voters aged 18-25
Purpose: Interactive, nonpartisan education on the Indian election process
Language: Bilingual — English primary, Hindi secondary (Devanagari script)
AI model: Google Gemini 2.0 Flash (gemini-2.0-flash)
Deploy target: Google Cloud Run (asia-south1 — Mumbai region)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗂️ TECH STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Frontend:
- React 18 + TypeScript
- Vite 5 (build tool)
- CSS Modules (no Tailwind — full custom CSS for tricolor design system)
- Google Fonts: Mukta (Hindi-compatible sans), Tiro Devanagari Hindi (serif),
  JetBrains Mono (labels/tags)

Backend:
- Node.js 20 + Express.js
- @google/generative-ai SDK for Gemini
- dotenv for local secrets
- express-rate-limit for API protection

Infrastructure:
- Docker (multi-stage build)
- Google Cloud Run — region: asia-south1 (Mumbai)
- Google Artifact Registry
- Google Secret Manager (GEMINI_API_KEY)
- Google Cloud Build (CI/CD via cloudbuild.yaml)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 DESIGN SYSTEM — "Indian Tricolor"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CSS Variables:
  --saffron:  #FF9933   (primary accent, CTA buttons)
  --green:    #138808   (success states, checkmarks)
  --navy:     #000080   (header, nav background)
  --bg:       #fdf8f0   (warm paper background)
  --cream:    #fff4e0   (card backgrounds)
  --ink:      #1a1005   (body text)
  --muted:    #6b5a3a   (secondary text)

Rules:
- 6px tricolor bar (saffron / white / green) at very top of page
- Navy header with saffron bottom border
- Saffron sticky nav with ink background
- Warm paper (--bg) body — never plain white
- Mukta font for all body text (supports Devanagari)
- Angular cards with box-shadow: 4px 4px 0 var(--saffron)
- Ashoka Chakra decorative element in header (subtle opacity)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 PROJECT STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

matadata/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx          # Tricolor bar + navy header + Hindi tagline
│   │   │   ├── NavTabs.tsx         # Sticky nav: Timeline/Quiz/AI/Glossary/Checklist
│   │   │   ├── Timeline.tsx        # 8-stage Indian election timeline
│   │   │   ├── Quiz.tsx            # 7-question Indian civic quiz
│   │   │   ├── AiSahayak.tsx       # Bilingual Gemini chat interface
│   │   │   ├── Glossary.tsx        # 17+ Indian electoral terms
│   │   │   └── Checklist.tsx       # Voter prep checklist (ECI-linked)
│   │   ├── data/
│   │   │   ├── timeline.ts         # 8 election stages with Hindi phase names
│   │   │   ├── quiz.ts             # Quiz questions about ECI, EVM, NOTA, MCC
│   │   │   └── glossary.ts         # Electoral terms: EPIC, EVM, VVPAT, NOTA, BLO...
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── server/
│   ├── index.js                    # Express server, serves built client
│   └── routes/
│       └── chat.js                 # POST /api/chat — Gemini bilingual endpoint
├── Dockerfile
├── .dockerignore
├── cloudbuild.yaml
├── .env.example
└── README.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 TIMELINE DATA (8 stages — use exactly)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Stage 1 — मतदाता पंजीकरण (Voter Registration)
  Form 6, NVSP portal, BLO, EPIC/Aadhaar linking
  Deadline: ~30 days before election

Stage 2 — आचार संहिता (Model Code of Conduct)
  ECI announces schedule, MCC triggered immediately
  cVIGIL app for reporting violations

Stage 3 — नामांकन (Candidate Nomination)
  Form 2A, ₹25,000 deposit (General) / ₹12,500 (SC/ST)
  Affidavit declaration, symbol allotment

Stage 4 — प्रचार (Election Campaign)  ← ACTIVE NOW
  ₹95 lakh spending limit per Lok Sabha candidate
  48-hour silence period before polling

Stage 5 — मतदान (Voting Day)
  7 AM – 6 PM, EPIC or 12 alternative IDs
  EVM voting, VVPAT 7-second verification, indelible ink

Stage 6 — मतगणना (Vote Counting)
  Postal ballots counted first
  ECI results portal, Form 20

Stage 7 — सरकार गठन (Government Formation)
  272+ Lok Sabha seats for majority
  President invites majority party/coalition

Stage 8 — संसद सत्र (Parliament Session)
  Budget Session, President's address, Speaker election

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 GEMINI SYSTEM PROMPT (use exactly)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"You are MataData's Indian Election Education Assistant — a friendly,
knowledgeable, and strictly nonpartisan civic education guide for Indian
voters. Your name is 'MataData AI Sahayak'.

You are bilingual: respond in Hindi if the user writes in Hindi,
otherwise respond in English.

Topics you cover:
- Voter registration (Form 6, NVSP portal, voters.eci.gov.in, BLO, EPIC)
- Aadhaar–Voter ID linking and its importance
- The Election Commission of India (ECI) and its constitutional role under Article 324
- Lok Sabha, Rajya Sabha, and Vidhan Sabha elections — differences and timelines
- EVM (Electronic Voting Machine) — how it works, why it is secure
- VVPAT — what the 7-second paper slip means
- Model Code of Conduct (MCC) — what is allowed, what is prohibited
- cVIGIL app — how to report MCC violations
- Voting Day procedures, valid photo IDs (EPIC + 12 alternatives), NOTA option
- How votes are counted, postal ballots, ECI results portal
- Government formation — 272+ seats, coalition, President's role
- Candidate nomination, affidavits (myneta.info), spending limits
- Anti-defection law, delimitation, electoral bonds (factual only)

Rules:
- Never express opinions on any political party, candidate, or government policy
- Be factual and reference official sources: eci.gov.in, voters.eci.gov.in, myneta.info
- Keep responses 3-5 sentences unless a detailed explanation is essential
- Always encourage voting — end with 'जय हिन्द!' when appropriate
- If asked about a specific party or politician, redirect to factual process information"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐳 DOCKERFILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Stage 1: Build React frontend
FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ .
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS production
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/ .
COPY --from=client-build /app/client/dist ./public
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
CMD ["node", "index.js"]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☁️ CLOUD RUN DEPLOYMENT — deploy.sh
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generate a shell script deploy.sh with these exact steps:

Step 1 — Set variables
  PROJECT_ID=$(gcloud config get-value project)
  REGION=asia-south1          # Mumbai — best latency for India
  SERVICE_NAME=matadata
  IMAGE=gcr.io/$PROJECT_ID/$SERVICE_NAME

Step 2 — Enable APIs
  gcloud services enable \
    run.googleapis.com \
    artifactregistry.googleapis.com \
    cloudbuild.googleapis.com \
    secretmanager.googleapis.com

Step 3 — Store Gemini API key in Secret Manager
  echo -n "$GEMINI_API_KEY" | gcloud secrets create gemini-api-key \
    --data-file=- --replication-policy=automatic

Step 4 — Build and push Docker image
  gcloud builds submit --tag $IMAGE

Step 5 — Deploy to Cloud Run
  gcloud run deploy $SERVICE_NAME \
    --image $IMAGE \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --set-secrets GEMINI_API_KEY=gemini-api-key:latest \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 20 \
    --port 8080 \
    --description "MataData — Indian Election Education Platform"

Step 6 — Print live URL
  gcloud run services describe $SERVICE_NAME \
    --platform managed --region $REGION \
    --format 'value(status.url)'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 CI/CD — cloudbuild.yaml
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/matadata', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/matadata']
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - run
      - deploy
      - matadata
      - --image=gcr.io/$PROJECT_ID/matadata
      - --region=asia-south1
      - --platform=managed
      - --allow-unauthenticated
      - --set-secrets=GEMINI_API_KEY=gemini-api-key:latest
images:
  - 'gcr.io/$PROJECT_ID/matadata'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 FEATURE CHECKLIST (build all 5 tabs)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tab 1 — 📅 Timeline (8 Indian election stages)
  - Phase labels in Hindi (मतदाता पंजीकरण, आचार संहिता, etc.)
  - Visual states: done (green dot), active (saffron pulsing), upcoming (empty)
  - Keyword pills per stage (Form 6, VVPAT, cVIGIL, etc.)
  - Dashed saffron vertical connector line

Tab 2 — 🧠 Quiz (7 Indian civic questions)
  - Questions about ECI, EVM, NOTA, voting age, Lok Sabha majority
  - Immediate correct/wrong feedback with explanations
  - Bilingual feedback: "Sahi jawab!" / "Galat jawab."
  - Score screen with Hindi congratulations

Tab 3 — 🤖 AI Sahayak (Gemini bilingual chat)
  - Bilingual: Hindi input → Hindi response; English → English
  - 4 quick-ask buttons (mix of Hindi and English queries)
  - Loading state: "Soch raha hoon…"
  - Send button label: "पूछें →"

Tab 4 — 📖 Glossary (17+ Indian electoral terms)
  - Terms: EPIC, EVM, VVPAT, NOTA, Form 6, BLO, MCC, NVSP,
    Returning Officer, Postal Ballot, cVIGIL, Anti-Defection Law,
    Delimitation, Vidhan Sabha, Rajya Sabha, Lok Sabha, Affidavit
  - Live search filter

Tab 5 — ✅ Checklist (8 Indian voter prep steps)
  - Check EPIC on voters.eci.gov.in
  - Link Aadhaar to Voter ID
  - Find polling booth number
  - Know valid alternative IDs (Aadhaar, PAN, Passport…)
  - Verify polling date (India votes in phases)
  - Check candidates' affidavits on myneta.info
  - Download cVIGIL app
  - Verify vote on VVPAT slip

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ DEFINITION OF DONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[ ] All 5 tabs render on mobile (375px) and desktop
[ ] Hindi Devanagari text renders correctly (Mukta font)
[ ] Gemini responds in Hindi when queried in Hindi
[ ] Docker image builds: docker build -t matadata .
[ ] App runs locally: docker run -p 8080:8080 matadata
[ ] gcloud run deploy succeeds in asia-south1 region
[ ] Live HTTPS URL accessible from Indian networks
[ ] Lighthouse score > 85 on mobile
[ ] No console errors in production
[ ] cVIGIL and voters.eci.gov.in links open correctly
```

---

## 📊 GOOGLE CLOUD SERVICES

| Service | Purpose | Notes |
|---|---|---|
| **Cloud Run** | Host containerized app | `asia-south1` (Mumbai) for Indian latency |
| **Artifact Registry** | Store Docker images | Native GCP image registry |
| **Secret Manager** | Store Gemini API key | Never hardcode secrets |
| **Cloud Build** | CI/CD pipeline | Auto-deploy on git push |
| **Gemini 2.0 Flash** | Bilingual AI Sahayak | Hindi + English, fast & cheap |
| **Firebase Analytics** *(Phase 4)* | User engagement | Track by state, language |

---

## 💡 HACKATHON PITCH SUMMARY

**Problem:** Millions of Indian first-time voters — especially in rural areas — don't understand how EVM voting works, what their rights are, or how to register. Misinformation about EVMs and the election process is widespread.

**Solution:** MataData — a bilingual (English + Hindi), Gen AI-powered civic education platform that explains every stage of India's election process interactively, with a nonpartisan Gemini AI assistant that answers questions in the voter's own language.

**Why Google AI?** Gemini 2.0 Flash is fast, multilingual, and cost-efficient — perfect for a civic app that needs to scale during election season. Phase 4 adds Gemma on-device for offline education in low-connectivity areas.

**Impact:** Empower every Indian voter with the knowledge to exercise their democratic right confidently. *मेरा वोट, मेरा अधिकार।*

---

*MataData · Google Antigravity Prompt Wars 2025 · Challenge 2 · जय हिन्द 🇮🇳*
```
