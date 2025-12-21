# デバッグガイド

CSS Animation Editorのデバッグ方法と問題解決のための包括的なガイドです。

## 目次

1. [開発者ツールの使い方](#開発者ツールの使い方)
2. [よくある問題と解決方法](#よくある問題と解決方法)
3. [状態管理のデバッグ](#状態管理のデバッグ)
4. [アニメーションのデバッグ](#アニメーションのデバッグ)
5. [CSSコード生成のデバッグ](#cssコード生成のデバッグ)
6. [コンポーネントのデバッグ](#コンポーネントのデバッグ)
7. [パフォーマンスのデバッグ](#パフォーマンスのデバッグ)

---

## 開発者ツールの使い方

### ブラウザの開発者ツールを開く

- **Chrome/Edge**: `F12` または `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
- **Firefox**: `F12` または `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
- **Safari**: `Cmd+Option+I` (事前に開発メニューを有効化する必要あり)

### Consoleタブの使用

アプリケーションのログやエラーメッセージを確認できます。

```javascript
// Zustandストアの状態を確認
console.log(window.__ZUSTAND_STORES__);

// または開発者ツールのConsoleで直接実行
// 例: アニメーションストアの状態を確認
useAnimationStore.getState()
```

### Elementsタブの使用

1. 要素を右クリック → 「検証」でDOM要素を選択
2. Stylesパネルでアニメーションプロパティを確認
3. Computedパネルで計算されたスタイルを確認

### Networkタブの使用

プロジェクトのインポート/エクスポートの問題をデバッグします。

---

## よくある問題と解決方法

### 1. アニメーションが再生されない

#### 症状
- Playボタンをクリックしてもアニメーションが動かない
- プレビューエリアに要素は表示されるが静止している

#### チェックリスト

**✓ レイヤーにアニメーションが割り当てられているか確認**
```javascript
// 開発者ツールのConsoleで実行
const layers = useLayerStore.getState().layers;
console.log('Layers:', layers);
// 各レイヤーのanimationプロパティがundefinedでないことを確認
```

**✓ isPlayingがtrueになっているか確認**
```javascript
const isPlaying = useUIStore.getState().isPlaying;
console.log('Is Playing:', isPlaying); // trueであるべき
```

**✓ レイヤーが表示状態か確認**
```javascript
const layers = useLayerStore.getState().layers;
console.log('Layer visibility:', layers.map(l => ({ id: l.id, visible: l.visible })));
```

**✓ キーフレームが存在するか確認**
```javascript
const animations = useAnimationStore.getState().animations;
console.log('Animations:', animations);
// keyframesプロパティが空でないことを確認
```

#### 解決方法

1. **レイヤーとアニメーションを再作成**
   - Quick Startボタンをクリックして正しく動作する例を作成
   - または既存のレイヤーにプリセットを適用

2. **手動でアニメーションを割り当て**
   - PropertyPanelでアニメーションを選択し直す
   - またはプリセットライブラリから再適用

3. **ページをリロード**
   - ローカルストレージの状態が破損している可能性
   - `localStorage.clear()`を実行してリセット

### 2. プレビューエリアに何も表示されない

#### チェックリスト

**✓ レイヤーが存在するか確認**
```javascript
const layers = useLayerStore.getState().layers;
console.log('Layer count:', layers.length);
```

**✓ レイヤーのvisibleがtrueか確認**
```javascript
const visibleLayers = layers.filter(l => l.visible);
console.log('Visible layers:', visibleLayers.length);
```

**✓ 要素のサイズが0でないか確認**
```javascript
layers.forEach(layer => {
  console.log(`Layer ${layer.id}:`, {
    width: layer.element.styles?.width,
    height: layer.element.styles?.height
  });
});
```

#### 解決方法

1. LayerPanelで👁️アイコンをクリックしてレイヤーを表示
2. Quick Startボタンでサンプルを作成
3. デフォルト要素のサイズを確認（100x100pxになっているべき）

### 3. CSSコードが生成されない

#### チェックリスト

**✓ アニメーションが存在するか確認**
```javascript
const animations = useAnimationStore.getState().animations;
console.log('Animation count:', animations.length);
```

**✓ キーフレームが正しい形式か確認**
```javascript
animations.forEach(anim => {
  console.log(`Animation ${anim.name}:`, {
    keyframeCount: anim.keyframes.length,
    keyframes: anim.keyframes.map(kf => ({ offset: kf.offset, properties: kf.properties }))
  });
});
```

#### 解決方法

1. アニメーションに最低2つのキーフレームがあることを確認（0%と100%）
2. キーフレームのpropertiesが空でないことを確認
3. CodeViewerパネルが表示されているか確認（下部に表示）

### 4. プロジェクトの保存/読み込みができない

#### チェックリスト

**✓ ローカルストレージが有効か確認**
```javascript
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('LocalStorage: OK');
} catch (e) {
  console.error('LocalStorage: ERROR', e);
}
```

**✓ プロジェクトデータの形式を確認**
```javascript
const project = useProjectStore.getState().project;
console.log('Project:', JSON.stringify(project, null, 2));
```

#### 解決方法

1. プライベートブラウジングモードを無効にする
2. ブラウザの設定でローカルストレージを許可
3. Exportボタンでファイルとして保存（バックアップ）

### 5. タイムラインのキーフレームが操作できない

#### チェックリスト

**✓ アニメーションが選択されているか確認**
```javascript
const selectedAnimationId = useAnimationStore.getState().selectedAnimationId;
console.log('Selected Animation ID:', selectedAnimationId);
```

**✓ レイヤーがロックされていないか確認**
```javascript
const selectedLayer = useLayerStore.getState().getSelectedLayer();
console.log('Layer locked:', selectedLayer?.locked);
```

#### 解決方法

1. LayerPanelでレイヤーを選択
2. レイヤーがロックされている場合は🔓アイコンをクリック
3. アニメーションを選択し直す

---

## 状態管理のデバッグ

### Zustandストアの状態を確認

各ストアの状態を確認するには、開発者ツールのConsoleで以下を実行：

```javascript
// アニメーションストア
const animationState = useAnimationStore.getState();
console.log('Animation Store:', animationState);

// レイヤーストア
const layerState = useLayerStore.getState();
console.log('Layer Store:', layerState);

// UIストア
const uiState = useUIStore.getState();
console.log('UI Store:', uiState);

// プロジェクトストア
const projectState = useProjectStore.getState();
console.log('Project Store:', projectState);
```

### ストアの状態変化を監視

```javascript
// アニメーションストアの変化を監視
const unsubscribe = useAnimationStore.subscribe((state) => {
  console.log('Animation Store updated:', state);
});

// 監視を停止する場合
// unsubscribe();
```

### 状態をリセット

```javascript
// UIストアをリセット
useUIStore.getState().reset();

// すべての状態をクリア（注意：データが失われます）
localStorage.clear();
location.reload();
```

---

## アニメーションのデバッグ

### 動的に生成されたCSSを確認

```javascript
// <style>要素の内容を確認
const styleElement = document.getElementById('animation-preview-styles');
if (styleElement) {
  console.log('Generated CSS:');
  console.log(styleElement.textContent);
} else {
  console.error('Style element not found!');
}
```

### キーフレームの計算を確認

```javascript
import { generateKeyframesCSS } from '@/utils/cssGenerator';

const animation = useAnimationStore.getState().animations[0];
if (animation) {
  const css = generateKeyframesCSS(animation);
  console.log('Generated Keyframes CSS:', css);
}
```

### アニメーションプロパティを確認

ブラウザの開発者ツールで要素を選択し、Computedタブで以下を確認：
- `animation-name`
- `animation-duration`
- `animation-timing-function`
- `animation-delay`
- `animation-iteration-count`
- `animation-direction`
- `animation-fill-mode`
- `animation-play-state`

### タイミング関数のテスト

```javascript
import { applyTimingFunction } from '@/utils/animationHelper';

// 各タイミング関数の出力を確認
const progress = 0.5; // 50%の進行
const timingFunctions = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];

timingFunctions.forEach(tf => {
  const result = applyTimingFunction(progress, tf);
  console.log(`${tf}: ${result}`);
});
```

---

## CSSコード生成のデバッグ

### 生成されたCSSの検証

```javascript
import { generateKeyframesCSS, generateAnimationCSS } from '@/utils/cssGenerator';

const animations = useAnimationStore.getState().animations;
const layers = useLayerStore.getState().layers;

// すべてのアニメーションのCSSを生成
animations.forEach(anim => {
  console.log('=== Animation:', anim.name, '===');
  console.log(generateKeyframesCSS(anim));
});

// すべてのレイヤーのアニメーションCSSを生成
layers.forEach(layer => {
  if (layer.animation) {
    console.log('=== Layer:', layer.name, '===');
    console.log(generateAnimationCSS(layer.animation));
  }
});
```

### Transform/FilterのCSS文字列を確認

```javascript
import { transformToString } from '@/utils/transformHelper';
import { filterToString } from '@/utils/colorHelper';

const transform = {
  translateX: '100px',
  translateY: '50px',
  rotate: '45deg',
  scale: 1.5
};
console.log('Transform CSS:', transformToString(transform));

const filter = {
  blur: '5px',
  brightness: '150%',
  contrast: '200%'
};
console.log('Filter CSS:', filterToString(filter));
```

---

## コンポーネントのデバッグ

### React Developer Toolsの使用

1. [React Developer Tools](https://react.dev/learn/react-developer-tools)をインストール
2. ブラウザの開発者ツールで「⚛️ Components」タブを開く
3. コンポーネントツリーを確認
4. props と state を検査

### コンポーネントの再レンダリングを追跡

```javascript
// コンポーネント内で使用
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    console.log('MyComponent rendered');
  });

  // ...
}
```

### プロップスのログ出力

```javascript
export function PreviewCanvas() {
  const layers = useLayerStore((state) => state.layers);

  console.log('PreviewCanvas - Layers:', layers);
  console.log('PreviewCanvas - Layer count:', layers.length);

  // ...
}
```

---

## パフォーマンスのデバッグ

### レンダリングパフォーマンスの測定

```javascript
// React Developer Toolsの⚙️ Profilerタブを使用
// 1. 「Record」ボタンをクリック
// 2. アプリを操作
// 3. 「Stop」ボタンをクリック
// 4. フレームごとのレンダリング時間を確認
```

### メモリ使用量の確認

```javascript
// 開発者ツールのMemoryタブでヒープスナップショットを取得
// 1. 「Take snapshot」をクリック
// 2. アプリを操作
// 3. 再度スナップショットを取得
// 4. メモリリークを検出
```

### 不要な再レンダリングの検出

React Developer Toolsの設定で「Highlight updates when components render」を有効化すると、再レンダリングされるコンポーネントがハイライトされます。

---

## デバッグ用のユーティリティ関数

開発中に使用できる便利な関数：

```javascript
// window にデバッグ用の関数を追加（開発環境のみ）
if (import.meta.env.DEV) {
  window.debugCSS = {
    // すべてのストアの状態を出力
    dumpStores: () => {
      console.log('=== ANIMATION STORE ===');
      console.log(useAnimationStore.getState());
      console.log('=== LAYER STORE ===');
      console.log(useLayerStore.getState());
      console.log('=== UI STORE ===');
      console.log(useUIStore.getState());
      console.log('=== PROJECT STORE ===');
      console.log(useProjectStore.getState());
    },

    // 生成されたCSSを出力
    dumpCSS: () => {
      const styleElement = document.getElementById('animation-preview-styles');
      console.log('Generated CSS:', styleElement?.textContent || 'None');
    },

    // 選択中のアニメーションを出力
    dumpSelectedAnimation: () => {
      const selected = useAnimationStore.getState().getSelectedAnimation();
      console.log('Selected Animation:', selected);
      if (selected) {
        console.log('CSS:', generateKeyframesCSS(selected));
      }
    },

    // すべてをリセット
    resetAll: () => {
      if (confirm('Reset all data? This cannot be undone.')) {
        localStorage.clear();
        location.reload();
      }
    }
  };

  console.log('Debug utilities available: window.debugCSS');
  console.log('Methods: dumpStores, dumpCSS, dumpSelectedAnimation, resetAll');
}
```

使用例：
```javascript
// 開発者ツールのConsoleで
window.debugCSS.dumpStores();
window.debugCSS.dumpCSS();
window.debugCSS.dumpSelectedAnimation();
```

---

## トラブルシューティングフローチャート

### アニメーションが動かない場合

```
アニメーションが再生されない
  ↓
レイヤーは表示されている？
  ├─ No → LayerPanelで👁️アイコンをクリック
  ↓ Yes
レイヤーにアニメーションが割り当てられている？
  ├─ No → プリセットを適用 or Quick Startを使用
  ↓ Yes
isPlaying が true？
  ├─ No → Playボタンをクリック
  ↓ Yes
キーフレームが2つ以上ある？
  ├─ No → PropertyPanelでキーフレームを追加
  ↓ Yes
CSSが正しく生成されている？
  ├─ No → window.debugCSS.dumpCSS()で確認
  ↓ Yes
ブラウザのアニメーションが有効？
  └─ 設定を確認 / 別のブラウザで試す
```

---

## サポートが必要な場合

1. **ブラウザの情報を確認**
   - ブラウザ名とバージョン
   - OS名とバージョン

2. **エラーログを取得**
   - 開発者ツールのConsoleタブのスクリーンショット
   - エラーメッセージの全文

3. **再現手順を記録**
   - 問題が発生する手順を順番に記録
   - どのボタンをクリックしたか
   - 何が期待される動作で、何が実際に起きたか

4. **状態をエクスポート**
   ```javascript
   // プロジェクトデータをエクスポート
   const data = useProjectStore.getState().exportProject();
   console.log(JSON.stringify(data, null, 2));
   ```

5. **GitHubでIssueを作成**
   - 上記の情報を含めて報告
   - リポジトリ: https://github.com/kituneazami/CSSAnimationEditor

---

## ログ出力のベストプラクティス

### 開発中のログ

```javascript
// 詳細なログ
console.group('🎬 Animation Created');
console.log('Animation ID:', animationId);
console.log('Animation Data:', animation);
console.log('Keyframes:', animation.keyframes);
console.groupEnd();

// 警告
console.warn('⚠️ No layer selected, creating new layer');

// エラー
console.error('❌ Failed to apply preset:', error);

// デバッグ用（本番では削除）
console.debug('🐛 Debug: Layer count:', layers.length);
```

### 条件付きログ

```javascript
const DEBUG = import.meta.env.DEV;

if (DEBUG) {
  console.log('Development mode: Extra logging enabled');
}
```

---

このデバッグガイドを使用して、CSS Animation Editorの問題を効率的に解決できます。問題が解決しない場合は、GitHubリポジトリでIssueを作成してください。
