/**
 * アプリケーション全体で使用する定数
 */

// 学年レベル
export const GRADE_LEVELS = {
  JH1ST: { value: 'JH1st', label: '中学1年生' },
  JH2ND: { value: 'JH2nd', label: '中学2年生' },
  JH3RD: { value: 'JH3rd', label: '中学3年生' },
  SH1ST: { value: 'SH1st', label: '高校1年生' },
  SH2ND: { value: 'SH2nd', label: '高校2年生' },
  SH3RD: { value: 'SH3rd', label: '高校3年生' }
};

// ポイントタイプ
export const POINT_TYPES = {
  TICKET: 'ticket',
  DIAMOND: 'diamond'
};

// 機能タイプ
export const FEATURE_TYPES = {
  TEACH_ME_THIS: 'teach_me_this',
  GRADE_ESSAY: 'grade_essay',
  FIND_MISTAKE: 'find_mistake',
  CREATE_FLASHCARDS: 'create_flashcards',
  FIND_VIDEO: 'find_video',
  GENERATE_AUDIO: 'generate_audio',
  DEEPLY_RESEARCH: 'deeply_research',
  PREDICTED_TEST: 'predicted_test'
};

// ポイントコスト
export const POINT_COSTS = {
  [FEATURE_TYPES.TEACH_ME_THIS]: { type: POINT_TYPES.TICKET, cost: 1 },
  [FEATURE_TYPES.GRADE_ESSAY]: { type: POINT_TYPES.TICKET, cost: 1 },
  [FEATURE_TYPES.FIND_MISTAKE]: { type: POINT_TYPES.TICKET, cost: 1 },
  [FEATURE_TYPES.CREATE_FLASHCARDS]: { type: POINT_TYPES.TICKET, cost: 1 },
  [FEATURE_TYPES.FIND_VIDEO]: { type: POINT_TYPES.TICKET, cost: 1 },
  [FEATURE_TYPES.GENERATE_AUDIO]: { type: POINT_TYPES.TICKET, cost: 1 },
  [FEATURE_TYPES.DEEPLY_RESEARCH]: { type: POINT_TYPES.DIAMOND, cost: 1 },
  [FEATURE_TYPES.PREDICTED_TEST]: { type: POINT_TYPES.DIAMOND, cost: 1 }
};

// エラーメッセージ
export const ERROR_MESSAGES = {
  NO_TICKETS: 'チケットが不足しています。明日の00:00に15枚配布されます。',
  NO_DIAMONDS: 'ダイヤが不足しています。来月1日に5個配布されます。',
  NETWORK_ERROR: 'ネットワークエラーが発生しました。インターネット接続を確認してください。',
  SERVER_ERROR: 'サーバーエラーが発生しました。しばらく待ってから再度お試しください。',
  VALIDATION_ERROR: '入力内容を確認してください。',
  UNKNOWN_ERROR: 'エラーが発生しました。もう一度お試しください。'
};

// API エンドポイント
export const API_ENDPOINTS = {
  TEACH_ME_THIS: '/features/teach-me-this',
  GRADE_ESSAY: '/features/grade-essay',
  FIND_MISTAKE: '/features/find-mistake',
  CREATE_FLASHCARDS: '/features/create-flashcards',
  FIND_VIDEO: '/features/find-video',
  GENERATE_AUDIO: '/features/generate-audio',
  DEEPLY_RESEARCH: '/features/deeply-research',
  PREDICTED_TEST: '/features/predicted-test'
};
