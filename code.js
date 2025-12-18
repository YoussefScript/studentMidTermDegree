function doGet(e) {
  var page = e.parameter.page;

  if (page == "result") {
    return HtmlService.createHtmlOutputFromFile("result")
            .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  return HtmlService.createHtmlOutputFromFile("index")
          .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
