function doGet(e){
  return HtmlService.createTemplateFromFile('page').evaluate().setTitle('task');
}

function include(FileName){
 return HtmlService.createHtmlOutputFromFile(FileName)
 .getContent(); 
}
