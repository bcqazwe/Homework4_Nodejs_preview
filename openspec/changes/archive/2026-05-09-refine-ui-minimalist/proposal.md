## Why

現有的油價管理系統介面較為陽春，且缺乏良好的使用者體驗。為了讓使用者能更直觀、專業地查看與管理中油油價數據，我們需要優化前端 UI，採用簡約且資訊階層分明的設計。

## What Changes

- 優化 `public/index.html` 的 UI 結構，採用專業的簡約風格設計。
- 引入側邊導航或清新頁籤（Tabs）將「資料錄入」與「歷史查詢」功能分離。
- 使用高品質的表格樣式（如斑馬紋、Hover 效果）顯示油價資料。
- 改善表單輸入體驗，提供更清晰的標籤與回應回饋。
- 確保 UI 在不同設備上的基本響應性。

## Capabilities

### New Capabilities
- `ui-minimalist`: 提供專業且簡約的油價管理與查詢介面，優化使用者錄入與數據閱讀體驗。

### Modified Capabilities
<!-- 無 -->

## Impact

- `public/index.html`: 主要修改文件，進行 UI 結構與腳本逻辑優化。
- `public/stylesheets/style.css`: 更新樣式定義以符合簡約風格。
