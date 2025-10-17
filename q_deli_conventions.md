# Q-Deli コーディング規約ファイル

## 適用範囲

このファイルは、Q-Deli バックエンド（Node.js + Express）とフロントエンド（React）の両者に適用されます。

**これを守らないコードは本番環境にデプロイしてはいけません。**

---

## 1. JavaScript / Node.js コーディング規約

### 1.1 ファイル構成

```
functions/
├── index.js                 # エントリーポイント
├── config.js               # Firebase 設定
├── routes/
│   ├── auth.js            # 認証エンドポイント
│   ├── teach-me-this.js
│   ├── grade-essay.js
│   ├── find-mistake.js
│   ├── create-flashcards.js
│   ├── find-video.js
│   ├── generate-audio.js
│   ├── deeply-research.js
│   └── predicted-test.js
├── utils/
│   ├── prompts.js         # Claude プロンプトテンプレート
│   ├── validators.js      # バリデーション関数
│   └── error-handler.js   # 共通エラーハンドラー
└── tests/
    ├── auth.test.js
    ├── teach-me-this.test.js
    └── ...
```

### 1.2 関数の書き方

**必須ルール**：すべての関数に JSDoc コメントを記載

```javascript
/**
 * ユーザー登録を処理する
 * @param {string} email - ユーザーのメールアドレス
 * @param {string} password - ユーザーのパスワード
 * @param {string} displayName - ユーザーの表示名
 * @returns {Promise<{uid: string, message: string}>} ユーザーUID と成功メッセージ
 * @throws {Error} メール登録失敗時
 */
async function registerUser(email, password, displayName) {
  if (!email || !password || !displayName) {
    throw new Error('Email, password, and displayName are required');
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName
    });

    return {
      uid: userRecord.uid,
      message: 'User created successfully'
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(`Failed to register user: ${error.message}`);
  }
}
```

### 1.3 変数命名

| 型 | ルール | 例 |
|----|--------|-----|
| 定数 | `UPPER_SNAKE_CASE` | `API_KEY`, `MAX_RETRIES` |
| 関数・変数 | `camelCase` | `getUserData()`, `isValidEmail` |
| クラス | `PascalCase` | `UserManager`, `ApiHandler` |
| プライベート関数 | `_camelCase` | `_validateInput()` |
| Boolean | `is`, `has`, `can` で始まる | `isAuthenticated`, `hasPermission` |

### 1.4 エラーハンドリング（最重要）

**必ず try-catch で全エラーをキャッチ**

```javascript
router.post('/register', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    // バリデーション
    if (!email || !password || !displayName) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: { email: !email, password: !password, displayName: !displayName }
      });
    }

    // メール形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // 処理
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName
    });

    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      displayName,
      createdAt: new Date(),
      points: { tickets: 15, diamonds: 5 }
    });

    res.status(201).json({
      uid: userRecord.uid,
      message: 'User created successfully'
    });

  } catch (error) {
    console.error('Registration error:', error.message);
    
    // Firebase 特定エラー処理
    if (error.code === 'auth/email-already-exists') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    
    // 一般エラー処理
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Unknown error'
    });
  }
});
```

### 1.5 API キー管理（セキュリティ最優先）

**絶対にハードコードするな**

```javascript
// ❌ 悪い例
const API_KEY = 'sk-ant-abc123xyz...'; // ハードコード禁止！

// ✅ 正しい例
const API_KEY = process.env.CLAUDE_API_KEY;

if (!API_KEY) {
  throw new Error('CLAUDE_API_KEY environment variable is not set');
}
```

### 1.6 非同期処理

**Promise vs async/await**：`async/await` を推奨

```javascript
// ✅ 推奨
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// ❌ 非推奨（old style）
function fetchData() {
  return fetch(url)
    .then(response => response.json())
    .catch(error => { throw error; });
}
```

### 1.7 API レスポンス形式

**全エンドポイント統一**

```javascript
// 成功時（200）
{
  "success": true,
  "data": { /* 実際のデータ */ },
  "message": "Operation completed successfully"
}

// バリデーション失敗（400）
{
  "success": false,
  "error": "Validation failed",
  "details": { /* 詳細情報 */ }
}

// 認証失敗（401）
{
  "success": false,
  "error": "Unauthorized",
  "message": "Authentication required"
}

// サーバーエラー（500）
{
  "success": false,
  "error": "Internal server error",
  "message": process.env.NODE_ENV === 'development' ? error.message : null
}
```

### 1.8 ログ出力

