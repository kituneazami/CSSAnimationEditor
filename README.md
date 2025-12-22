# CSS Animation Editor

CSSアニメーションを視覚的に作成・編集し、実装可能なCSSコードを生成するWebアプリケーション

## 特徴

- 📊 **ビジュアルタイムラインエディタ** - キーフレームをドラッグ&ドロップで直感的に配置
- 🎨 **リアルタイムプレビュー** - 編集中のアニメーションを即座に確認
- 💻 **CSSコード自動生成** - そのまま使える実装可能なCSSコードを出力
- 🎯 **豊富なプリセット** - よく使うアニメーションをワンクリックで適用
- 🔧 **詳細なプロパティ編集** - transform, opacity, color など多様なプロパティに対応
- 📦 **インポート/エクスポート** - アニメーション設定の保存と共有が可能

## ドキュメント

- [ユーザーガイド](./USER_GUIDE.md) - アプリの使い方と詳細機能の説明
- [チュートリアル](./TUTORIAL.md) - 実践的なステップバイステップガイド
- [動作確認ガイド](./TESTING.md) - 機能テストと動作確認手順
- [デバッグガイド](./DEBUGGING.md) - 問題解決とデバッグ方法
- [仕様書](./SPECIFICATION.md) - 詳細な機能仕様と技術設計
- [プロジェクト構造](./PROJECT_STRUCTURE.md) - ディレクトリ構成とファイル配置

## 使い方

### クイックスタート（30秒）

1. アプリケーションを起動: `npm run dev`
2. ブラウザで http://localhost:5173 を開く
3. 「Quick Start」ボタンをクリック
4. プレビューエリアの「Play」ボタンでアニメーション再生
5. 下部のコードビューアで「Copy」をクリックしてCSSコードを取得

詳しい使い方は [ユーザーガイド](./USER_GUIDE.md) と [チュートリアル](./TUTORIAL.md) をご覧ください。

## 開発状況

✅ **Phase 1 完了**: 基本機能（MVP）実装完了
✅ **Phase 2 完了**: 拡張機能実装完了
✅ **Phase 3 一部完了**: 高度な機能実装完了

### 実装済み機能

#### ✅ 基本機能
- ✅ プロジェクトセットアップ（React + TypeScript + Vite）
- ✅ 状態管理（Zustand）
- ✅ 完全なUI構築（レイヤーパネル、プレビュー、タイムライン、プロパティパネル）
- ✅ リアルタイムプレビュー
- ✅ タイムラインエディタ（キーフレーム追加・編集）
- ✅ プロパティ編集（opacity, backgroundColor, transform, filter）
- ✅ CSSコード自動生成とコピー機能
- ✅ カスタム要素サポート（Box、Text、Image）

#### ✅ 拡張機能
- ✅ 複数レイヤー対応（表示/非表示、ロック、順序変更）
- ✅ プリセットアニメーションライブラリ（15種類以上）
- ✅ プロジェクトのインポート/エクスポート（JSON形式）
- ✅ ローカルストレージへの自動保存
- ✅ アンドゥ/リドゥ機能
- ✅ カスタムイージング関数（cubic-bezier）

#### ✅ 高度な機能
- ✅ 高度なTransformエディタ（translate, rotate, scale, skew）
- ✅ 高度なFilterエディタ（blur, brightness, contrast, etc.）
- ✅ リアルタイムアニメーション再生
- ✅ SVGパスアニメーション対応（circular, wave, infinity paths）
- ✅ 再生速度調整とループ機能

## 技術スタック

- **フロントエンド**: React 18.3.1 + TypeScript 5.6.3
- **スタイリング**: Tailwind CSS 3.4.17
- **状態管理**: Zustand 4.5.0
- **ビルドツール**: Vite 6.0.5
- **ユーティリティ**: clsx, nanoid

## セットアップ

### 前提条件

- Node.js 18+
- npm または yarn

### インストール手順

```bash
# リポジトリをクローン
git clone <repository-url>
cd cssAnimationEditor

# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```

開発サーバーは http://localhost:5173 で起動します。

### ビルド

```bash
# プロダクションビルド
npm run build

# ビルド結果をプレビュー
npm run preview
```

### その他のコマンド

```bash
# ESLintでコードをチェック
npm run lint
```

## ライセンス

MIT

## コントリビューション

コントリビューションを歓迎します！Issue や Pull Request をお気軽にお送りください。
