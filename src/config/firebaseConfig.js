/**
 * Firebase configuration loaded from environment variables.
 * Supports both Vite and CRA naming conventions.
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.REACT_APP_FIREBASE_API_KEY || '',
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.REACT_APP_FIREBASE_PROJECT_ID || 'localhost'}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.REACT_APP_FIREBASE_PROJECT_ID || '',
};
