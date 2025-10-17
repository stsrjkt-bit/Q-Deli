import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Axios instance for API calls.
 */
const client = axios.create({ baseURL: API_BASE_URL, timeout: 30000 });

/**
 * Generic POST helper attaching bearer token if provided.
 * @param {string} path
 * @param {any} data
 * @param {string=} idToken
 */
async function post(path, data, idToken) {
  const headers = idToken ? { Authorization: `Bearer ${idToken}` } : undefined;
  const res = await client.post(path, data, { headers });
  return res.data;
}

/**
 * Call Teach feature.
 * @param {{question: string}} payload
 * @param {string=} idToken
 */
export async function postTeachMe(payload, idToken) {
  return post('/teach-me', payload, idToken);
}

export default client;
