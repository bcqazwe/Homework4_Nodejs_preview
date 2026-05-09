## Context

目前的系統僅能查詢單一年份的油價趨勢。為滿足使用者對長期趨勢分析的需求，需要將圖表擴展至資料庫中所有的數據點，並依然保持自動標記最高與最低油價的特性。

## Goals / Non-Goals

**Goals:**
- 在單一 Chart.js 圖表中呈現從資料庫最早日期至今的所有 92 無鉛汽油油價趨勢。
- 自動計算並醒目標記出整個歷史期間的最高價（High）與最低價（Low）。
- 提供一個新的 API 端點 `/api/all` 回傳所有排序過的資料。

**Non-Goals:**
- 不在此次變更中加入動態篩選年份的功能（目前專注於「全量」顯示）。
- 不進行資料庫索引優化（目前資料量預期在千筆量級，效能尚可接受）。

## Decisions

1. **API 端點設計 (`/api/all`)**:
   - **Rationale**: 現有的 `/api` 接口依賴 `year` 參數。為了不破壞現有功能並簡化前端調用，新增一個透明的 `/api/all` 接口。
   - **Data Format**: `[{ date, price }, ...]`，其中 `price` 轉換為 Float 類型以便前端處理。

2. **前端數據池處理**:
   - **Rationale**: 在「歷史分析」標籤頁切換時觸發 `fetch('/api/all')`。
   - **Point Highlighting**: 重複利用已有的 Peak Detection 邏輯，但將範圍從單年擴大到整個 dataset。
   - **X-Axis Config**: 設定 Chart.js 的 `ticks.autoSkip: true`，避免大量日期標籤重疊。

3. **圖表樣式**:
   - 移除資料點的預設半徑 (`pointRadius: 0`)，僅在極值點顯現，以維持視覺簡潔。

## Risks / Trade-offs

- **[Risk] 數據量過大導致渲染卡頓**: 
  - *Mitigation*: 設定 `pointHitRadius` 並過濾掉重複的連續相同價格點（或者僅關閉所有非極值點的繪製）。
- **[Risk] 404/Network Error**:
  - *Mitigation*: 已將 `API_BASE` 固定為 `http://localhost:3000` 解決本地端開發環境問題。
