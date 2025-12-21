# プロジェクト構造

## ディレクトリ構成

```
cssAnimationEditor/
├── public/                      # 静的ファイル
│   ├── favicon.ico
│   └── index.html
│
├── src/                         # ソースコード
│   ├── components/              # Reactコンポーネント
│   │   ├── common/              # 共通コンポーネント
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   └── Modal/
│   │   │
│   │   ├── Editor/              # エディタ関連
│   │   │   ├── Timeline/        # タイムラインエディタ
│   │   │   │   ├── Timeline.tsx
│   │   │   │   ├── Keyframe.tsx
│   │   │   │   ├── PlaybackControl.tsx
│   │   │   │   └── TimelineRuler.tsx
│   │   │   │
│   │   │   ├── PropertyPanel/   # プロパティパネル
│   │   │   │   ├── PropertyPanel.tsx
│   │   │   │   ├── TransformEditor.tsx
│   │   │   │   ├── ColorEditor.tsx
│   │   │   │   ├── OpacityEditor.tsx
│   │   │   │   └── FilterEditor.tsx
│   │   │   │
│   │   │   ├── Preview/         # プレビューエリア
│   │   │   │   ├── PreviewCanvas.tsx
│   │   │   │   ├── PlaybackControls.tsx
│   │   │   │   └── GridOverlay.tsx
│   │   │   │
│   │   │   ├── LayerPanel/      # レイヤー管理
│   │   │   │   ├── LayerPanel.tsx
│   │   │   │   ├── LayerItem.tsx
│   │   │   │   └── LayerControls.tsx
│   │   │   │
│   │   │   └── CodeViewer/      # コードビューア
│   │   │       ├── CodeViewer.tsx
│   │   │       ├── CSSOutput.tsx
│   │   │       └── CopyButton.tsx
│   │   │
│   │   ├── Header/              # ヘッダー
│   │   │   ├── Header.tsx
│   │   │   ├── FileMenu.tsx
│   │   │   └── ExportMenu.tsx
│   │   │
│   │   ├── Presets/             # プリセット管理
│   │   │   ├── PresetLibrary.tsx
│   │   │   └── PresetCard.tsx
│   │   │
│   │   └── App.tsx              # メインアプリコンポーネント
│   │
│   ├── hooks/                   # カスタムフック
│   │   ├── useAnimation.ts      # アニメーション制御
│   │   ├── useTimeline.ts       # タイムライン操作
│   │   ├── useKeyframe.ts       # キーフレーム管理
│   │   ├── useUndo.ts           # アンドゥ/リドゥ
│   │   └── useLocalStorage.ts   # ローカルストレージ
│   │
│   ├── store/                   # 状態管理
│   │   ├── useAnimationStore.ts # アニメーション状態
│   │   ├── useLayerStore.ts     # レイヤー状態
│   │   ├── useUIStore.ts        # UI状態
│   │   └── useProjectStore.ts   # プロジェクト状態
│   │
│   ├── utils/                   # ユーティリティ関数
│   │   ├── cssGenerator.ts      # CSS生成
│   │   ├── keyframeHelper.ts    # キーフレーム操作
│   │   ├── animationHelper.ts   # アニメーション計算
│   │   ├── colorHelper.ts       # 色変換
│   │   ├── transformHelper.ts   # transform変換
│   │   └── validator.ts         # バリデーション
│   │
│   ├── types/                   # TypeScript型定義
│   │   ├── animation.ts         # アニメーション型
│   │   ├── keyframe.ts          # キーフレーム型
│   │   ├── layer.ts             # レイヤー型
│   │   ├── project.ts           # プロジェクト型
│   │   └── index.ts             # 型のエクスポート
│   │
│   ├── constants/               # 定数定義
│   │   ├── presets.ts           # プリセットアニメーション
│   │   ├── defaults.ts          # デフォルト値
│   │   ├── timingFunctions.ts   # タイミング関数定義
│   │   └── shortcuts.ts         # キーボードショートカット
│   │
│   ├── styles/                  # グローバルスタイル
│   │   ├── globals.css
│   │   ├── variables.css        # CSS変数
│   │   └── tailwind.css
│   │
│   ├── assets/                  # アセット
│   │   ├── icons/
│   │   └── images/
│   │
│   ├── main.tsx                 # エントリーポイント
│   └── vite-env.d.ts            # Vite型定義
│
├── tests/                       # テストファイル
│   ├── unit/                    # ユニットテスト
│   ├── integration/             # 統合テスト
│   └── e2e/                     # E2Eテスト
│
├── docs/                        # ドキュメント
│   ├── api/                     # API仕様
│   ├── guides/                  # ユーザーガイド
│   └── architecture/            # アーキテクチャ設計書
│
├── .gitignore
├── package.json
├── tsconfig.json                # TypeScript設定
├── vite.config.ts               # Vite設定
├── tailwind.config.js           # Tailwind設定
├── postcss.config.js            # PostCSS設定
├── README.md
├── SPECIFICATION.md             # 仕様書
└── PROJECT_STRUCTURE.md         # このファイル
```

