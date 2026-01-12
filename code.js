function doGet(e) {
  var page = e.parameter.page;

  if (page == "result") {
    return HtmlService.createHtmlOutputFromFile("result")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  return HtmlService.createHtmlOutputFromFile("index")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Fetches student data based on stage, grade, and National ID.
 * Intended to read from a Google Sheet.
 */
function getStudentData(stage, grade, nid) {
  /* 
   * REAL IMPLEMENTATION PLAN:
   * 1. Open the Spreadsheet:
   *    var ss = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID_HERE");
   * 
   * 2. Select the Sheet based on the Grade:
   *    var sheet = ss.getSheetByName(grade);
   *    if (!sheet) return { error: "Sheet not found for this grade" };
   * 
   * 3. Search for the NID in the specific column (e.g., Column B):
   *    var data = sheet.getDataRange().getValues();
   *    // Loop through rows to find NID
   * 
   * 4. Return the row data mapped to subject names.
   */

  // --- MOCK DATA FOR NOW ---
  // This simulates finding a student.

  // Simulate delay
  Utilities.sleep(500);

  // If ID is invalid (just for demo)
  if (!nid || nid.length < 14) {
    return { error: "الرقم القومي غير صحيح" };
  }

  // Create mock scores based on the requested Stage/Grade
  var mockScores = {};

  // We need to know the subjects for this stage/grade to generate scores
  // In a real app, you might just read the columns dynamically.
  // Here, we'll return a generic structure that the frontend will map.

  var names = ["محمد أحمد محمود", "أحمد علي حسن", "يوسف كامل"];
  var randomName = names[Math.floor(Math.random() * names.length)];

  // Return a success object
  return {
    status: "success",
    studentName: randomName,
    schoolName: "الشهيد عمرو شهاب", // This could also come from the sheet
    nid: nid,
    grade: grade,
    stage: stage,
    // Sending a map of "Subject Name" -> Score. 
    // The frontend will match these with its 'subjectsData' config.
    scores: calculateMockScores(stage, grade)
  };
}

function calculateMockScores(stage, grade) {
  var scores = {};

  // Helper to give a random score
  function score(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1).replace('.0', '');
  }

  // Define subjects based on stage (simplified for mock)
  // This mirrors the frontend structure slightly just to provide data

  if (stage === 'primary') {
    scores["لغة عربية"] = score(50, 100);
    scores["رياضيات"] = score(40, 80);
    scores["لغة إنجليزية"] = score(30, 60);
    scores["علوم"] = score(20, 40);
    scores["دراسات"] = score(20, 40);
    scores["تربية دينية"] = score(20, 40);
    scores["تكنولوجيا"] = score(10, 20);
    scores["كت"] = score(10, 20);
  } else if (stage === 'preparatory') {
    scores["عربي"] = score(20, 40);
    scores["انجليزي"] = score(15, 30);
    scores["دراسات"] = score(10, 20);
    scores["جبر"] = score(7.5, 15);
    scores["هندسة"] = score(7.5, 15);
    scores["علوم"] = score(10, 20);
    scores["تربية فنية"] = score(5, 10);
    scores["حاسب آلي"] = score(5, 10);
    scores["تربية دينية"] = score(10, 20);
    scores["مستوى 1"] = score(12.5, 25);
    scores["مستوى 2"] = score(10, 20);
  } else if (stage === 'secondary') {
    scores["لغة عربية"] = score(25, 50);
    scores["أجنبية 1"] = score(25, 50);
    scores["أجنبية 2"] = score(20, 40);
    scores["بحتة"] = score(30, 60);
    scores["تطبيقية"] = score(30, 60);
    scores["فيزياء"] = score(30, 60);
    scores["كيمياء"] = score(30, 60);
    scores["تربية دينية"] = score(10, 20);
    scores["تربية وطنية"] = score(10, 20);
  }

  return scores;
}
