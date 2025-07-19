# Test Plan: 處方小幫手 (Manual Verification)

**Objective:** To manually verify all functionalities of the application, ensuring data persistence, UI responsiveness, and the correctness of all calculations and interactions.

**Prerequisites:**
*   Use a modern web browser (e.g., Chrome, Firefox, Safari).
*   For initial tests, use an "incognito" or "private" browsing window to ensure a clean slate with no pre-existing `localStorage` data.
*   Browser developer tools will be needed for testing responsive design.

---

## Part 1: Global Settings & Data Persistence

This section tests the overall app behavior like theme, font size, and data storage.

### Test 1.1: First Load & Initial State
1.  **Action:** Open the application in a new incognito/private browser window.
2.  **Expected Result:**
    *   The app loads with the **light theme**. The moon icon is visible.
    *   The font size is set to **normal**. The smaller "A" button is active.
    *   "本次看診日期" is set to today's date.
    *   "覆診週數" is **4**.
    *   The "我的藥物清單" is empty.
    *   The "覆診前檢查清單" is empty and shows the "沒有待辦事項。" message.

### Test 1.2: Theme & Font Size Switching and Persistence
1.  **Action:** In the header, click the moon icon to switch to dark mode.
2.  **Expected Result:** The entire UI should transition to a dark color scheme. The icon should change to a sun.
3.  **Action:** Click the larger "A" button to switch to large font size.
4.  **Expected Result:** All text in the application (titles, labels, input text) should become noticeably larger. The larger "A" button should be active.
5.  **Action:** Refresh the browser page.
6.  **Expected Result:** The app should reload with the **dark theme** and **large font size** still active, proving the settings were saved to `localStorage`.

### Test 1.3: Clear All Data
1.  **Action:** Add one medication and one checklist item. Change the theme to dark.
2.  **Action:** Scroll to the bottom and click the "清除所有資料" button.
3.  **Expected Result:** A browser confirmation dialog appears with the message: "您確定要清除所有資料嗎？此操作無法復原。".
4.  **Action:** Click "Cancel" on the dialog.
5.  **Expected Result:** Nothing changes. The data (dark theme, medication, checklist item) remains.
6.  **Action:** Click the "清除所有資料" button again, and this time click "OK".
7.  **Expected Result:** The page reloads and resets to its original state, identical to the state in **Test 1.1**.

---

## Part 2: 🗓️ 覆診日期計算機

This section tests the appointment date calculation and persistence.

### Test 2.1: Calculation Logic
1.  **Action:** Set "本次看診日期" to a specific date, e.g., **June 1, 2024**.
2.  **Action:** Set "覆診週數" to **4**.
3.  **Expected Result:** The "下次覆診日期" correctly displays **2024年6月29日 星期六**.
4.  **Action:** Change "覆診週數" to **12**.
5.  **Expected Result:** The "下次覆診日期" updates to **2024年8月24日 星期六**.
6.  **Action:** Change "覆診週數" to **0**.
7.  **Expected Result:** The "下次覆診日期" is the same as the "本次看診日期": **2024年6月1日 星期六**.
8.  **Action:** Try to enter a negative number in "覆診週數".
9.  **Expected Result:** The input value should default to `0`.

### Test 2.2: Data Persistence
1.  **Action:** Set "本次看診日期" to **July 15, 2024** and "覆診週數" to **8**.
2.  **Action:** Refresh the page.
3.  **Expected Result:** The selected date (**2024-07-15**) and week count (**8**) are still in the input fields, and the calculated next appointment date is correct.

---

## Part 3: 💊 我的藥物清單

This section tests all medication-related functionality. For calculations, ensure "覆診週數" is set to **12** (Total Days = 84).

### Test 3.1: Add, Update, and Delete a Medication
1.  **Action:** Click the "新增藥物" button.
2.  **Expected Result:** A new medication form appears with default values (Daily Dosage: 1, Pills per Box: 28, Name and Notes are empty).
3.  **Action:** In the new form, enter the following:
    *   藥物名稱: **Metformin**
    *   每日劑量: **2**
    *   每盒數量: **28**
    *   備註: **Take with meals**
