# 器材清理問題報告

教學模擬記錄；不推論哪個人弄錯。

- 原始列數：10。
- 保留有效列數：9（指非空列，仍可能含有資料問題）。
- 移除列數：1；第 6 筆為空物件，沒有 source_row。
- 文字欄位去除前後空白；qty 原樣保留；source_row 保留。
- available／可借／可出借 → available；borrowed／借出 → borrowed；其他 → unknown。

## 相同 ID 全部保留

| item_id | source_row | 相同欄位（清理後） | 衝突欄位 |
|---|---|---|---|
| EQ01 | 1、4 | name、qty=4、status=available | 無；source_row 不同，兩筆都保留 |
| EQ02 | 2、5 | name、status=borrowed | qty：來源列 2 為 2，來源列 5 為 3；不猜哪筆正確 |

## 未確認值

- source_row 7、EQ04：qty 為空字串，原樣保留，不補 0。
- source_row 8、EQ05：qty 為 -1，原樣保留，不取絕對值。
- source_row 9、EQ06：原狀態「待盤點」無法對應，標為 unknown，待確認。
- source_row 10、EQ07：qty=0 是合法非負整數，保留。

未合併或刪除任何相同 item_id；不依品名推定同一件器材。原始 equipment.json 未修改。
