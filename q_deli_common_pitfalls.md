# Q-Deli コード生成時によくあるエラー＆修正ガイド

## AI が自動生成する際に注意すべき典型的なエラー

このファイルは、Cursor Agent が陥りやすい 15 のエラーパターンと、その正しい修正方法を記載しています。

**これらのエラーが検出された場合、Cursor Agent への修正指示テンプレートを下記に示します。**

---

## ❌ エラー 1：API キーをハードコードする

### 悪い例

```javascript
const API_KEY = 'sk-ant-abc123xyz'; // 本物のキー
const YOUTUBE_KEY = 'AIzaSyDabc123'; // ハードコード

router.post('/teach-me-this', async (req, res) => {
  const response = await axios.post(
    'https://api.anthropic.com/v1/messages',
    { ... },
    {
      headers: {
        'x-api-key': API_KEY // ハードコードされたキー
      }
    }
  );
});
```

### 正しい例

```javascript
const API_KEY = process.env.CLAUDE_API_KEY;

if (!API_KEY) {
  throw new Error('CLAUDE_API_KEY environment variable is not set');
}

router.post('/teach-me-this', async (req, res) => {
  const response = await axios.post(
    'https://api.anthropic.com/v1/messages',
    { ... },
    {
      headers: {
        'x-api-key': API_KEY
      }
    }
  );
});
```

### 修正指示テンプレート

```
「以下のファイルを確認してください：
- functions/routes/teach-me-this.js
- functions/routes/grade-essay.js
- functions/routes/find-video.js

これらのファイル内で、API キーがハードコードされていないか確認し、
全て process.env から読み込むように修正してください。

環境変数チェック：
const API_KEY = process.env.CLAUDE_API_KEY;
if (!API_KEY) {
  throw new Error('CLAUDE_API_KEY environment variable is not set');
}

修正後、再度ファイルを出力してください。」
```

---

## ❌ エラー 2：エラーハンドリングがない

### 悪い例

```javascript
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  const userRecord = await auth.createUser({ email, password });
  const userDoc = await db.collection('users').doc(userRecord.uid).set({ email });
  
  res.json({ success: true, uid: userRecord.uid });
});
```

**問題**：
- `auth.createUser()` が失敗したら？
- `db.collection().set()` が失敗したら？
- どのエラーが発生したのか追跡不可

### 正しい例

```javascript
router.post('/register', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    
    // バリデーション
    if (!email || !password || !displayName) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Firebase 処理
    const userRecord = await auth.createUser({ email, password, displayName });
    
    // DB 保存
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      displayName,
      createdAt: new Date()
    });
    
    res.status(201).json({
      success: true,
      data: { uid: userRecord.uid }
    });
    
  } catch (error) {
    console.error('Registration error:', error.message);
    
    // Firebase 特定エラー
    if (error.code === 'auth/email-already-exists') {
      return res.status(409).json({
        success: false,
        error: 'Email already registered'
      });
    }
    
    // 一般エラー
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});
```

### 修正指示テンプレート

```
「全 API エンドポイントにおいて、エラーハンドリングが実装されていることを確認してください。

チェック項目：
1. 全ての try-catch ブロックが実装されている
2. バリデーションエラーは 400 を返す
3. 認証エラーは 401 を返す
4. Firebase 特定エラーは具体的に処理
5. 予期しないエラーは 500 を返す
6. console.error でエラーログを出力

以下のファイルを確認：
- functions/routes/auth.js
- functions/routes/teach-me-this.js
- functions/routes/grade-essay.js
- [全エンドポイント]

修正後、再度確認できるコードを出力してください。」
```

---

## ❌ エラー 3：N+1 クエリ問題

### 悪い例

```javascript
// ユーザーリストと各ユーザーの投稿を取得
async function getUsersWithSubmissions(userIds) {
  const results = [];
  
  for (const userId of userIds) {
    // ❌ ループ内で毎回クエリ（N+1 問題）
    const user = await db.collection('users').doc(userId).get();
    const submissions = await db.collection('submissions')
      .where('userId', '==', userId)
      .get();
    
    results.push({
      user: user.data(),
      submissions: submissions.docs.map(d => d.data())
    });
  }
  
  return results;
  // 例：userIds が 100 件 → 200 クエリ実行
}
```

