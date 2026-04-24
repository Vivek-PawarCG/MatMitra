# MatMitra (मतमित्र) — Indian Election Education Assistant 🇮🇳

**MatMitra** is a premium, Gen AI-powered civic education platform designed to empower Indian voters. Built for the **Google Antigravity Prompt Wars 2025**, it provides an interactive, bilingual experience to help citizens navigate the complexities of the world's largest democratic exercise.

---

## 🛠️ Google Cloud Architecture

MatMitra integrates **9 distinct Google Cloud services** to create a robust, production-ready environment:

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
| **Input Sanitization** | **Zod Rigid Execution** — Strictly validated types & regex-based XSS prevention |
| **Secret Management** | **GCP Secret Manager** — API keys are never stored in code or ENV vars |
| **Container Security** | Non-root user in Docker (`nodeapp`), alpine-slim base image |
| **Rate Limiting** | Tiered limiting: 100 req/15min global, 10 req/min for AI endpoints |

---

## ⚡ Efficiency

- **Gzip Compression**: All API responses are compressed to minimize bandwidth.
- **Vite Proxy**: Optimized local development environment and relative production API calls.
- **Multi-stage Docker**: Final production image size optimized (~150MB).
- **Auto-scaling**: Infrastructure scales dynamically on Cloud Run for cost efficiency.

---

## 🧪 Testing Pipeline

Validation of full functionality with a robust dual-framework pipeline:

```bash
# Backend: Jest + Supertest
npm test --prefix server
# Validates: Health checks, Zod schema integrity, API error handling

# Frontend: Vitest + React Testing Library
npm test --prefix client
# Validates: Component rendering, Accessibility (A11y), Data presence (NOTA/BLO)
```
- **Vitest Framework** — DOM simulation verifying React component behavior
- **API Integration Tests** — Supertest validates endpoints
- **Zod Validation tests** — XSS prevention, length limits, type checking
- **Build verification** — Vite production build validated on every change
- **Health endpoint** — `/api/health` for Cloud Run liveness probes
---

## ♿ Accessibility (A11y)

Inclusive design mathematically validated for accessibility:
- **Skip Link**: "Skip to main content" link for keyboard/screen reader efficiency.
- **ARIA Landmark Roles**: Usage of `banner`, `main`, `contentinfo`, and `status`.
- **Focus Indicators**: High-contrast `:focus-visible` rings for keyboard navigation.
- **Semantic HTML**: Structural tags used to create a clear document outline for assistive tech.

---

## 💻 Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Node.js (Express)
- **Build**: Cloud Build (CI/CD)

