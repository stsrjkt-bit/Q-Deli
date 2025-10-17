# Q-Deli プロジェクト背景・文脈ファイル

## プロジェクト概要

**プロジェクト名**：Question Deli（Q-Deli）

**キャッチコピー**：「24時間の英語家庭教師」

**目的**：中学生～高校生向けの AI 英語学習サポートアプリ

**ビジネスモデル**：
- 無料版：チケット制（毎日 15 枚リセット）
- プレミアム：ダイヤ制（毎月 5 個配布、ロールオーバー可能）

---

## 推奨計画（計画B：標準版）

### 実装スコープ：全 8 機能

1. **Teach me this**（🎫1）- 質問への解説
2. **Grade my essay**（🎫1）- 英作文採点＆フィードバック
3. **Find my mistake**（🎫1）- 誤り指摘＆改善案
4. **Create flashcards**（🎫1）- 暗記カード自動生成
5. **Find a video**（🎫1）- YouTube 動画検索
6. **Generate audio**（🎫1）- 音声解説生成
7. **Deeply Research**（💎1）- 深掘り調査（プレミアム）
8. **Predicted Test**（💎1）- 試験問題生成＆分析（プレミアム）

### 開発期間：5ヶ月（2025年10月～2026年3月）

---

## 技術スタック

### フロントエンド
- **フレームワーク**：React 18
- **状態管理**：Zustand
- **スタイリング**：Tailwind CSS
- **ビルドツール**：Vite

### バックエンド
- **プラットフォーム**：Firebase Cloud Functions
- **ランタイム**：Node.js 18+
- **フレームワーク**：Express
- **データベース**：Firestore（NoSQL）
- **認証**：Firebase Authentication

### 外部 API
- **Claude API**：claude-sonnet-4-20250514（全機能の中核）
- **YouTube Data API v3**：動画検索
- **Google Cloud TTS**：音声生成
- **Google Cloud Vision**：OCR（画像入力時）

### デプロイ
- **ホスティング**：Firebase Hosting
- **CI/CD**：GitHub Actions
- **バージョン管理**：Git / GitHub

---

## ポイントシステム詳細仕様

### チケット🎫

```javascript
{
  name: 'Ticket',
  daily_grant: 15,
  reset_time: '00:00 JST',
  expiry: 'end of day',
  carryover: false,
  consumption_per_session: 1,
  multiple_messages_in_session: 'no additional consumption'
}
```

### ダイヤ💎

```javascript
{
  name: 'Diamond',
  monthly_grant: 5,
  reset_time: '1st day of month 00:00 JST',
  expiry: 'never (carryover enabled)',
  carryover: true,
  consumption_per_feature: 1,
  confirmation_dialog: true
}
```

---

## 日本の教育用語への準拠ルール

実装時に必ず守ること：

1. **学年の呼び方**
   - 中学1年生 = 中1（JH1st）
   - 中学2年生 = 中2（JH2nd）
   - 中学3年生 = 中3（JH3rd）
   - 高校1年生 = 高1（SH1st）
   - 高校2年生 = 高2（SH2nd）
   - 高校3年生 = 高3（SH3rd）

2. **ポイント名の統一**
   - チケット🎫 = Ticket（塾のチケット制と同じ概念）
   - ダイヤ💎 = Diamond（プレミアム感を演出）

---

## 成功指標

### ユーザー体験
- API レスポンス時間：< 2秒
- エラー率：< 0.1%
- ユーザーが迷わない操作フロー

### ビジネス指標
- DAU（デイリーアクティブユーザー）：100+ by 月1
- 平均セッション時間：10+ 分
- チケット消費率：平均 10/15
- ダイヤ消費率：平均 3/5