## 主要ファイルの責務

### コンポーネント層

#### Timeline (タイムライン)
- キーフレームの視覚的表示
- ドラッグ&ドロップによるキーフレーム移動
- 時間軸の制御とズーム機能

#### PropertyPanel (プロパティパネル)
- 選択中のキーフレームのプロパティ編集
- 各CSSプロパティに特化したエディタUI
- 値のリアルタイム更新

#### Preview (プレビュー)
- アニメーションのリアルタイムプレビュー
- 再生コントロール
- グリッド表示やガイドライン

#### LayerPanel (レイヤーパネル)
- 複数要素の管理
- レイヤーの追加/削除/並び替え
- レイヤーごとのアニメーション割り当て

#### CodeViewer (コードビューア)
- 生成されたCSSの表示
- シンタックスハイライト
- コピー機能

### Store層 (状態管理)

#### useAnimationStore
- アニメーション定義の管理
- キーフレームの追加/編集/削除
- アニメーション設定の更新

#### useLayerStore
- レイヤーの管理
- レイヤー順序の制御
- レイヤー選択状態

#### useUIStore
- UI状態の管理（パネルの開閉状態など）
- 再生状態
- ズームレベル

#### useProjectStore
- プロジェクト全体の管理
- 保存/読み込み
- インポート/エクスポート

### Utils層

#### cssGenerator.ts
- アニメーション定義からCSSコードを生成
- プリフィックスの追加
- コードフォーマット

#### keyframeHelper.ts
- キーフレームの並び替え
- 重複検出
- 補間計算

#### animationHelper.ts
- タイミング関数の計算
- アニメーション値の補間
- Web Animations API との連携

### Types層

すべての型定義を集約し、型安全性を保証

## データフロー

```
User Action
    ↓
Component (Event Handler)
    ↓
Store (State Update)
    ↓
Component (Re-render)
    ↓
Preview / CodeViewer (Update)
```

## 命名規則

### ファイル
- コンポーネント: PascalCase (`Timeline.tsx`)
- ユーティリティ: camelCase (`cssGenerator.ts`)
- 型定義: camelCase (`animation.ts`)
- ストア: camelCase with "use" prefix (`useAnimationStore.ts`)

### コード
- コンポーネント: PascalCase
- 関数: camelCase
- 定数: UPPER_SNAKE_CASE
- 型/インターフェース: PascalCase
- プライベート変数: _camelCase (prefix)

## スタイリング規則

- Tailwind CSS を使用した utility-first アプローチ
- コンポーネント固有のスタイルは CSS Modules
- グローバルな変数は `styles/variables.css` で定義
- ダークモード対応を考慮した設計

## テスト戦略

### ユニットテスト
- Utils 層の関数
- カスタムフック
- ストアのロジック

### 統合テスト
- コンポーネント間の連携
- ストアとコンポーネントの統合

### E2Eテスト
- 主要なユーザーフロー
- アニメーション作成から出力まで