### 正しい例

```javascript
async function getUsersWithSubmissions(userIds) {
  // ✅ 1つのクエリで全ユーザー取得
  const usersSnapshot = await db.collection('users')
    .where(admin.firestore.FieldPath.documentId(), 'in', userIds)
    .get();
  
  // ✅ 1つのクエリで全投稿取得
  const submissionsSnapshot = await db.collection('submissions')
    .where('userId', 'in', userIds)
    .get();
  
  // メモリ上で結合
  const submissionsByUserId = {};
  submissionsSnapshot.forEach(doc => {
    const userId = doc.data().userId;
    if (!submissionsByUserId[userId]) {
      submissionsByUserId[userId] = [];
    }
    submissionsByUserId[userId].push(doc.data());
  });
  
  return usersSnapshot.docs.map(userDoc => ({
    user: userDoc.data(),
    submissions: submissionsByUserId[userDoc.id] || []
  }));
  // 例：userIds が 100 件 → 2 クエリ実行
}
```

### 修正指示テンプレート

```
「Firestore クエリのパフォーマンスを確認してください。

チェック項目：
1. ループ内での複数クエリがないか
2. where 句で 'in' 演算子を使用しているか
3. batch read/write を活用しているか

以下のファイルを確認：
- functions/utils/validators.js
- functions/routes/[全ルート]

N+1 問題が発見された場合、修正してください。」
```

---

## ❌ エラー 4：ポイント消費がアトミックでない

### 悪い例

```javascript
router.post('/teach-me-this', async (req, res) => {
  const { question, userId } = req.body;
  
  // ❌ 読み込みと更新が分離（競合状態の危険）
  const userDoc = await db.collection('users').doc(userId).get();
  const tickets = userDoc.data().points.tickets;
  
  if (tickets <= 0) {
    return res.status(400).json({ error: 'No tickets' });
  }
  
  // Claude API 呼び出し
  const answer = await callClaudeAPI(question);
  
  // ❌ ここで更新（途中で失敗する可能性）
  await db.collection('users').doc(userId).update({
    'points.tickets': tickets - 1
  });
  
  res.json({ answer });
});

// 問題：
// 1. 複数のリクエストが同時に処理された場合、ポイントが正確でない
// 2. API 呼び出し中にエラーが発生したら、ポイントが消費されない
```

### 正しい例

```javascript
router.post('/teach-me-this', async (req, res) => {
  const { question, userId } = req.body;
  
  try {
    // ✅ トランザクション内でアトミックに処理
    const answer = await db.runTransaction(async (transaction) => {
      const userRef = db.collection('users').doc(userId);
      const userDoc = await transaction.get(userRef);
      
      const tickets = userDoc.data().points.tickets;
      if (tickets <= 0) {
        throw new Error('No tickets available');
      }
      
      // Claude API 呼び出し（トランザクション外）
      // 注：API 呼び出しはトランザクション内で行わない（タイムアウトリスク）
      return await callClaudeAPI(question);
    });
    
    // ポイント消費はトランザクション後
    await db.runTransaction(async (transaction) => {
      const userRef = db.collection('users').doc(userId);
      const userDoc = await transaction.get(userRef);
      
      transaction.update(userRef, {
        'points.tickets': userDoc.data().points.tickets - 1
      });
    });
    
    res.json({ answer });
    
  } catch (error) {
    console.error('TeachMeThis error:', error);
    res.status(500).json({ error: error.message });
  }
});
```

### 修正指示テンプレート

