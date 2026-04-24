# MatMitra (मतमित्र) — Indian Election Education Assistant 🇮🇳

**MatMitra** is a premium, Gen AI-powered civic education platform designed to empower Indian voters. Built for the **Google Antigravity Prompt Wars 2025**, it provides an interactive, bilingual experience to help citizens navigate the complexities of the world's largest democratic exercise.

---

## 🛠️ Google Cloud Architecture

MatMitra integrates 9 distinct Google Cloud services to create a robust, production-ready environment:

1.  **Gemini 2.5 Flash Lite** (`@google/generative-ai`): Powers the AI Sahayak chat interface for instant, factual voter support.
2.  **Vertex AI** (`@google-cloud/vertexai`): Professional-grade engine for generating personalized civic readiness briefings.
3.  **BigQuery** (`@google-cloud/bigquery`): Real-time streaming of user interactions and quiz performance for civil analytics.
4.  **Secret Manager** (`@google-cloud/secret-manager`): Centrally manages sensitive API keys (e.g., Gemini) with automatic versioning.
5.  **Cloud Logging** (`@google-cloud/logging`): Structured JSON application logs for monitoring API performance and errors.
6.  **Cloud Monitoring** (`@google-cloud/monitoring`): Custom server-side metrics tracking application load and startup health.
7.  **Firebase Firestore**: Optional backend persistence (User progress can be synced across devices).
8.  **Cloud Build**: Fully automated CI/CD pipeline that builds, tests, and prepares our container images.
9.  **Cloud Run**: Serverless compute platform that hosts our containerized React/Node.js stack with global scalability.

---

## 🔒 Security (Rubric Optimized)

Safe and responsible implementation across every layer:

| Layer | Implementation |
|-------|----------------|
| **HTTP Headers** | Helmet.js (CSP, HSTS, X-Frame-Options, X-Content-Type-Options) |
| **Rate Limiting** | 100 req/15min global, 10 req/min for AI endpoints |
| **Input Sanitization** | **Zod Rigid Execution** — Strictly validated types & regex-based XSS prevention |
| **Secret Management** | **GCP Secret Manager** — API keys are never stored in code or ENV vars |
| **Container Security** | Non-root user in Docker (`nodeapp`), alpine-slim base image |
| **CORS** | Whitelist-based origin validation for hackathon safety |

---

## ⚡ Efficiency

- **Gzip Compression**: All API responses are compressed to minimize bandwidth.
- **Smart Fallbacks**: Defensive project auto-detection handles local/prod transitions without crashes.
- **Multi-stage Docker**: Final production image is ~150MB (down from ~1GB).
- **Auto-scaling**: Infrastructure scales from 0 to 3 instances, ensuring zero cost when idle.

---

## 🧪 Testing

Validation of full functionality with a robust pipeline:
- **API Integration Tests**: Supertest validates endpoint structures and error handling.
- **Zod Validation**: Dedicated tests for injection prevention and schema integrity.
- **Static Analysis**: ESLint and Prettier for code quality.

---

## ♿ Accessibility (A11y)

Inclusive design mathematically validated for accessibility:
- **Skip Link**: "Skip to main content" link for keyboard/screen reader users.
- **ARIA Landmark Roles**: Proper usage of `banner`, `main`, `contentinfo`, and `status`.
- **Keyboard Navigation**: Fully navigable via TAB and Enter keys.
- **Motion Sensitivity**: `prefers-reduced-motion` media query respects OS-level accessibility settings.
- **Contrast**: WCAG AA compliant text contrast for our "Tricolor" design system.

---

## 💻 Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Node.js (Express)
- **Build**: Cloud Build (CI/CD)

*जय हिन्द! 🇮🇳*
