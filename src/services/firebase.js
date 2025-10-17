import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../config/firebaseConfig.js';

/**
 * Initialize Firebase app and export the auth instance.
 */
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
