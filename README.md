# 處方小幫手 (Prescription Helper)

一個專為患者設計的處方藥物管理應用程式，提供藥物劑量計算、覆診日期追蹤和檢查清單功能。

## 🎯 功能特色

### 📅 覆診日期計算機
- 設定本次看診日期
- 自訂覆診週數（預設4週）
- 自動計算下次覆診日期（顯示中文格式）

### 💊 藥物清單管理
- 新增/刪除藥物
- 設定藥物名稱、每日劑量、每盒數量
- 自動計算總需求藥量
- 顯示需要領取的盒數+散裝藥丸數
- 添加用藥備註（如飯後服用）

### ✅ 覆診前檢查清單
- 建立待辦事項
- 標記完成狀態
- 刪除已完成項目

### 🎨 個人化設定
- 深色/淺色主題切換
- 字體大小調整（正常/大字體）
- 響應式設計，支援手機/平板/電腦

### 💾 資料持久化
- 所有資料自動儲存至瀏覽器 localStorage
- 一鍵清除所有資料功能

## 🛠️ 技術架構

### 前端技術
- **React 19.1.0** - 現代 React 框架
- **TypeScript** - 型別安全的 JavaScript
- **Vite** - 快速建構工具
- **Tailwind CSS** - 實用優先的 CSS 框架
- **Lucide React** - 現代化圖示庫

### 專案結構
```
prescription-helper/
├── src/
│   ├── components/          # React 元件
│   │   ├── Header.tsx      # 頁首與主題控制
│   │   ├── AppointmentCalculator.tsx  # 覆診日期計算
│   │   ├── MedicationList.tsx        # 藥物清單管理
│   │   ├── Checklist.tsx             # 檢查清單
│   │   └── icons.tsx                 # 圖示元件
│   ├── types.ts            # TypeScript 型別定義
│   ├── App.tsx             # 主應用程式元件
│   ├── index.tsx           # 應用程式進入點
│   └── index.html          # HTML 模板
├── package.json            # 專案設定與依賴
├── tsconfig.json          # TypeScript 設定
├── vite.config.ts         # Vite 建構設定
└── README.md              # 專案文件
```

## 🚀 快速開始

### 環境需求
- Node.js (建議版本 18+)
- bun 套件管理器

### 安裝步驟

1. **複製專案**
   ```bash
   git clone [repository-url]
   cd prescription-helper
   ```

2. **安裝依賴套件**
   ```bash
   bun install
   ```

3. **設定環境變數** (選擇性)
   建立 `.env.local` 檔案：
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **啟動開發伺服器**
   ```bash
   bun dev
   ```

5. **開啟瀏覽器**
   訪問 `http://localhost:5173`

### 建構生產版本

```bash
bun run build
```

建構後的檔案會在 `dist/` 目錄中。

## 📱 使用說明

### 首次使用
1. 設定本次看診日期
2. 調整覆診週數（如4週）
3. 新增藥物並填寫相關資訊
4. 建立覆診前需要完成的檢查項目

### 藥物計算範例
- **藥物名稱**: 血壓藥
- **每日劑量**: 2 顆
- **每盒數量**: 28 顆
- **覆診週數**: 4 週 (28天)
- **計算結果**: 需要 2 盒 (56顆 ÷ 28顆/盒 = 2盒)

### 資料管理
- **自動儲存**: 所有您輸入的資料，包括看診日期、藥物清單和檢查項目，都會自動儲存到您瀏覽器的 `localStorage` 中。這意味著您可以隨時關閉或刷新頁面，而不會遺失資料。
- **裝置獨立**: 資料僅儲存在您當前使用的裝置和瀏覽器上。若更換裝置或瀏覽器，則需重新輸入資料。
- **清除資料**:
  - 您可以透過頁腳的「清除所有資料」按鈕來重置應用程式。
  - 點擊後會彈出一個確認對話框，以防止意外刪除。
  - 確認後，所有已儲存的資料將被永久移除，應用程式將恢復到初始狀態。

## 🌐 部署

### GitHub Pages

本專案已設定好透過 GitHub Pages 自動部署。

#### 部署步驟

1. **安裝依賴套件**
   ```bash
   bun install
   ```

2. **執行部署指令**
   ```bash
   bun run deploy
   ```
   此指令會自動完成以下操作：
   - `bun run build`: 建構生產版本的靜態檔案
   - `gh-pages -d dist`: 將 `dist/` 目錄的內容推送到 `gh-pages` 分支

3. **完成**
   部署完成後，可透過以下網址訪問：
   [https://gnokit.github.io/prescription-helper](https://gnokit.github.io/prescription-helper)

### 其他靜態網站主機
此應用程式為純前端應用，也可部署至任何靜態網站主機，例如：
- Vercel
- Netlify
- Firebase Hosting


## 🔧 開發指南

### 新增功能
1. 在 `types.ts` 中定義新的資料型別
2. 在 `components/` 中建立新元件
3. 在 `App.tsx` 中整合新功能
4. 確保資料持久化到 localStorage

### 樣式客製化
- 使用 Tailwind CSS 類別進行樣式調整
- 支援深色模式自動切換
- 響應式設計已內建

### 國際化支援
目前介面為繁體中文，可透過以下方式支援多語言：
- 建立語言檔案
- 使用 React Context 管理語言狀態
- 動態載入翻譯文字

## 📄 授權

MIT License - 詳見 [LICENSE](LICENSE) 檔案

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來改進此專案！

## 📞 聯絡

如有問題或建議，請透過以下方式聯絡：
- 建立 GitHub Issue
- 發送電子郵件至 [your-email]

---

**處方小幫手** - 讓您的用藥管理更簡單、更安心 📝💊
