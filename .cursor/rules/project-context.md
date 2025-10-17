# Q-Deli Project Context

## Overview
- Q-Deli: 24時間の英語家庭教師（日本の中高生向け）
- Frontend: React + Vite
- Backend: Firebase Cloud Functions (Node 18 + Express), Firestore, Firebase Auth
- External APIs: Anthropic Claude, YouTube Data API v3, Google Cloud TTS

## Phases (1-5)
1. Phase 1: Backend foundation (Auth, points, base endpoints)
2. Phase 2: Free features (Teach, Grade, Mistake, Flashcards, Video)
3. Phase 3: Premium features (Audio, Deep Research, Predicted Test stepwise)
4. Phase 4: Integration & tests
5. Phase 5: Production readiness (Docker, CI/CD, monitoring)

## MVP Scope
- Auth (signup/login)
- Points (daily tickets, monthly diamonds)
- Teach feature basic flow
- Firestore collections: users, submissions

## Point System
- Tickets: 15/day reset at 00:00 JST, no carryover
- Diamonds: 5/month on the 1st, carryover enabled
- All consumption operations must be transactional

## Japanese Education Terminology
- 学年表記（中1=JH1st, 中2=JH2nd, 中3=JH3rd, 高1=SH1st, 高2=SH2nd, 高3=SH3rd）
- 採点用語、文法用語は日本語で提示

## Non-Functional
- Error handling mandatory (try/catch, user-friendly messages)
- Response shape unified
- No API keys in code; use environment variables
- Test coverage target: 80%+
