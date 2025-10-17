# Q-Deli セットアップガイド

## ✅ 完了したこと

以下のすべてのファイルとディレクトリが生成されました：

### 1. フロントエンド関連
- ✅ `src/package.json` - フロントエンド依存関係
- ✅ `src/App.jsx` - メインアプリケーション
- ✅ `src/index.js` - エントリーポイント
- ✅ `src/index.css` - グローバルスタイル

### 2. コンポーネント
- ✅ `src/components/Header.jsx`
- ✅ `src/components/FeatureCard.jsx`
- ✅ `src/components/LoadingSpinner.jsx`
- ✅ `src/components/ErrorMessage.jsx`
- ✅ `src/components/SuccessMessage.jsx`

### 3. ページ
- ✅ `src/pages/HomePage.jsx`
- ✅ `src/pages/LoginPage.jsx`
- ✅ `src/pages/RegisterPage.jsx`
- ✅ `src/pages/DashboardPage.jsx`
- ✅ `src/pages/TeachMeThisPage.jsx`
- ✅ `src/pages/GradeEssayPage.jsx`
- ✅ `src/pages/FindMistakePage.jsx`
- ✅ `src/pages/CreateFlashcardsPage.jsx`
- ✅ `src/pages/FindVideoPage.jsx`
- ✅ `src/pages/GenerateAudioPage.jsx`
- ✅ `src/pages/DeeplyResearchPage.jsx`
- ✅ `src/pages/PredictedTestPage.jsx`
- ✅ `src/pages/ProfilePage.jsx`
- ✅ `src/pages/HistoryPage.jsx`

### 4. サービス
- ✅ `src/services/authStore.js` - 認証状態管理（Zustand）
- ✅ `src/services/apiService.js` - API通信
- ✅ `src/config/firebase.js` - Firebase設定
- ✅ `src/utils/constants.js` - 定数定義

### 5. 設定ファイル
- ✅ `package.json` - ルートパッケージ設定
- ✅ `vite.config.js` - Vite設定
- ✅ `tailwind.config.js` - Tailwind CSS設定
- ✅ `postcss.config.js` - PostCSS設定
- ✅ `.eslintrc.cjs` - ESLint設定
- ✅ `index.html` - HTMLテンプレート

### 6. Firebase関連
- ✅ `firebase.json` - Firebase設定
- ✅ `firestore.rules` - Firestoreセキュリティルール
- ✅ `firestore.indexes.json` - Firestoreインデックス

### 7. CI/CD
- ✅ `.github/workflows/ci.yml` - GitHub Actions CI/CD

### 8. Cursor AI ルール
- ✅ `.cursor/rules/project-context.md` - プロジェクト背景
- ✅ `.cursor/rules/conventions.md` - コーディング規約
- ✅ `.cursor/rules/common-pitfalls.md` - よくあるエラー

### 9. その他
- ✅ `.env.example` - 環境変数テンプレート
- ✅ `.gitignore` - Git除外設定
- ✅ `README.md` - プロジェクト説明

---

## 🚀 次のステップ

### 1. 依存関係のインストール

```bash
# ルートディレクトリで実行
npm install

# Functionsディレクトリで実行
cd functions
npm install
cd ..
```

### 2. 環境変数の設定

`.env.example` をコピーして `.env` を作成：

```bash
cp .env.example .env
```

`.env` ファイルを編集して、Firebaseの設定情報を追加：

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_API_BASE_URL=http://localhost:5001/your-project-id/us-central1
```

### 3. Firebaseプロジェクトのセットアップ

```bash
# Firebase CLIをインストール（まだの場合）
npm install -g firebase-tools

# Firebaseにログイン
firebase login

# Firebaseプロジェクトを初期化（既存のプロジェクトを使用）
firebase use --add
```

### 4. 開発サーバーの起動

**ターミナル1（フロントエンド）:**
```bash
npm run dev
```

**ターミナル2（バックエンド）:**
```bash
cd functions
npm run serve
```

ブラウザで `http://localhost:3000` を開いてアプリを確認できます。

### 5. ビルド＆デプロイ

```bash
# ビルド
npm run build

# デプロイ
firebase deploy
```

---

## 📁 プロジェクト構造

