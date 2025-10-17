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
- **状態管理**：Redux / Zustand
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

## 5 フェーズ実装計画

### フェーズ 1：基盤構築（1ヶ月）

**目標**：バックエンド基盤の完成

**実装項目**：
- Firebase プロジェクト初期設定
- ユーザー認証（登録・ログイン）
- ポイントシステム実装
  - チケット配布ロジック（毎日 00:00 JST に 15 枚）
  - ダイヤ配布ロジック（毎月 1 日 00:00 JST に 5 個）
  - ポイント消費・残高管理
- Firestore スキーマ設計（9 テーブル）
- Express サーバー基本設定
- CORS・環境変数設定

**成果物**：
- Cloud Functions デプロイ可能な状態
- `package.json`, `index.js`, `config.js` 完成
- ユーザー登録・ログイン API 動作確認済み

---

### フェーズ 2：基本 5 機能（1.5ヶ月）

**目標**：無料機能の全実装

**実装項目**：

#### 1. Teach me this
- Claude API 呼び出し（claude-sonnet-4-20250514）
- 学年別対応プロンプト設計
- 解説の段階的生成（初心者→中級→上級）
- Firestore 保存

#### 2. Grade my essay
- 採点ルーブリック実装（5 項目、100点満点）
- 2 段階処理
  - ステップ 1：内部評価（厳格な採点官視点）
  - ステップ 2：ユーザー向けフィードバック（温かいトーン）
- JSON 出力（スコア、グレード、詳細フィードバック）

#### 3. Find my mistake
- 誤り検出ロジック実装
- 訂正案の提示
- 理由説明（Why this is correct）
- 複数誤りへの対応

#### 4. Create flashcards
- Q&A 対自動生成（10-20枚）
- JSON 形式出力
- フロント側フリップアニメーション用データ構造

#### 5. Find a video
- YouTube Data API v3 統合
- キーワード自動生成（Claude で最適化）
- 5-10件の動画リストと詳細情報取得
- サムネイル URL、再生時間、チャンネル名含む

**成果物**：
- 5 つのエンドポイント完成
- ローカルテスト合格（各機能 pytest）
- Firestore に全データ保存確認

---

### フェーズ 3：高度な 2 機能（1ヶ月）

**目標**：プレミアム機能の実装

**実装項目**：

#### 6. Generate audio
- Claude API で音声スクリプト生成
- Google Cloud TTS 統合（日本語対応）
- MP3 ファイル生成
- 再生可能な状態で配信

#### 7. Deeply Research
- Web API 統合（Google Custom Search または Bing）
- 複数ソース（5-10件）から情報抽出
- Markdown 形式レポート生成
- 出典付きで出力

#### 8. Predicted Test
- **Phase 1**：試験問題自動生成（複数選択肢形式）
- **Phase 2**：弱点分析＆個別対策問題生成
- スコア計算ロジック
- ユーザー回答の記録

**成果物**：
- 3 つの新エンドポイント完成
- プレミアム機能のダイヤ消費確認ロジック実装

---

### フェーズ 4：統合＆テスト（1ヶ月）

**目標**：全機能の連携確認

**実装項目**：
- 全 8 エンドポイント結合テスト
- エラーハンドリング完全実装
  - API 失敗時のリトライ
  - タイムアウト処理
  - ユーザーフレンドリーなエラーメッセージ
- パフォーマンス最適化
  - レスポンスタイム < 3秒 の達成
  - キャッシュ戦略実装（Redis 推奨）
- セキュリティ監査
  - API キー環境変数化完了
  - SQL インジェクション対策確認
  - CORS 設定再確認

**成果物**：
- テストカバレッジ 80% 以上
- 本番直前のコード品質確認

---

### フェーズ 5：本番準備（1ヶ月）

**目標**：本番環境へのデプロイ

**実装項目**：
- Docker 化（本番・開発環境一致）
- GitHub Actions CI/CD 設定
  - プッシュ時に自動テスト実行
  - テスト合格時に自動デプロイ
- Firebase Hosting 設定
- 負荷テスト（1000+ 同時接続対応確認）
- 監視＆ログ設定
- 本番環境での 1 週間スモークテスト

**成果物**：
- 本番稼働可能な状態
- デプロイ手順書完成

---

## MVP（最小限の実行可能製品）スコープ

実装開始時の最小スコープ：

- ユーザー認証（登録・ログイン）
- ポイントシステム基本（配布・消費・表示）
- **Teach me this** のみ動作確認
- Firestore 基本テーブル（users, submissions）

**目標**：1週間で MVP 立ち上げ

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

### ユーザー画面表示

- **位置**：ヘッダー右上
- **フォーマット**：`💎 5 🎫 15`
- **更新タイミング**：リアルタイム（消費時・配布時）

### DB テーブル設計（9 テーブル）

1. **users** - ユーザープロフィール
2. **chat_submissions** - テキストチャット記録
3. **essays** - 英作文＆採点結果
4. **flashcards** - 暗記カードセット
5. **video_searches** - 動画検索履歴
6. **audio_files** - 生成音声ファイル
7. **research_reports** - 調査レポート
8. **predicted_tests** - 試験結果＆分析
9. **point_transactions** - ポイント移動履歴

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

2. **英語学習の専門用語**
   - 英作文 = English composition
   - 文法 = Grammar
   - 単語 = Vocabulary / Words
   - 発音 = Pronunciation
   - リスニング = Listening
   - リーディング = Reading
   - スピーキング = Speaking
   - 大学受験 = University entrance exam
   - 共通テスト = Common Test (Daigaku Kyodo Nyushi)

3. **採点用語**
   - 採点 = Grading / Scoring
   - 採点官 = Grader / Marker
   - ルーブリック = Rubric
   - 評価 = Evaluation / Assessment
   - フィードバック = Feedback

4. **ポイント名の統一**
   - チケット🎫 = Ticket（塾のチケット制と同じ概念）
   - ダイヤ💎 = Diamond（プレミアム感を演出）

---

## 優先度マトリックス

| 優先度 | 項目 | 実装フェーズ |
|--------|------|------------|
| 最高 | ユーザー認証 | フェーズ1 |
| 最高 | ポイントシステム | フェーズ1 |
| 最高 | Teach me this | フェーズ2 |
| 高 | Grade my essay | フェーズ2 |
| 高 | Find my mistake | フェーズ2 |
| 中 | Create flashcards | フェーズ2 |
| 中 | Find a video | フェーズ2 |
| 中 | Generate audio | フェーズ3 |
| 低 | Deeply Research | フェーズ3 |
| 低 | Predicted Test | フェーズ3 |

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

### コスト効率
- Claude API トークン消費を監視・制限
- 月額ランニングコスト < ¥50,000（初期段階）

---

## Cursor Agent への最終指示

このファイルを参照して、以下を実施：

1. **フェーズ1**から開始（基盤構築）
2. **conventions.md** と **common-pitfalls.md** を必ず確認
3. 各実装後、テストコードを自動生成
4. エラーは常に明示的にハンドリング
5. 日本の教育用語を正確に使用
6. ポイントシステムの正確性を最優先
7. 本番環境を想定した実装（ハードコード禁止）

---

**次ステップ**：conventions.md と common-pitfalls.md を生成