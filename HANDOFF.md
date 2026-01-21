# Student Degree Inquiry System - Project Handoff

## Project Status
**Current Version:** Frontend Complete (Mocked Backend)
**Date:** January 2026

### Overview
This project is a Google Apps Script Web App designed to let students check their exam results by entering their National ID. It consists of a beautiful, responsive frontend (`index.html`) and a Google Apps Script backend (`code.js`).

### architecture
- **Frontend (`index.html`)**: 
  - Single Page Application (SPA) logic.
  - Dynamic subject lists based on Stage (Primary/Prep/Sec) AND Grade (1st, 2nd, etc.).
  - "Glassmorphism" UI design with animations.
  - **IMPORTANT:** Currently contains a "Mock Shim" script block at the top of the file to allow local testing without deployment. This mocks `google.script.run`.

- **Backend (`code.js`)**:
  - `doGet()`: serves the HTML.
  - `getStudentData(stage, grade, nid)`: The main API endpoint. 
  - **CURRENT STATE:** It returns *Mock Data* (randomly generated scores) to simulate a successful database hit. It DOES NOT yet connect to a real Spreadsheet.

## ⚠️ Critical Next Steps (For the Next AI Agent)
The user ("Youssef") will provide an Excel file/Google Sheet later. Your specific task is to replace the mock logic in `code.js` with real SpreadsheetApp logic.

### 1. The Data Contract
The frontend expects a JSON response from `getStudentData` in this mabye format:
```json
{
  "status": "success",
  "nid": "30000000000000",
  "studentName": "Student Name From Sheet",
  "schoolName": "School Name",
  "grade": "الاول الاعدادي",
  "stage": "preparatory",
  "scores": {
    "لغة عربية": 45,
    "رياضيات": 38.5,
    "علوم": 19
    // ... keys MUST match the 'name' property in subjectsData object in index.html
  }
}
```

### 2. Implementation Strategy for Excel/Sheets
When the user provides the file structure:
1. **Open Spreadsheet**: Use `SpreadsheetApp.openById(...)`.
2. **Select Sheet**: Map the `grade` parameter (e.g., "الاول الاعدادي") to a specific Sheet Name.
3. **Find Student**: Search the "ID" column for `nid`.
4. **Map Columns**:
   - The user is worried about column mismatch.
   - **STRATEGY**: Do NOT hardcode indexes (e.g., `row[5]`).
   - Instead, find the Header Row (Row 1), iterate through it to find the index of "Arabic", "Math", etc., and mapped them dynamically.
   - Return the values in the `scores` object shown above.

### 3. Subject Configuration
The master list of subjects is in `index.html` variable `subjectsData`.
- If the Excel file has different headers than the names in `subjectsData`, you must create a mapping dictionary in `code.js` (e.g., `{'Excel Header Name': 'Frontend Name'}`).

## Immediate To-Dos
- [ ] Wait for User to provide Excel/Google Sheet ID.
- [ ] Wait for User to provide Sheet Headers.
- [ ] **Action**: Delete the `generateRandomScore` & Mock Shim logic in `code.js`.
- [ ] **Action**: Write the `SpreadsheetApp` logic to fetch real row data.