```javascript
// ✅ 本番環境向けログ
console.log('[INFO] User registered:', { uid: user.uid, email: user.email });
console.warn('[WARN] API rate limit approaching');
console.error('[ERROR] Failed to fetch video:', { error: error.message, url });

// ❌ 避けるべき
console.log(entireUserObject); // 個人情報流出の危険
```

---

## 2. React / TypeScript コーディング規約

### 2.1 コンポーネント構造

```jsx
/**
 * TeachMeThisFeature コンポーネント
 * ユーザーからの質問を受け付け、AI からの解説を表示
 * @returns {JSX.Element}
 */
export function TeachMeThisFeature() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // バリデーション
    if (!question.trim()) {
      setError('質問を入力してください');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/features/teach-me-this', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data.answer);
    } catch (err) {
      setError(err.message || 'エラーが発生しました');
      console.error('TeachMeThis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="teach-me-this">
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="質問を入力してください..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? '処理中...' : '送信'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      {response && <div className="response">{response}</div>}
    </div>
  );
}
```

### 2.2 Hooks の使用

**推奨パターン**

```javascript
// ✅ カスタムフック例
function usePointSystem() {
  const [tickets, setTickets] = useState(15);
  const [diamonds, setDiamonds] = useState(5);

  const consumeTicket = useCallback(() => {
    if (tickets <= 0) {
      throw new Error('Tickets exhausted');
    }
    setTickets(t => t - 1);
  }, [tickets]);

  const consumeDiamond = useCallback(() => {
    if (diamonds <= 0) {
      throw new Error('Diamonds exhausted');
    }
    setDiamonds(d => d - 1);
  }, [diamonds]);

  return { tickets, diamonds, consumeTicket, consumeDiamond };
}

// 使用例
function MyComponent() {
  const { tickets, diamonds, consumeTicket } = usePointSystem();
  
  return <div>チケット: {tickets}</div>;
}
```

### 2.3 Error Boundary（エラー処理）

```javascript
/**
 * エラー処理用 Boundary コンポーネント
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>エラーが発生しました</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            ページをリロード
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 3. Claude API 統合規約

### 3.1 API 呼び出し共通パターン

```javascript
const callClaudeAPI = async (userMessage, systemPrompt, maxTokens = 1024) => {
  const apiKey = process.env.CLAUDE_API_KEY;
  
  if (!apiKey) {
    throw new Error('CLAUDE_API_KEY is not configured');
  }

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userMessage
          }
        ]
      },
      {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30秒タイムアウト
      }
    );

    return response.data.content[0].text;
  } catch (error) {
    console.error('Claude API error:', error.message);
    throw new Error(`Claude API call failed: ${error.message}`);
  }
};
```

### 3.2 プロンプト設計ルール

- **日本語対応**：すべてのプロンプトは明示的に「日本の教育用語に対応」と記載
- **学年指定**：grade_level パラメータで自動調整
- **出力形式指定**：JSON が必要な場合は明確に指示
- **字数制限**：max_tokens で厳密に指定

```javascript
const teachMeThisPrompt = (question, gradeLevel) => `
あなたは日本の ${gradeLevel} 年生向けの優秀な英語教師です。

【重要なルール】
1. 日本の教育課程に合わせた説明をしてください
2. 文法用語は日本語で説明してください
3. 分かりやすく、3段階で説明してください（基本→応用→発展）
4. 実例を3つ以上提示してください

【質問】
${question}

【回答】
段階的かつ分かりやすい説明を日本語で提供してください。
`;
```

---

## 4. Firestore / Database 規約

### 4.1 コレクション設計

```javascript
// users コレクション
{
  uid: 'user123',
  email: 'student@example.com',
  displayName: 'Taro Yamada',
  gradeLevel: 'JH2nd',  // 中2
  points: {
    tickets: 15,
    diamonds: 5
  },
  createdAt: Timestamp.now(),
  lastLoginAt: Timestamp.now()
}

// submissions コレクション
{
  userId: 'user123',
  featureType: 'teach_me_this',  // 機能タイプ
  inputText: '不定詞について教えてください',
  outputText: 'AI の回答...',
  tokensUsed: 256,
  pointsConsumed: { tickets: 1, diamonds: 0 },
  createdAt: Timestamp.now()
}
```

### 4.2 バッチ操作

```javascript
// ❌ N+1 クエリ（避けるべき）
async function getUsersWithSubmissions(userIds) {
  const results = [];
  for (const userId of userIds) {
    const user = await db.collection('users').doc(userId).get();
    const submissions = await db.collection('submissions')
      .where('userId', '==', userId)
      .get();
    results.push({ user: user.data(), submissions: submissions.docs });
  }
  return results;
}

