# Common Pitfalls and Fixes

## 1. API key leakage
- Bad: hardcoded keys in code
- Good: read via env; validate presence at startup

## 2. Missing error handling
- Bad: no try/catch
- Good: wrap async handlers; map known errors to 4xx/5xx

## 3. N+1 queries
- Bad: per-item Firestore reads in loops
- Good: batched reads or `in` queries

## 4. Non-transactional point updates
- Bad: read then write separately
- Good: use Firestore transactions; record `point_transactions`

## 5. JSON parsing from LLM responses
- Bad: direct JSON.parse without guards
- Good: extract JSON via regex; fallback to raw text

## 6. CORS misconfiguration
- Bad: `cors()` with `*`
- Good: restrict to env-configured origins

## 7. Timeout-less external calls
- Bad: axios without timeout/retries
- Good: 30s timeout + limited retries

## 8. PII in logs
- Bad: dump essay/question contents
- Good: log only metadata (ids, lengths)

## 9. Unvalidated inputs
- Bad: trust request body
- Good: type/length/pattern checks, sanitize

## 10. Frontend unnecessary re-renders
- Bad: inline heavy computations
- Good: memoize handlers and derived values

## 11. Security rules too permissive
- Bad: allow read/write true
- Good: least privilege, per-collection
