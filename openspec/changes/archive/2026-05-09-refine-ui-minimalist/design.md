## Context

目前 `public/index.html` 將新增與查詢功能混雜在同一個頁面流中，缺乏視覺分層。`public/stylesheets/style.css` 目前內容較為簡單，無法支撐專業且現代的介面需求。

## Goals / Non-Goals

**Goals:**
- 將 UI 重構為分頁（Tabs）或區塊化結構。
- 優化 CSS，使用更現代的字體、間距與配色。
- 提升數據表格的可讀性（斑馬紋、Hover）。
- 優化前端互動邏輯，確保與現有 API 無縫銜接。

**Non-Goals:**
- 不引入重型前端框架（如 React, Vue），維持純 HTML/JS/CSS。
- 不改變後端 API 的 Request/Response 格式。
- 本次設計不包含圖表化（方案 B）的實作。

## Decisions

### 1. 介面結構：Tabs 切換
- **決策**: 使用隱藏/顯示（CSS `display: none`）的方式實作 Tab 切換。
- **理由**: 在不引入前端路由的情況下，這是最輕量且保證 SEO 的做法，且適合工具型單頁應用。

### 2. 配色方案：中油專業感
- **決策**: 主要配色使用 `#0059b3`（中油藍）搭配背景 `#f8f9fa`（淺灰）。
- **理由**: 與中油品牌視覺相近，且淺灰色背景能減少長時間閱讀數據的視覺疲勞。

### 3. 表格組件：自定義 CSS 表格
- **決策**: 不使用第三方表格插件，直接透過原生的 `<table>` 配合 CSS `nth-child(even)` 與 `hover` 選取器實作。
- **理由**: 資料量較小且不需要複雜的過濾與排序，原生實作最快且維護成本最低。

## Risks / Trade-offs

- **[Risk]** 原生 CSS 可能在極舊設備上表現不一 → **Mitigation**: 採用標準的 Flexbox 與常用的 CSS 屬性，確保基礎兼容性。
- **[Risk]** 頁面跳轉感喪失 → **Mitigation**: 實作平滑的 Tab 切換動畫或簡單的漸變效果。