// ✅ バッチ読み取り（正しい方法）
async function getUsersWithSubmissionsOptimized(userIds) {
  const batch = db.batch();
  const userRefs = userIds.map(id => db.collection('users').doc(id));
  
  const users = await Promise.all(userRefs.map(ref => ref.get()));
  const submissions = await db.collection('submissions')
    .where('userId', 'in', userIds)
    .get();
  
  return users.map(userDoc => ({
    user: userDoc.data(),
    submissions: submissions.docs.filter(s => s.data().userId === userDoc.id)
  }));
}
```

### 4.3 トランザクション（ポイント消費時は必須）

```javascript
// ポイント消費トランザクション
async function consumeTicket(userId) {
  const db = admin.firestore();
  
  return db.runTransaction(async (transaction) => {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await transaction.get(userRef);
    
    if (!userDoc.exists) {
      throw new Error('User not found');
    }
    
    const currentTickets = userDoc.data().points.tickets;
    if (currentTickets <= 0) {
      throw new Error('Not enough tickets');
    }
    
    // アトミックに更新
    transaction.update(userRef, {
      'points.tickets': currentTickets - 1
    });
    
    // トランザクション履歴に記録
    transaction.set(db.collection('point_transactions').doc(), {
      userId,
      type: 'ticket_consumption',
      amount: -1,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return currentTickets - 1;
  });
}
```

---

## 5. テストコード規約

### 5.1 Jest テスト基本形

```javascript
describe('TeachMeThis API', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { question: 'What is infinitive?' }
    };
    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
  });

  test('should return explanation for valid question', async () => {
    await teachMeThisHandler(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining({
          answer: expect.any(String)
        })
      })
    );
  });

  test('should return 400 for missing question', async () => {
    req.body.question = '';
    
    await teachMeThisHandler(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: expect.any(String)
      })
    );
  });

  test('should handle API timeout gracefully', async () => {
    // Claude API がタイムアウトしたシミュレーション
    jest.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Timeout'));
    
    await teachMeThisHandler(req, res);
    
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
```

### 5.2 テストカバレッジ要件

- **最小要件**：80% 以上
- **カバー対象**：
  - ✅ 正常系（Happy path）
  - ✅ エラー系（Error cases）
  - ✅ エッジケース（Edge cases）
  - ✅ バリデーション

```bash
# テスト実行
npm test

# カバレッジ確認
npm run test:coverage

# 出力例
TOTAL    80.5%
```

---

## 6. ポイントシステム実装規約（最重要）

### 6.1 チケット配布ロジック

```javascript
/**
 * 毎日 00:00 JST にチケット 15 枚をリセット
 * Cloud Scheduler で自動実行
 */
async function resetDailyTickets() {
  const now = new Date();
  const jstOffset = 9 * 60 * 60 * 1000; // JST = UTC+9
  const jstNow = new Date(now.getTime() + jstOffset);
  
  // 00:00 ± 1分の範囲でのみ実行
  if (jstNow.getHours() !== 0 || jstNow.getMinutes() > 1) {
    console.log('Not reset time');
    return;
  }

  const usersSnapshot = await admin.firestore().collection('users').get();
  const batch = admin.firestore().batch();

  usersSnapshot.forEach((userDoc) => {
    batch.update(userDoc.ref, {
      'points.tickets': 15,
      'lastTicketResetAt': admin.firestore.FieldValue.serverTimestamp()
    });
  });

  await batch.commit();
  console.log(`[SUCCESS] Reset tickets for ${usersSnapshot.size} users`);
}
```

### 6.2 ダイヤ配布ロジック

```javascript
/**
 * 毎月 1 日 00:00 JST にダイヤ 5 個を配布
 * 既存ダイヤはロールオーバー
 */
async function grantMonthlyDiamonds() {
  const now = new Date();
  const jstOffset = 9 * 60 * 60 * 1000;
  const jstNow = new Date(now.getTime() + jstOffset);
  
  // 1日の 00:00-01:00 の間のみ実行
  if (jstNow.getDate() !== 1 || jstNow.getHours() > 0) {
    console.log('Not grant time');
    return;
  }

  const usersSnapshot = await admin.firestore().collection('users').get();
  const batch = admin.firestore().batch();

  usersSnapshot.forEach((userDoc) => {
    const currentDiamonds = userDoc.data().points.diamonds || 0;
    batch.update(userDoc.ref, {
      'points.diamonds': currentDiamonds + 5, // ロールオーバー
      'lastDiamondGrantAt': admin.firestore.FieldValue.serverTimestamp()
    });
  });

  await batch.commit();
  console.log(`[SUCCESS] Granted diamonds to ${usersSnapshot.size} users`);
}
```

### 6.3 ポイント消費時の確認

```javascript
/**
 * ポイント消費前に必ず残数確認
 */
async function validatePointConsumption(userId, pointType, amount) {
  const userDoc = await admin.firestore().collection('users').doc(userId).get();
  const currentPoints = userDoc.data().points[pointType];

  if (currentPoints < amount) {
    const errorMessages = {
      tickets: 'チケットを使い切りました。明日の 00:00 に 15 枚配布されます',
      diamonds: 'ダイヤが足りません。来月1日に 5 個配布されます'
    };
    throw new Error(errorMessages[pointType]);
  }

  return true;
}
```

---

## 7. セキュリティチェックリスト

デプロイ前に全て確認：

- [ ] API キーが環境変数から読み込まれている
- [ ] ハードコードされた秘密情報がない（grep で確認）
- [ ] SQL インジェクション対策：プリペアドステートメント使用
- [ ] CORS 設定が正しい
- [ ] 認証されないエンドポイントは存在しないか
- [ ] レート制限が実装されているか
- [ ] ログに個人情報が含まれていないか
- [ ] HTTPS 通信のみ許可
- [ ] Firebase セキュリティルール設定完了
- [ ] 本番環境と開発環境のキーが分離

---

## 8. パフォーマンス要件

### 8.1 レスポンスタイム目標

| エンドポイント | 目標 | 備考 |
|-------------|------|------|
| ユーザー登録 | < 1秒 | Firebase Auth + DB 書き込み |
| Teach me this | < 3秒 | Claude API 待機含む |
| Grade essay | < 5秒 | Claude API の長めの処理 |
| Find video | < 2秒 | YouTube API キャッシュ活用 |
| Generate audio | < 4秒 | TTS 処理含む |

### 8.2 キャッシュ戦略

```javascript
// Redis キャッシュ使用例
const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

async function getOrFetchVideo(keyword) {
  const cacheKey = `videos:${keyword}`;
  
  // キャッシュから取得
  const cached = await client.get(cacheKey);
  if (cached) {
    console.log('Cache hit');
    return JSON.parse(cached);
  }

  // キャッシュミス：API から取得
  const videos = await fetchFromYouTube(keyword);
  
  // 24時間キャッシュ
  await client.setex(cacheKey, 86400, JSON.stringify(videos));
  
  return videos;
}
```

---

## 9. 本番環境チェック

### 9.1 環境変数必須リスト

```bash
# .env.production
NODE_ENV=production
CLAUDE_API_KEY=sk-ant-...
YOUTUBE_API_KEY=AIzaSy...
GOOGLE_CLOUD_API_KEY=AIzaSy...
FIREBASE_PROJECT_ID=q-deli-prod
FIREBASE_DATABASE_URL=https://q-deli-prod.firebaseio.com
REDIS_HOST=redis.q-deli.io
REDIS_PORT=6379
LOG_LEVEL=info
```

### 9.2 デプロイ前チェック

```bash
# テスト実行
npm test --coverage

# リント実行
npm run lint

# ビルド確認
npm run build

# セキュリティ監査
npm audit

# 本番環境へのデプロイ
firebase deploy --only functions,hosting
```

---

## 10. ドキュメント要件

全ての public API には以下を含める：

1. 関数/エンドポイントの説明
2. パラメータの型と説明
3. 戻り値の型と構造
4. 例外/エラー
5. 使用例

```javascript
/**
 * Teach me this エンドポイント
 * 
 * ユーザーの英語学習に関する質問に対して、AI が丁寧な解説を提供します。
 * 
 * @route POST /api/features/teach-me-this
 * @param {Object} req.body
 * @param {string} req.body.question - ユーザーの質問（必須）
 * @param {string} req.body.userId - ユーザーID（optional）
 * @returns {Object} 以下の構造
 *   - success: boolean
 *   - data: { answer: string }
 *   - message: string
 * @throws {400} 質問が空の場合
 * @throws {401} 未認証の場合
 * @throws {500} Claude API エラー
 * 
 * @example
 * POST /api/features/teach-me-this
 * {
 *   "question": "不定詞の用法について説明してください"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "answer": "不定詞は..."
 *   }
 * }
 */
```

---

## まとめ

このファイルの順守は **必須**です。

- **エラーハンドリング**：全エンドポイント
- **バリデーション**：全入力
- **ポイントシステム**：取引のアトミック性
- **セキュリティ**：API キー環境変数化
- **テスト**：80% 以上カバレッジ
- **ドキュメント**：全 API に JSDoc

違反したコードはコードレビューで返却されます。