```
Q-Deli/
├── src/                         # フロントエンド
│   ├── components/              # 再利用可能なコンポーネント
│   │   ├── Header.jsx
│   │   ├── FeatureCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── SuccessMessage.jsx
│   ├── pages/                   # ページコンポーネント
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── ... (全14ページ)
│   ├── services/                # API/状態管理
│   │   ├── authStore.js
│   │   └── apiService.js
│   ├── config/                  # 設定
│   │   └── firebase.js
│   ├── utils/                   # ユーティリティ
│   │   └── constants.js
│   ├── App.jsx                  # メインアプリ
│   ├── index.js                 # エントリーポイント
│   └── index.css                # グローバルスタイル
├── functions/                   # Cloud Functions
│   ├── index.js
│   ├── config.js
│   └── middleware/
├── .cursor/rules/               # Cursor AI ルール
│   ├── project-context.md
│   ├── conventions.md
│   └── common-pitfalls.md
├── .github/workflows/           # CI/CD
│   └── ci.yml
├── index.html                   # HTMLテンプレート
├── vite.config.js               # Vite設定
├── tailwind.config.js           # Tailwind設定
├── firebase.json                # Firebase設定
├── firestore.rules              # セキュリティルール
└── README.md                    # ドキュメント
```

---

## 🎯 実装されている機能

### 認証
- ✅ メール/パスワード登録
- ✅ メール/パスワードログイン
- ✅ Googleログイン
- ✅ ログアウト

### ポイントシステム
- ✅ チケット表示（🎫）
- ✅ ダイヤ表示（💎）
- ✅ ポイント消費（基本実装）

### 基本機能（チケット🎫消費）
1. ✅ Teach me this - 質問解説ページ
2. ✅ Grade my essay - 英作文採点ページ
3. ✅ Find my mistake - 誤り検出ページ
4. ✅ Create flashcards - 暗記カード生成ページ
5. ✅ Find a video - 動画検索ページ
6. ✅ Generate audio - 音声生成ページ

### プレミアム機能（ダイヤ💎消費）
7. ✅ Deeply Research - 深掘り調査ページ
8. ✅ Predicted Test - 試験問題生成ページ

### その他
- ✅ プロフィールページ
- ✅ 履歴ページ

---

## 📝 注意事項

### まだ実装されていない機能

以下の機能は、バックエンド実装が必要です：

1. **Cloud Functions の実装**
   - 各機能のエンドポイント
   - Claude API との統合
   - YouTube API との統合
   - Google Cloud TTS との統合

2. **ポイント配布システム**
   - Cloud Scheduler の設定
   - 毎日00:00のチケット配布
   - 毎月1日のダイヤ配布

3. **データベース機能**
   - 履歴の保存と取得
   - 検索機能
   - フィルタリング

### 次のフェーズで実装すべきこと

**フェーズ1：バックエンド基盤**（推奨：次の1ヶ月）
1. Cloud Functions の基本構造
2. ポイントシステムの完全実装
3. Firestore データベーススキーマ確定

**フェーズ2：基本機能**（推奨：その後1.5ヶ月）
1. Teach me this の完全実装
2. Grade my essay の完全実装
3. 残り4つの基本機能

**フェーズ3：プレミアム機能**（推奨：その後1ヶ月）
1. Deeply Research
2. Predicted Test

---

## 🛠️ トラブルシューティング

### Q: `npm install` でエラーが出る
A: Node.js 18以上がインストールされているか確認してください。

### Q: Firebase設定が見つからない
A: `.env` ファイルを作成し、Firebaseコンソールから設定情報をコピーしてください。

### Q: API呼び出しでエラーが出る
A: Cloud Functionsが起動しているか確認してください（`cd functions && npm run serve`）。

### Q: Tailwindのスタイルが反映されない
A: `npm install` を実行してTailwind CSSがインストールされているか確認してください。

---

## 📚 参考ドキュメント

- [React公式ドキュメント](https://react.dev/)
- [Vite公式ドキュメント](https://vitejs.dev/)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/)
- [Firebase公式ドキュメント](https://firebase.google.com/docs)
- [Zustand公式ドキュメント](https://docs.pmnd.rs/zustand)

---

## ✨ 完成おめでとうございます！

Q-Deliプロジェクトのフロントエンド基盤が完成しました。
次は、バックエンド実装に進みましょう！

---

**作成日**: 2025年10月17日  
**バージョン**: 1.0.0  
**ステータス**: フロントエンド基盤完成 ✅