4.  **Expected Result:**
    *   All fields update as you type.
    *   The calculation shows: `共需 168.0 顆 (領藥 84 天)` and `6 盒 + 0.0 顆`.
5.  **Action:** Click the trash icon next to the "Metformin" medication.
6.  **Expected Result:** The medication item is removed, and the list is empty.

### Test 3.2: Calculation Verification (Multiple Medications)
1.  **Action:** Set "覆診週數" to **12**. Add the first medication:
    *   Name: **Aspirin**, Daily Dosage: **0.5**, Pills per Box: **30**, Notes: **Morning**
2.  **Expected Result:** Calculation: `共需 42.0 顆`, `1 盒 + 12.0 顆`.
3.  **Action:** Add a second medication:
    *   Name: **Lipitor**, Daily Dosage: **1**, Pills per Box: **28**, Notes: **Evening**
4.  **Expected Result:** Calculation: `共需 84.0 顆`, `3 盒 + 0.0 顆`. The first medication's data remains unchanged.
5.  **Action:** Go to the Appointment Calculator and change "覆診週數" from **12** to **4** (Total Days = 28).
6.  **Expected Result:** The calculations for both medications update automatically:
    *   Aspirin: `共需 14.0 顆`, `0 盒 + 14.0 顆`.
    *   Lipitor: `共需 28.0 顆`, `1 盒 + 0.0 顆`.
7.  **Action:** Refresh the page.
8.  **Expected Result:** Both medications and the updated week count (4) are present, proving everything was saved.

---

## Part 4: ✅ 覆診前檢查清單

This section tests the checklist functionality.

### Test 4.1: Add, Toggle, and Delete an Item
1.  **Action:** In the checklist section, observe the add button (`+` icon).
2.  **Expected Result:** The button is disabled (grayed out) because the input field is empty.
3.  **Action:** Type "抽血檢查" into the input field.
4.  **Expected Result:** The add button becomes enabled (blue).
5.  **Action:** Click the add button.
6.  **Expected Result:** "抽血檢查" appears in the list below, the input field clears, and the add button becomes disabled again.
7.  **Action:** Add another item: "量血壓".
8.  **Action:** Click the empty box next to "抽血檢查".
9.  **Expected Result:** A checkmark appears, and the text "抽血檢查" gets a line through it.
10. **Action:** Click the checked box again.
11. **Expected Result:** The checkmark and line-through style are removed.
12. **Action:** Click the trash icon next to "量血壓".
13. **Expected Result:** The "量血壓" item is removed from the list.

### Test 4.2: Data Persistence
1.  **Action:** Add an item "領取報告" and check it off.
2.  **Action:** Refresh the page.
3.  **Expected Result:** The checklist still contains "領取報告", and it remains checked, proving its state was saved.

---

## Part 5: Responsive Design

This section tests how the app adapts to different screen sizes.

### Test 5.1: Desktop Browser Resizing
1.  **Action:** On a desktop browser, resize the window from wide to narrow.
2.  **Expected Result:**
    *   The layout should adjust without horizontal scrollbars.
    *   In the header, the "📝💊" emoji next to the title should hide on narrow screens.
    *   In the Appointment Calculator, the date and week inputs should stack vertically on narrow screens.
    *   The font should remain readable.

### Test 5.2: Mobile Device Simulation
1.  **Action:** Open the browser's Developer Tools (F12) and enable the "Device Toolbar" or "Responsive Design Mode".
2.  **Action:** Select a mobile device profile (e.g., "iPhone 12/13 Pro" or "Pixel 5").
3.  **Expected Result:**
    *   The app is fully usable and readable.
    *   Buttons and input fields are large enough to be easily tapped.
    *   There is no horizontal scrolling. The layout is optimized for a single-column view.
    *   The app functions correctly in the simulated mobile environment.