```
「ポイント消費のロジックを確認してください。

チェック項目：
1. ポイント確認と消費が同じトランザクション内か
2. API 呼び出しはトランザクション外か
3. 消費失敗時のロールバック処理があるか
4. point_transactions テーブルに記録されているか

以下のファイルを確認：
- functions/routes/teach-me-this.js
- functions/routes/grade-essay.js
- functions/routes/[全 API エンドポイント]

トランザクション処理：
const answer = await db.runTransaction(async (transaction) => {
  // ポイント確認と消費
  const userRef = db.collection('users').doc(userId);
  const userDoc = await transaction.get(userRef);
  
  if (userDoc.data().points.tickets <= 0) {
    throw new Error('No tickets');
  }
  
  transaction.update(userRef, {
    'points.tickets': userDoc.data().points.tickets - 1
  });
});

修正後、確認できるコードを出力してください。」
```

---

## ❌ エラー 5：ポイント配布の重複

### 悪い例

```javascript
// Cloud Scheduler で毎日 00:00 に実行
async function resetDailyTickets(req, res) {
  const usersSnapshot = await db.collection('users').get();
  
  // ❌ 単純に全ユーザーをリセット
  usersSnapshot.forEach(async (userDoc) => {
    await db.collection('users').doc(userDoc.id).update({
      'points.tickets': 15
    });
  });
  
  res.json({ success: true });
  
  // 問題：
  // 1. 複数回実行されたら二重配布
  // 2. 実行状態を追跡していない
}
```

### 正しい例

```javascript
async function resetDailyTickets(req, res) {
  try {
    const now = new Date();
    const jstOffset = 9 * 60 * 60 * 1000;
    const jstNow = new Date(now.getTime() + jstOffset);
    
    // ✅ 実行時刻の正確性確認
    if (jstNow.getHours() !== 0 || jstNow.getMinutes() > 1) {
      console.log('Not reset time, skipping');
      return res.status(200).json({ message: 'Not reset time' });
    }
    
    // ✅ 実行状態を記録
    const resetDoc = await db.collection('system_status').doc('ticket_reset').get();
    const lastResetDate = resetDoc.data()?.lastResetDate;
    const todayStr = jstNow.toISOString().split('T')[0];
    
    if (lastResetDate === todayStr) {
      console.log('Already reset today');
      return res.status(200).json({ message: 'Already reset' });
    }
    
    // ✅ バッチで更新
    const usersSnapshot = await db.collection('users').get();
    const batch = db.batch();
    let count = 0;
    
    usersSnapshot.forEach((userDoc) => {
      batch.update(userDoc.ref, {
        'points.tickets': 15,
        'lastTicketResetAt': admin.firestore.FieldValue.serverTimestamp()
      });
      count++;
    });
    
    await batch.commit();
    
    // ✅ 実行状態を更新
    await db.collection('system_status').doc('ticket_reset').set({
      lastResetDate: todayStr,
      lastResetTime: new Date(),
      usersReset: count
    });
    
    console.log(`[SUCCESS] Reset tickets for ${count} users`);
    res.status(200).json({
      success: true,
      usersReset: count
    });
    
  } catch (error) {
    console.error('Reset error:', error);
    res.status(500).json({ error: error.message });
  }
}
```

### 修正指示テンプレート

```
「ポイント配布ロジックを確認してください。

チェック項目：
1. Cloud Scheduler の実行状態を記録しているか
2. 二重実行の防止機構があるか
3. JST タイムゾーンで正確に判定しているか
4. バッチ処理で効率的に更新しているか
5. 実行結果をログに記録しているか

以下のファイルを確認：
- functions/utils/scheduler.js または同等のファイル

修正後、実行状態管理の仕組みを確認できるコードを出力してください。」
```

---

const MAX_ESSAY_LENGTH = 5000; // 5000文字まで
const MIN_ESSAY_LENGTH = 50;

