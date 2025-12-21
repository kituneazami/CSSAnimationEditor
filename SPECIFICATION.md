# CSSアニメーションエディタ - 仕様書

## 1. プロジェクト概要

### 1.1 目的
CSSアニメーションを視覚的に作成・編集し、実装可能なCSSコードを生成するWebアプリケーション

### 1.2 ターゲットユーザー
- Webデザイナー
- フロントエンドエンジニア
- CSSアニメーション初学者

## 2. 核となる機能

### 2.1 ビジュアルエディタ
- **タイムラインエディタ**
  - キーフレームの視覚的配置
  - ドラッグ&ドロップでのキーフレーム移動
  - 時間軸のズームイン/アウト
  - 複数プロパティの同時編集

- **プロパティパネル**
  - transform (translate, rotate, scale, skew)
  - opacity
  - background-color
  - border-radius
  - width/height
  - filter (blur, brightness, contrast, etc.)
  - その他のアニメーション可能なCSSプロパティ

- **プレビューエリア**
  - リアルタイムプレビュー
  - 再生/一時停止/リセットコントロール
  - ループ再生のトグル
  - 再生速度の調整（0.25x - 2x）
  - グリッド表示のトグル

### 2.2 アニメーション設定

#### 基本設定
- アニメーション名
- 持続時間 (duration)
- タイミング関数 (timing-function)
  - ease, linear, ease-in, ease-out, ease-in-out
  - cubic-bezier カスタム
- 遅延 (delay)
- 繰り返し回数 (iteration-count)
- 方向 (direction): normal, reverse, alternate, alternate-reverse
- 再生状態 (play-state)
- 充填モード (fill-mode)

#### キーフレーム設定
- パーセンテージベースのキーフレーム作成
- 各キーフレームでの複数プロパティ設定
- イージング関数のビジュアル編集

### 2.3 コード生成機能

#### 出力形式
- **CSS @keyframes**
  ```css
  @keyframes animationName {
    0% { ... }
    50% { ... }
    100% { ... }
  }
  ```

- **CSSクラス定義**
  ```css
  .element {
    animation: animationName 1s ease-in-out;
  }
  ```

- **インラインスタイル**
  ```html
  <div style="animation: ..."></div>
  ```

#### コード機能
- シンタックスハイライト
- ワンクリックコピー
- プリフィックス自動付加オプション (-webkit-, -moz-, etc.)
- 最小化/整形オプション

### 2.4 プリセット&テンプレート

#### プリセットアニメーション
- フェードイン/アウト
- スライドイン/アウト（上下左右）
- バウンス
- ズーム
- ローテーション
- シェイク
- パルス
- フリップ

#### カスタムテンプレート
- ユーザー定義アニメーションの保存
- インポート/エクスポート機能（JSON形式）

### 2.5 レイヤーシステム
- 複数要素の管理
- レイヤーの追加/削除
- レイヤーの表示/非表示
- レイヤー順序の変更
- 各レイヤーに個別のアニメーション適用

## 3. UI/UX設計

### 3.1 レイアウト構成
```
┌─────────────────────────────────────────────────────┐
│ ヘッダー（タイトル、保存、読込、エクスポート）      │
├──────────┬────────────────────────┬─────────────────┤
│          │                        │                 │
│ レイヤー │   プレビューエリア     │  プロパティ     │
│ パネル   │   （中央・大きめ）     │  パネル         │
│          │                        │                 │
│          │                        │                 │
├──────────┴────────────────────────┴─────────────────┤
│             タイムラインエディタ                    │
│             （キーフレーム配置）                    │
├─────────────────────────────────────────────────────┤
│          コードビューア（生成されたCSS）            │
└─────────────────────────────────────────────────────┘
```

### 3.2 操作性
- キーボードショートカット対応
  - Space: 再生/一時停止
  - Delete: 選択キーフレーム削除
  - Ctrl+Z/Y: アンドゥ/リドゥ
  - Ctrl+S: 保存
  - Ctrl+C/V: コピー/ペースト

### 3.3 レスポンシブデザイン
- デスクトップ優先設計
- タブレット対応（768px以上）
- モバイルは基本機能のみ提供

## 4. 技術スタック提案

