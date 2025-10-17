/**
 * Get current user's ID token if available.
 * @returns {Promise<string|null>}
 */
export async function getIdTokenSafe() {
  try {
    const { auth } = await import('../services/firebase.js');
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  } catch (err) {
    return null;
  }
}