router.post('/grade-essay', async (req, res) => {
  try {
    const { essayText, userId } = req.body;
    
    // ✅ 包括的なバリデーション
    if (!essayText || typeof essayText !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Essay text must be a non-empty string'
      });
    }
    
    const trimmedEssay = essayText.trim();
    
    if (trimmedEssay.length < MIN_ESSAY_LENGTH) {
      return res.status(400).json({
        success: false,
        error: `Essay must be at least ${MIN_ESSAY_LENGTH} characters`
      });
    }
    
    if (trimmedEssay.length > MAX_ESSAY_LENGTH) {
      return res.status(400).json({
        success: false,
        error: `Essay must not exceed ${MAX_ESSAY_LENGTH} characters`
      });
    }
    
    // ✅ 有害コンテンツの簡易チェック
    const harmfulPatterns = ['<script', '<?php', 'javascript:', 'onclick'];
    if (harmfulPatterns.some(pattern => trimmedEssay.toLowerCase().includes(pattern))) {
      return res.status(400).json({
        success: false,
        error: 'Essay contains invalid content'
      });
    }
    
    // 処理続行...
    res.json({ success: true });
    
  } catch (error) {
    console.error('Grade essay error:', error);
    res.status(500).json({ error: error.message });
  }
});
```

### 修正指示テンプレート

```
「ユーザー入力バリデーションを強化してください。

チェック項目：
1. 最大文字数制限があるか（API コスト対策）
2. 最小文字数チェックがあるか
3. データ型チェックが正確か
4. 有害パターン（スクリプトタグ等）をチェックしているか
5. SQL インジェクション対策はあるか

各エンドポイントで以下を実装：
- 文字列型確認
- 長さ制限（最大値・最小値）
- 正規表現によるパターンチェック
- 正規化（trim, toLowerCase など）

修正後、全バリデーション関数を出力してください。」
```

---

## ❌ エラー 7：Claude API のタイムアウト未対応

### 悪い例

```javascript
const response = await axios.post(
  'https://api.anthropic.com/v1/messages',
  { ... },
  { headers: { ... } }
  // ❌ タイムアウト設定がない
);
```

### 正しい例

```javascript
const response = await axios.post(
  'https://api.anthropic.com/v1/messages',
  {
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [...]
  },
  {
    headers: {
      'x-api-key': process.env.CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json'
    },
    timeout: 30000, // ✅ 30秒タイムアウト
    // ✅ リトライロジック
    maxRetries: 3,
    retryDelay: 1000
  }
);
```

### 修正指示テンプレート

```
「Claude API 呼び出しにタイムアウト＆リトライを追加してください。

全ファイル確認：
- functions/routes/teach-me-this.js
- functions/routes/grade-essay.js
- functions/routes/[全 Claude API 使用ファイル]

追加内容：
1. timeout: 30000 を axios オプションに追加
2. リトライ機構を実装
3. エラー時のユーザーメッセージを用意

修正後、全 Claude API 呼び出し部分を確認できるコードを出力してください。」
```

---

## ❌ エラー 8：JSON パース失敗時の処理がない

### 悪い例

```javascript
const response = await axios.post('https://api.anthropic.com/v1/messages', ...);
const result = JSON.parse(response.data.content[0].text);
// ❌ Claude が JSON を返さなかったら、ここで落ちる
```

### 正しい例

```javascript
try {
  const response = await axios.post('https://api.anthropic.com/v1/messages', ...);
  const responseText = response.data.content[0].text;
  
  // ✅ JSON 部分を抽出
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in response');
  }
  
  const result = JSON.parse(jsonMatch[0]);
  return result;
  
} catch (parseError) {
  console.error('JSON parse error:', parseError);
  return { rawResponse: responseText }; // フォールバック
}
```

### 修正指示テンプレート

```
「JSON パース処理にエラーハンドリングを追加してください。

チェック対象：
- functions/routes/grade-essay.js
- functions/routes/find-mistake.js
- functions/routes/create-flashcards.js
- functions/routes/deeply-research.js
- functions/routes/predicted-test.js

各ファイルで JSON パースが行われている箇所を確認し、
以下を実装：
1. try-catch で JSON.parse をラップ
2. 正規表現で JSON 部分を抽出（`/\{[\s\S]*\}/`）
3. パース失敗時のフォールバック

