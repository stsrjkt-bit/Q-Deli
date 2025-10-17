# Q-Deli コーディング規約ファイル

## 適用範囲

このファイルは、Q-Deli バックエンド（Node.js + Express）とフロントエンド（React）の両者に適用されます。

**これを守らないコードは本番環境にデプロイしてはいけません。**

---

## 1. React / JavaScript コーディング規約

### 1.1 コンポーネント構造

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

  // ハンドラー実装...

  return (
    <div className="teach-me-this">
      {/* JSX実装 */}
    </div>
  );
}
```

### 1.2 変数命名

| 型 | ルール | 例 |
|----|--------|-----|
| 定数 | `UPPER_SNAKE_CASE` | `API_KEY`, `MAX_RETRIES` |
| 関数・変数 | `camelCase` | `getUserData()`, `isValidEmail` |
| コンポーネント | `PascalCase` | `UserManager`, `ApiHandler` |
| Boolean | `is`, `has`, `can` で始まる | `isAuthenticated`, `hasPermission` |

### 1.3 エラーハンドリング（最重要）

**必ず try-catch で全エラーをキャッチ**

```javascript
async function handleSubmit(e) {
  e.preventDefault();
  
  try {
    // 処理
  } catch (error) {
    console.error('Error:', error);
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
}
```

### 1.4 API キー管理（セキュリティ最優先）

**絶対にハードコードするな**

```javascript
// ❌ 悪い例
const API_KEY = 'sk-ant-abc123xyz...'; // ハードコード禁止！

// ✅ 正しい例
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

if (!API_KEY) {
  throw new Error('API_KEY environment variable is not set');
}
```

---

## 2. Tailwind CSS スタイリング規約

### 2.1 共通クラス使用

```jsx
// ボタン
<button className="btn-primary">送信</button>
<button className="btn-secondary">キャンセル</button>

// カード
<div className="card">...</div>

// 入力フィールド
<input className="input-field" />
```

### 2.2 レスポンシブデザイン

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* カード */}
</div>
```

---

## 3. 状態管理（Zustand）

### 3.1 ストア定義

```javascript
export const useAuthStore = create((set) => ({
  user: null,
  userData: null,
  
  login: async (email, password) => {
    // ログイン処理
  },
  
  updatePoints: (points) => {
    set((state) => ({
      userData: {
        ...state.userData,
        points
      }
    }));
  }
}));
```

---

## 4. API 呼び出し

### 4.1 統一形式

```javascript
export const teachMeThis = async (question, userId) => {
  const response = await apiClient.post('/features/teach-me-this', {
    question,
    userId
  });
  return response.data;
};
```

---

## 5. テストコード規約

### 5.1 テストカバレッジ要件

- **最小要件**：80% 以上
- **カバー対象**：
  - ✅ 正常系（Happy path）
  - ✅ エラー系（Error cases）
  - ✅ エッジケース（Edge cases）
  - ✅ バリデーション

---

## 6. セキュリティチェックリスト

デプロイ前に全て確認：

- [ ] API キーが環境変数から読み込まれている
- [ ] ハードコードされた秘密情報がない（grep で確認）
- [ ] CORS 設定が正しい
- [ ] 認証されないエンドポイントは存在しないか
- [ ] HTTPS 通信のみ許可
- [ ] Firebase セキュリティルール設定完了
- [ ] 本番環境と開発環境のキーが分離

---

## まとめ

このファイルの順守は **必須**です。

- **エラーハンドリング**：全エンドポイント
- **バリデーション**：全入力
- **セキュリティ**：API キー環境変数化
- **テスト**：80% 以上カバレッジ

違反したコードはコードレビューで返却されます。
