# Q-Deli Conventions

## JS/TS
- Use modern ES modules where possible
- Strict type mindset; avoid `any` patterns in JS by validating inputs
- All functions must include JSDoc with parameter and return types
- Always handle errors with try/catch and return structured error responses
- Never hardcode API keys; read from environment variables

## React
- Functional components with hooks
- Keep components small and focused
- Co-locate feature-specific files
- Route-level pages in `src/pages`, reusable UI in `src/components`

## Backend
- Express with centralized error handler
- CORS origins controlled via env var `ALLOWED_ORIGINS`
- Firestore transactions for point consumption
- Claude/YouTube/TTS clients with timeouts and retries

## Testing
- Jest for backend and unit tests
- Aim for 80%+ coverage
- Avoid brittle tests; mock external APIs
