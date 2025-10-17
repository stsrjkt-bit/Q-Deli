# Q-Deli コード生成時によくあるエラー＆修正ガイド

## AI が自動生成する際に注意すべき典型的なエラー

このファイルは、開発時に陥りやすいエラーパターンと、その正しい修正方法を記載しています。

---

## ❌ エラー 1：API キーをハードコードする

### 悪い例

```javascript
const API_KEY = 'sk-ant-abc123xyz'; // 本物のキー
```

### 正しい例

```javascript
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

if (!API_KEY) {
  throw new Error('API_KEY environment variable is not set');
}
```

---

## ❌ エラー 2：エラーハンドリングがない

### 悪い例

```javascript
async function handleSubmit(e) {
  e.preventDefault();
  const result = await apiCall(); // エラー処理なし
  setResult(result);
}
```

### 正しい例

```javascript
async function handleSubmit(e) {
  e.preventDefault();
  
  try {
    setIsLoading(true);
    const result = await apiCall();
    setResult(result);
  } catch (error) {
    console.error('Error:', error);
    setError('エラーが発生しました');
  } finally {
    setIsLoading(false);
  }
}
```

---

## ❌ エラー 3：ポイント消費がアトミックでない

### 悪い例

```javascript
// ポイント確認と消費が分離（競合状態の危険）
const tickets = userData.points.tickets;
if (tickets <= 0) return;

await callAPI();
await updatePoints(tickets - 1); // ここで失敗する可能性
```

### 正しい例

```javascript
// トランザクション内でアトミックに処理
await db.runTransaction(async (transaction) => {
  const userRef = db.collection('users').doc(userId);
  const userDoc = await transaction.get(userRef);
  
  if (userDoc.data().points.tickets <= 0) {
    throw new Error('No tickets');
  }
  
  transaction.update(userRef, {
    'points.tickets': userDoc.data().points.tickets - 1
  });
});
```

---

## ❌ エラー 4：バリデーション不足

### 悪い例

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  await apiCall(inputText); // バリデーションなし
};
```

### 正しい例

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!inputText.trim()) {
    setError('入力してください');
    return;
  }
  
  if (inputText.length > 5000) {
    setError('5000文字以内で入力してください');
    return;
  }
  
  await apiCall(inputText);
};
```

---

## ❌ エラー 5：ログに個人情報を出力

### 悪い例

```javascript
console.log('User data:', userData); // 個人情報が見える
console.log(essayText); // 学生の作文が丸見え
```

### 正しい例

```javascript
console.log('[INFO] User action:', { userId: user.uid });
console.log('[INFO] Essay processed', { length: essayText.length });
```

---

## ❌ エラー 6：ポイント残数表示が即座に更新されない

### 悪い例

```javascript
// API 呼び出し後、ポイント残数を再取得していない
await apiCall();
// UI に古いポイント情報が表示される
```

### 正しい例

```javascript
const response = await apiCall();

// レスポンスにポイント残数を含める
if (response.pointsRemaining) {
  updatePoints(response.pointsRemaining);
}
```

---

## ❌ エラー 7：Firebase セキュリティルール未設定

### 悪い例

```javascript
// firestore.rules
match /{document=**} {
  allow read, write: if true; // 全ユーザーに読み書き許可（危険！）
}
```

### 正しい例

```javascript
// ユーザードキュメント：本人のみ読み書き
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}
```

---

## チェックリスト（デプロイ前に必ず確認）

- [ ] API キー：環境変数化 ✅
- [ ] エラーハンドリング：全エンドポイント ✅
- [ ] バリデーション：全入力 ✅
- [ ] ポイント消費：アトミック処理 ✅
- [ ] ログ：個人情報なし ✅
- [ ] ポイント UI：即座に更新 ✅
- [ ] Firebase セキュリティ：ルール設定 ✅
- [ ] CORS：許可オリジン限定 ✅
- [ ] テストコード：80% カバレッジ ✅

全てチェックされたら、本番デプロイ可能です。
