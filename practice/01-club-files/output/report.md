# 社團檔案整理報告 (Report)

## 一、 整理成果總覽
- **輸入來源**：`practice/01-club-files/input/`（共 12 個檔案）
- **輸出目的地**：`practice/01-club-files/output/`（共 12 個副本，分屬於 4 個分類資料夾）
- **操作原則遵循情況**：
  - [x] 原檔（`input/`）完全未變更、未刪除、未覆蓋。
  - [x] 12 個輸入檔案皆一對一複製到 `output/` 相應分類資料夾中。
  - [x] 內容相同的重複檔案皆各自保留獨立副本。
  - [x] 名稱包含 final / final2 的不同版本檔案全部保留，未擅自認定定稿。
  - [x] 未安裝額外工具、未連外網路、未更動題目範圍外檔案。

---

## 二、 分類結構說明

整理後劃分為 4 個主要工作資料夾：

### 1. `proposals/`（活動企畫與方案，共 4 檔）
- `proposal_final.txt`：企畫第一版（戶外活動，30分鐘，尚未定案）。
- `proposal_final2.txt`：企畫第二版（室內活動，20分鐘，仍待討論）。
- `next_steps.txt`：後續執行步驟（提示比較兩份企畫，勿預設何者通過）。
- `rain_plan.txt`：雨天備案（下雨時討論室內備案再決定）。

### 2. `meetings/`（會議紀錄與回饋，共 2 檔）
- `meeting_notes.txt`：開會討論紀錄（決定下次討論室內或室外方案）。
- `feedback_questions.txt`：活動回饋問卷題綱（提問任務是否清楚與改進建議）。

### 3. `publicity/`（宣傳文宣與公告，共 3 檔）
- `announcement.txt`：活動公告（自備筆記本，時間地點待定）。
- `announcement_copy.txt`：活動公告副本（內容與 `announcement.txt` 完全相同）。
- `poster_text.txt`：海報/小卡文案（邀請大家休息、繪製小卡）。

### 4. `admin/`（行政、預算與物資，共 3 檔）
- `budget_draft.txt`：紙張預算草案（預估紙張預算 100 虛擬單位，非核定支出）。
- `equipment_list.txt`：器材清單（白板筆 4 支、紙張 2 包）。
- `equipment_backup.txt`：器材清單備份（內容與 `equipment_list.txt` 完全相同）。

---

## 三、 疑似重複與版本比對分析

### 1. 內容完全相同（Byte/Hash 相同）之重複檔案
- **公告類**：
  - `announcement.txt` 與 `announcement_copy.txt` 內容與 MD5（`8A382293D766BE1CCC1408F510A2118C`）完全相同。
  - 處理方式：依任務卡要求，兩者皆複製保留於 `publicity/` 目錄。
- **器材類**：
  - `equipment_list.txt` 與 `equipment_backup.txt` 內容與 MD5（`51C6AE39FA9250CD545E74224041F6F5`）完全相同。
  - 處理方式：兩者皆複製保留於 `admin/` 目錄。

### 2. 名稱相近但內容不同之平行版本
- `proposal_final.txt` 與 `proposal_final2.txt`：
  - 兩檔檔名雖標示 final 與 final2，但實質內容互為平行備選方案（一為戶外 30 分鐘，一為室內 20 分鐘）。
  - 依教學指引，不以檔名 `final` 或修改日期判斷定稿，兩者皆完整保留於 `proposals/`。

---

## 四、 待確認問題（需要人員決策之項目）
1. **企畫方案定案**：活動最終採取戶外方案（`proposal_final.txt`）或室內方案（`proposal_final2.txt`）？或是依天氣狀況動態調整？需社團幹部開會決定。
2. **預算核定**：`budget_draft.txt` 提及之紙張預算 100 虛擬單位尚未核定，需確認由何種經費支應。
3. **重複檔案整併時機**：`announcement_copy.txt` 與 `equipment_backup.txt` 是否於後續定稿後進行封存或刪除，需待活動負責人確認。

---

## 五、 實際驗證紀錄與未確認事項

### 實際做過的檢查 (Verified)
- **檔案總數驗證**：`input/` 共 12 檔；`output/` 各分類共複製 12 檔，無遺漏。
- **內容完整性驗證**：逐檔比對 `input/` 與 `output/` 副本之 SHA-256 雜湊值，12 檔全部 100% 一致，檔案無任何損毀或更動。
- **清單對照驗證**：`output/manifest.json` 包含完整 12 筆對照紀錄（source、destination、reason）。

### 還沒確認的部分 (Unverified)
- 社團幹部尚未就企畫定案（戶外 vs 室內）做出最後裁決。
- 預算尚未經過實際審核流程。