### 4.1 フロントエンド
- **フレームワーク**: React または Vue.js
- **言語**: TypeScript
- **スタイリング**:
  - CSS Modules / Styled Components / Tailwind CSS
- **状態管理**:
  - Redux / Zustand / Pinia (Vueの場合)
- **アニメーション制御**:
  - Web Animations API
  - GSAP (オプション)

### 4.2 エディタ機能
- **コードエディタ**: Monaco Editor / CodeMirror
- **カラーピッカー**: react-color / vue-color
- **ドラッグ&ドロップ**: react-dnd / VueDraggable

### 4.3 ビルドツール
- Vite / Webpack
- PostCSS (Autoprefixer)

## 5. データ構造

### 5.1 アニメーション定義
```typescript
interface Animation {
  id: string;
  name: string;
  duration: number; // ミリ秒
  timingFunction: string;
  delay: number;
  iterationCount: number | 'infinite';
  direction: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode: 'none' | 'forwards' | 'backwards' | 'both';
  keyframes: Keyframe[];
}

interface Keyframe {
  id: string;
  offset: number; // 0-100 (%)
  properties: CSSProperties;
  easing?: string; // キーフレーム間のイージング
}

interface CSSProperties {
  transform?: Transform;
  opacity?: number;
  backgroundColor?: string;
  borderRadius?: string;
  // ... その他のプロパティ
}

interface Transform {
  translateX?: string;
  translateY?: string;
  translateZ?: string;
  rotate?: string;
  rotateX?: string;
  rotateY?: string;
  rotateZ?: string;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  skewX?: string;
  skewY?: string;
}
```

### 5.2 レイヤー定義
```typescript
interface Layer {
  id: string;
  name: string;
  element: HTMLElement | ElementDefinition;
  animation?: Animation;
  visible: boolean;
  locked: boolean;
}

interface ElementDefinition {
  tagName: string;
  className?: string;
  styles?: CSSProperties;
  content?: string;
}
```

### 5.3 プロジェクト定義
```typescript
interface Project {
  id: string;
  name: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  layers: Layer[];
  settings: ProjectSettings;
}

interface ProjectSettings {
  canvasWidth: number;
  canvasHeight: number;
  backgroundColor: string;
  gridEnabled: boolean;
}
```

## 6. 開発フェーズ

### Phase 1: 基本機能（MVP）
- [ ] プロジェクトセットアップ
- [ ] 基本的なUI構築
- [ ] 単一要素のプレビュー
- [ ] タイムラインエディタの基礎実装
- [ ] 基本プロパティ編集（transform, opacity）
- [ ] CSSコード生成

### Phase 2: 拡張機能
- [ ] 複数レイヤー対応
- [ ] プリセットアニメーション
- [ ] インポート/エクスポート
- [ ] アンドゥ/リドゥ機能
- [ ] カスタムイージング関数

### Phase 3: 高度な機能
- [ ] コラボレーション機能
- [ ] クラウド保存
- [ ] アニメーションライブラリ
- [ ] SVGアニメーション対応
- [ ] モーションパス編集

## 7. 非機能要件

### 7.1 パフォーマンス
- 60fps でのスムーズなプレビュー
- 100個以上のキーフレームでも快適に動作
- レスポンス時間 < 100ms

### 7.2 互換性
- モダンブラウザ対応（Chrome, Firefox, Safari, Edge 最新版）
- ES6+対応ブラウザ

### 7.3 アクセシビリティ
- キーボード操作完全対応
- スクリーンリーダー対応（ARIA属性）
- 十分なカラーコントラスト

### 7.4 セキュリティ
- XSS対策
- CSRF対策（API連携時）
- ユーザーデータの暗号化（クラウド保存時）

## 8. 将来的な拡張案

- AI による自動アニメーション生成
- モーションキャプチャデータのインポート
- 物理エンジンとの統合
- 3D CSS アニメーション対応
- アニメーションパフォーマンス分析ツール
- コミュニティギャラリー機能
- プラグインシステム

## 9. 成功指標

- ユーザーが5分以内に最初のアニメーションを作成できる
- 生成されたCSSコードがそのまま実装可能
- 月間アクティブユーザー数の増加
- ユーザー満足度スコア > 4.0/5.0