修正後、全 JSON パース処理を確認できるコードを出力してください。」
```

---

## ❌ エラー 9：ログに個人情報を出力

### 悪い例

```javascript
const userRecord = { uid: 'user123', email: 'john@example.com', password: 'secret123' };
console.log('User created:', userRecord); // ❌ パスワードが見える
console.log(essayText); // ❌ 学生の作文が丸見え
```

### 正しい例

```javascript
const userRecord = { uid: 'user123', email: 'john@example.com' };
console.log('[INFO] User created:', { uid: userRecord.uid, email: userRecord.email });
// ✅ 必要な情報だけ

console.log('[INFO] Essay processed successfully', { userId, essayLength: essayText.length });
// ✅ 内容ではなくメタデータだけ
```

### 修正指示テンプレート

```
「ログ出力を確認し、個人情報が含まれていないかチェックしてください。

削除すべき情報：
- パスワード
- API キー・トークン
- 学生の作文・質問・回答
- メールアドレス（必要な場合はマスク）

ログに含めて良い情報：
- userId / uid
- 処理の成功/失敗
- 処理時間
- テーブル/コレクション名
- エラーメッセージ（非詳細）

全ファイルで console.log/warn/error を確認し、
個人情報がないことを確認してください。」
```

---

## ❌ エラー 10：ポイント残数表示が即座に更新されない

### 悪い例

```javascript
// フロント側
async function handleTeachMeThis() {
  const response = await fetch('/api/features/teach-me-this', {
    method: 'POST',
    body: JSON.stringify({ question })
  });
  
  // ❌ ポイント残数を再取得していない
  // UI に古いポイント情報が表示される
}
```

### 正しい例

```javascript
async function handleTeachMeThis() {
  try {
    // API 呼び出し
    const response = await fetch('/api/features/teach-me-this', {
      method: 'POST',
      body: JSON.stringify({ question })
    });
    
    const data = await response.json();
    
    // ✅ API レスポンスにポイント残数を含める
    if (data.success) {
      // Redux/Zustand を使って状態更新
      dispatch(updatePoints({
        tickets: data.pointsRemaining.tickets,
        diamonds: data.pointsRemaining.diamonds
      }));
    }
    
  } catch (error) {
    // エラー処理
  }
}

// バックエンド側
router.post('/teach-me-this', async (req, res) => {
  // ... 処理 ...
  
  // ✅ レスポンスにポイント残数を含める
  const updatedUser = await db.collection('users').doc(userId).get();
  
  res.json({
    success: true,
    data: { answer },
    pointsRemaining: updatedUser.data().points // ← これが重要
  });
});
```

### 修正指示テンプレート

```
「ポイント消費後の即座の UI 更新を実装してください。

バックエンド：
全ての機能エンドポイント（teach-me-this, grade-essay など）で、
レスポンスに以下を含める：
{
  \"success\": true,
  \"data\": { /* 機能固有データ */ },
  \"pointsRemaining\": {
    \"tickets\": 12,
    \"diamonds\": 4
  }
}

フロント：
Redux/Zustand で受け取ったポイント情報を状態更新し、
ヘッダーの💎 🎫 表示を即座に更新

修正後、バックエンド＆フロント両方を確認できるコードを出力してください。」
```

---

## ❌ エラー 11：Firebase セキュリティルール未設定

### 悪い例

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ❌ 全ユーザーに読み書き許可（危険！）
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 正しい例

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ✅ ユーザードキュメント：本人のみ読み書き
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // ✅ 投稿：本人のみ書き込み、全員読み込み可
    match /submissions/{document=**} {
      allow read: if request.auth != null;
      allow create, update, delete: if request.auth.uid == resource.data.userId;
    }
    
    // ✅ ポイント取引：認証必須
    match /point_transactions/{document=**} {
      allow read: if request.auth.uid == resource.data.userId;
      allow write: if false; // サーバーのみ書き込み
    }
  }
}
```

### 修正指示テンプレート

```
「Firebase セキュリティルール（firestore.rules）を設定してください。

実装すべきルール：
1. users：本人のみアクセス
2. submissions：認証ユーザーなら読み込み、本人なら書き込み
3. point_transactions：本人読み込みのみ、サーバー書き込みのみ
4. essays, flashcards, etc：同様に設定

修正後、firestore.rules ファイルを出力してください。」
```

