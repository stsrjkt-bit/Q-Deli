import axios from 'axios';

/**
 * APIサービス
 * バックエンドとの通信を担当
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/q-deli/us-central1';

// Axiosインスタンス作成
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// リクエストインターセプター（認証トークン追加）
apiClient.interceptors.request.use(
  async (config) => {
    // Firebase Authトークンを取得して追加
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター（エラーハンドリング）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Teach me this 機能
 */
export const teachMeThis = async (question, userId) => {
  const response = await apiClient.post('/features/teach-me-this', {
    question,
    userId
  });
  return response.data;
};

/**
 * Grade my essay 機能
 */
export const gradeEssay = async (essayText, userId) => {
  const response = await apiClient.post('/features/grade-essay', {
    essayText,
    userId
  });
  return response.data;
};

/**
 * Find my mistake 機能
 */
export const findMistake = async (text, userId) => {
  const response = await apiClient.post('/features/find-mistake', {
    text,
    userId
  });
  return response.data;
};

/**
 * Create flashcards 機能
 */
export const createFlashcards = async (topic, userId) => {
  const response = await apiClient.post('/features/create-flashcards', {
    topic,
    userId
  });
  return response.data;
};

/**
 * Find a video 機能
 */
export const findVideo = async (keyword, userId) => {
  const response = await apiClient.post('/features/find-video', {
    keyword,
    userId
  });
  return response.data;
};

/**
 * Generate audio 機能
 */
export const generateAudio = async (text, userId) => {
  const response = await apiClient.post('/features/generate-audio', {
    text,
    userId
  });
  return response.data;
};

/**
 * Deeply research 機能
 */
export const deeplyResearch = async (topic, userId) => {
  const response = await apiClient.post('/features/deeply-research', {
    topic,
    userId
  });
  return response.data;
};

/**
 * Predicted test 機能
 */
export const predictedTest = async (gradeLevel, userId) => {
  const response = await apiClient.post('/features/predicted-test', {
    gradeLevel,
    userId
  });
  return response.data;
};

export default apiClient;
