# Q-Deli - 24時間の英語家庭教師

中学生・高校生向けの AI 英語学習サポートアプリ

## プロジェクト概要

**キャッチコピー**: 24時間の英語家庭教師

**主な機能**:
- 📚 Teach me this - 質問への解説
- ✍️ Grade my essay - 英作文採点＆フィードバック
- 🔍 Find my mistake - 誤り指摘＆改善案
- 🃏 Create flashcards - 暗記カード自動生成
- 🎥 Find a video - YouTube動画検索
- 🔊 Generate audio - 音声解説生成
- 🔬 Deeply Research - 深掘り調査（プレミアム）
- 📝 Predicted Test - 試験問題生成＆分析（プレミアム）

## 技術スタック

### フロントエンド
- React 18
- Vite
- Tailwind CSS
- Zustand (状態管理)
- React Router
- Firebase SDK

### バックエンド
- Firebase Cloud Functions
- Node.js 18+
- Express
- Firestore
- Firebase Authentication

### 外部API
- Claude API (claude-sonnet-4-20250514)
- YouTube Data API v3
- Google Cloud TTS
- Google Cloud Vision

## セットアップ

### 前提条件
- Node.js 18以上
- npm または yarn
- Firebase CLIツール

### インストール

1. リポジトリをクローン
```bash
git clone <repository-url>
cd Q-Deli
```

2. 依存関係をインストール（フロントエンド）
```bash
npm install
```

3. 依存関係をインストール（バックエンド）
```bash
cd functions
npm install
cd ..
```

4. 環境変数を設定
```bash
cp .env.example .env
```

`.env` ファイルを編集して、Firebaseの設定を追加してください。

5. 開発サーバーを起動
```bash
npm run dev
```

6. Cloud Functionsエミュレータを起動（別ターミナル）
```bash
cd functions
npm run serve
```

## ビルド

```bash
npm run build
```

## デプロイ

```bash
firebase deploy
```

## プロジェクト構造

```
Q-Deli/
├── src/                      # フロントエンドソース
│   ├── components/           # Reactコンポーネント
│   ├── pages/                # ページコンポーネント
│   ├── services/             # API/状態管理
│   ├── config/               # 設定ファイル
│   ├── utils/                # ユーティリティ
│   ├── App.jsx               # メインアプリ
│   └── index.js              # エントリーポイント
├── functions/                # Cloud Functions
│   ├── index.js              # 関数エントリー
│   ├── config.js             # Firebase設定
│   └── middleware/           # ミドルウェア
├── .cursor/rules/            # Cursor AI ルール
├── .github/workflows/        # CI/CD
├── public/                   # 静的ファイル
├── index.html                # HTMLテンプレート
├── vite.config.js            # Vite設定
├── tailwind.config.js        # Tailwind設定
├── firebase.json             # Firebase設定
└── firestore.rules           # Firestoreセキュリティルール
```

## ポイントシステム

### チケット 🎫
- 毎日00:00 JSTに15枚配布
- 基本機能で使用
- 繰り越し不可

### ダイヤ 💎
- 毎月1日00:00 JSTに5個配布
- プレミアム機能で使用
- 繰り越し可能

## ライセンス

Private - All Rights Reserved

## お問い合わせ

プロジェクトに関するお問い合わせは、リポジトリのIssuesまでお願いします。