---

## ❌ エラー 12：レスポンスヘッダー CORS 設定が不正

### 悪い例

```javascript
const cors = require('cors');

const app = express();
app.use(cors()); // ❌ 全オリジン許可（セキュリティリスク）
```

### 正しい例

```javascript
const cors = require('cors');

const app = express();
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [
    'https://q-deli.com',
    'https://www.q-deli.com',
    'http://localhost:3000' // 開発用
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 修正指示テンプレート

```
「CORS 設定を修正してください。

functions/index.js の app.use(cors(...)) を確認し、
以下を実装：
1. 許可するオリジンを限定
2. 環境変数から読み込み
3. credentials: true
4. methods と allowedHeaders を明示

修正後、CORS 設定部分を確認できるコードを出力してください。」
```

---

## ❌ エラー 13：Claude プロンプトが不完全

### 悪い例

```javascript
const systemPrompt = 'You are an English teacher.';

const response = await callClaudeAPI(question, systemPrompt);
// ❌ 出力形式が指定されていない
// ❌ 学年別対応がない
// ❌ 日本語との混在指示がない
```

### 正しい例

```javascript
const getTeachMeThisPrompt = (gradeLevel) => `
あなたは日本の ${gradeLevel} 年生向けの優秀な英語教師です。

【重要なルール】
1. 日本の教育課程に準拠した説明をしてください
2. 文法用語は日本語で説明してください（例：不定詞 = infinitive）
3. 実例を3つ以上提示してください
4. 分かりやすさを最優先に、段階的に説明してください
5. 学生を励ます温かいトーンで答えてください

【学年別対応】
- 中1：基本的な文法と単語
- 中2-3：応用文法、センテンス構造
- 高1-2：複雑な文法、ニュアンス
- 高3：大学受験レベル

【回答形式】
段階1：基本的な説明（200文字）
段階2：実例3つ（各100文字）
段階3：発展的な注意点（100文字）
`;

const response = await callClaudeAPI(question, getTeachMeThisPrompt(gradeLevel));
```

### 修正指示テンプレート

```
「全プロンプトテンプレートを確認し、以下を実装してください。

実装対象：
- functions/utils/prompts.js 内の全プロンプト
- 各機能別（teach-me-this, grade-essay, find-mistake など）

各プロンプトに含めるべき要素：
1. 日本の教育用語への対応を明示
2. 学年別レベル指定
3. 出力形式の明示
4. 実例数の指定
5. トーン（温かい/厳密など）の指定
6. 文字数制限（必要に応じて）
7. 回避すべき内容の明示

修正後、全プロンプトテンプレートを確認できるコードを出力してください。」
```

---

## ❌ エラー 14：データベーストランザクション内での API 呼び出し

### 悪い例

```javascript
async function processTeachMeThis(question, userId) {
  return await db.runTransaction(async (transaction) => {
    // ❌ トランザクション内で外部 API 呼び出し（危険）
    const answer = await callClaudeAPI(question); // 時間がかかる
    
    const userRef = db.collection('users').doc(userId);
    transaction.update(userRef, { 'points.tickets': decrementedValue });
    
    return answer;
  });
  
  // 問題：
  // 1. トランザクションがタイムアウトする可能性
  // 2. ネットワーク遅延に影響される
  // 3. ロールバック時の処理が複雑
}
```

### 正しい例

```javascript
async function processTeachMeThis(question, userId) {
  // ステップ1：API 呼び出し（トランザクション外）
  const answer = await callClaudeAPI(question);
  
  // ステップ2：ポイント消費（トランザクション内）
  const updatedTickets = await db.runTransaction(async (transaction) => {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await transaction.get(userRef);
    
    const currentTickets = userDoc.data().points.tickets;
    if (currentTickets <= 0) {
      throw new Error('Not enough tickets');
    }
    
    transaction.update(userRef, {
      'points.tickets': currentTickets - 1
    });
    
    return currentTickets - 1;
  });
  
  return { answer, ticketsRemaining: updatedTickets };
}
```

### 修正指示テンプレート

```
「トランザクション内での処理を分離してください。

