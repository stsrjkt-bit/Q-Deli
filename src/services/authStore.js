import { create } from 'zustand';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

/**
 * 認証状態管理ストア
 * Zustandを使用してグローバル状態を管理
 */
export const useAuthStore = create((set) => ({
  user: null,
  userData: null,
  isLoading: true,
  error: null,

  /**
   * ユーザー登録
   */
  register: async (email, password, displayName, gradeLevel) => {
    try {
      set({ error: null });
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestoreにユーザーデータを保存
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        gradeLevel: gradeLevel,
        points: {
          tickets: 15,
          diamonds: 5
        },
        createdAt: new Date(),
        lastLoginAt: new Date()
      });

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      set({ error: error.message });
      throw error;
    }
  },

  /**
   * ログイン
   */
  login: async (email, password) => {
    try {
      set({ error: null });
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      set({ error: error.message });
      throw error;
    }
  },

  /**
   * Googleログイン
   */
  loginWithGoogle: async () => {
    try {
      set({ error: null });
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // 新規ユーザーの場合、Firestoreに保存
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          gradeLevel: 'JH2nd', // デフォルト
          points: {
            tickets: 15,
            diamonds: 5
          },
          createdAt: new Date(),
          lastLoginAt: new Date()
        });
      }
      
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      set({ error: error.message });
      throw error;
    }
  },

  /**
   * ログアウト
   */
  logout: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, userData: null });
    } catch (error) {
      console.error('Logout error:', error);
      set({ error: error.message });
    }
  },

  /**
   * ユーザーデータを取得
   */
  fetchUserData: async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        set({ userData: userDoc.data() });
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Fetch user data error:', error);
      return null;
    }
  },

  /**
   * ポイント更新
   */
  updatePoints: (points) => {
    set((state) => ({
      userData: {
        ...state.userData,
        points
      }
    }));
  }
}));

// 認証状態の監視
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userData = await useAuthStore.getState().fetchUserData(user.uid);
    useAuthStore.setState({ user, userData, isLoading: false });
  } else {
    useAuthStore.setState({ user: null, userData: null, isLoading: false });
  }
});
