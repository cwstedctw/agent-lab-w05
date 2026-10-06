# 實作紀錄（Agent 實跑）

日期：2026-10-06（Asia/Taipei）。
來源：[NDHU Campus Agent Lab](https://ndhu-campus-agent-lab.tedc.chatgpt.site/)，網站版本 2026-09-10。

- 組別代碼：待使用者填寫；不填真名或學號。
- 工具：Codex、PowerShell、Node.js、Git。未安裝額外套件。
- 路線：Agent 本機實作；使用者是否個人／雙人操作未提供。
- 素材：東華課堂版虛構教學資料。沒有使用 fallback 預生成模擬作為成功證據。
- 完成產出：A 已存在並重新核對；B 單頁工具與 v2；C 選做資料清理；D 退回訊息。
- 角色：Agent 建檔、核對、測試和整理紀錄。下列測試不能冒充使用者親自驗收。

## 範圍與計畫

只處理此 repo 的 practice 各題資料夾及 evidence。原始 input、activities.json、equipment.json、bad-plan.txt 保留。A 只核對既有輸出；B 所有資料及程式內嵌 output/index.html；C 另存 normalized.json 和 issues.md；D 只討論錯誤計畫，沒有執行它。

原始需求：使用者要求執行 Task B，確認計畫後製作，之後要求完成全部題目。使用者已要求提交及推送 Task B；完成剩餘題目沿用此交付流程。

動手前閱讀專案 36 個非 Git 檔案、網站題目、資料欄位及 Git 狀態。origin 為 cwstedctw/agent-lab-w05，沒有整理 Downloads、刪除重複檔或安裝工具。

## 實際測試

測試程式：`task-b-tests.cjs`、`task-ac-checks.cjs`；輸出：`task-b-test-results.txt`、`task-ac-test-results.txt`。

| 測試 | 預期 | 實際 | 證據 |
|---|---|---|---|
| A 副本 | 12 個輸入都有相同內容的副本 | manifest 12 筆全部逐位元組相同 | task-ac-test-results.txt |
| B 室內／15／低 | 僅 A01–A04 | 候選集合精確相同，20 次抽選都在集合內 | task-b-test-results.txt |
| B 室外／15／中 | 無結果，不放寬條件、不加紀錄 | 顯示無符合提示；條件與歷史未變 | 同上 |
| B 室外／30／中 | 只能 A09 | 10 次都為 A09 | 同上 |
| B 不限／60／不限抽 6 次 | 最近 5 筆，最新在前 | 內容及順序對上實際抽選序列 | 同上 |
| B 重設 | 不限／30／不限，歷史保留 | 三個預設值和原歷史相同 | 同上 |
| B 清除並切英文 | 清空歷史、介面及活動英文化 | 所有 data-text 字串及活動名稱檢查通過 | 同上 |
| B v2 計數 | 無符合 0、室內15低 4、預設 9，支援中英文 | 篩選、語言及重設更新通過，歷史保留 | 同上 |
| C 列數 | 10 → 9，只移除空列 | 第 6 筆空物件移除，source_row 保留 | task-ac-test-results.txt |
| C 重複與問題值 | 重複全部保留，qty 不補值 | EQ01/EQ02 各保留 2 筆；所有 qty 與來源一致；unknown 已指出 | 同上 |

B 使用 Node VM 加最小 DOM 替身執行 HTML 中的實際程式，驗證邏輯、事件與文字輸出；沒有執行真實瀏覽器排版。20 次抽選不能證明隨機機率公平。A/C 測試讀取實際檔案；A/C 檢查腳本也會重建 C 的衍生輸出。

## 一次修改

B 第一個 Git 版本：d261201（B v1: activity picker）。該 commit 已含先前新增的鍵盤焦點 CSS，因此不把焦點外框當作 Git v1→v2 的差異。

- 原來：只有抽選結果，無法即時看見符合條件的活動數。
- 修改：新增中英文符合條件數，篩選變更、語言切換、重設後即時更新。
- 驗法：室外15中顯示 0，室內15低顯示 4，重設顯示 9；切換中英文計數文字更新，歷史保持。
- 結果：新測試及六組既有行為測試全部通過。
- 分類：新增使用性需求，非原規格缺陷。
- 修改前證據：Git commit d261201；修改後：B v2 commit 與可重跑測試。

## 一次退回

見 ../practice/04-review/my-rejection.md。退回超範圍整理 Downloads、刪除重複檔、依 final2 猜定稿、猜缺值、自動公開。替代：限題目範圍、另存完整副本、保留不確定值、列問題、交付成果供確認。沒有執行 bad-plan.txt。

## 尚未驗證／待使用者完成

- 實際瀏覽器畫面、手機排版與鍵盤焦點視覺效果未驗收。瀏覽器安全政策禁止此次工具開啟 file:// 本機頁面；未繞過限制。
- 沒有本機頁面或 TM 截圖，不提供偽造截圖。請使用者雙擊 index.html，完成六組人工測試及截圖；只截本題，不露帳號或私人資料。
- 組別代碼、個人／雙人路線、使用者自己的角色與實際檢查須自行填寫。
- 本紀錄在本機撰寫，沒有聲稱從網站自評匯出，也沒有代勾使用者親自完成的驗收。
- 教師繳交方式和期限未提供；沒有代交課程作業或登出使用者帳號。

## 重跑方式

在 repo 根目錄執行：

```text
node evidence/task-b-tests.cjs
node evidence/task-ac-checks.cjs
```

## 已保留並推送的版本

- A：6cc5898 — A: organize club files。
- B v1：d261201 — B v1: activity picker。
- B v2：0e101a4 — B v2: show matching activity count。
- C：a4775af — C: normalize equipment records。
- D：767fb02 — D: rejection。

保留全部 commit 歷史，未 squash、未 amend、未 force push。紀錄與測試檔另行提交。