ルール：
- トランザクション内：DB 操作のみ
- トランザクション外：API 呼び出し、外部処理

確認対象ファイル：
- functions/routes/teach-me-this.js
- functions/routes/grade-essay.js
- functions/routes/generate-audio.js
- functions/routes/deeply-research.js

各ファイルで：
1. API 呼び出しをトランザクション外に移動
2. DB 操作のみトランザクション内に保持
3. エラー時のロールバックが正確か確認

修正後、全ファイルの処理フロー順序を確認できるコードを出力してください。」
```

---

## ❌ エラー 15：テストコードが書かれていない

### 悪い例

```javascript
// テストファイルなし
// 本番環境に直接デプロイ
// ❌ バグが本番で発見される
```

### 正しい例

```javascript
// functions/tests/teach-me-this.test.js
const request = require('supertest');
const app = require('../index');

describe('Teach me this API', () => {
  test('should return explanation for valid question', async () => {
    const response = await request(app)
      .post('/api/features/teach-me-this')
      .send({ question: 'What is infinitive?' });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.answer).toBeDefined();
  });

  test('should return 400 for empty question', async () => {
    const response = await request(app)
      .post('/api/features/teach-me-this')
      .send({ question: '' });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('should consume exactly 1 ticket', async () => {
    // ポイント消費テスト
    const initialPoints = await getUserPoints(userId);
    
    await request(app)
      .post('/api/features/teach-me-this')
      .send({ question: 'Test', userId });
    
    const finalPoints = await getUserPoints(userId);
    expect(initialPoints.tickets - finalPoints.tickets).toBe(1);
  });
});
```

### 修正指示テンプレート

```
「テストコードを生成してください。

以下の構造で実装：
1. functions/tests/ フォルダを作成
2. 各エンドポイント用のテストファイル
   - auth.test.js
   - teach-me-this.test.js
   - grade-essay.test.js
   - [全機能]

各テストは以下をカバー：
- ✅ 正常系（成功パターン）
- ✅ エラー系（バリデーション失敗）
- ✅ ポイント消費の正確性
- ✅ DB 操作の正確性
- ✅ API タイムアウト時の挙動

テストカバレッジ目標：80% 以上

修正後、全テストファイルを出力し、
npm test で全テスト合格することを確認してください。」
```

---

## 修正依頼の使い方

**Cursor Agent にエラーが見つかった場合、上記のテンプレートをコピー＆ペーストして指示を出してください。**

例：

```
【エラー1：API キーハードコード】
「以下のファイルを確認してください：
- functions/routes/teach-me-this.js
- ...

修正指示テンプレート内容をここにコピー＆ペースト
」

【エラー4：ポイント消費がアトミックでない】
「ポイント消費のロジックを確認してください。

修正指示テンプレート内容をここにコピー＆ペースト
」
```

---

## チェックリスト（デプロイ前に必ず確認）

- [ ] API キー：環境変数化 ✅
- [ ] エラーハンドリング：全エンドポイント ✅
- [ ] バリデーション：全入力 ✅
- [ ] N+1 クエリ：修正済み ✅
- [ ] ポイント消費：アトミック処理 ✅
- [ ] ポイント配布：二重防止機構 ✅
- [ ] Claude API：タイムアウト＆リトライ ✅
- [ ] JSON パース：エラーハンドリング ✅
- [ ] ログ：個人情報なし ✅
- [ ] ポイント UI：即座に更新 ✅
- [ ] Firebase セキュリティ：ルール設定 ✅
- [ ] CORS：許可オリジン限定 ✅
- [ ] プロンプト：日本語教育対応 ✅
- [ ] トランザクション：API 呼び出し分離 ✅
- [ ] テストコード：80% カバレッジ ✅

全てチェックされたら、本番デプロイ可能です。