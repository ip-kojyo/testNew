function getActiveSpreadsheet(SheetName) {//取得したいシート名をいれる

  //アクティブなスプレッドシートを取得
 let ss = SpreadsheetApp.getActiveSpreadsheet();
 //アクティブシートを取得
 let sheetn = ss.getSheets();
 //シート名を取得
 let sheet =ss.getSheetByName(SheetName);
 let sheets =[ss,sheet,sheetn]
 return sheets
}
function main(){
  let set1=getActiveSpreadsheet('一覧');
//let aa=set1[2].getSheetName()
  Logger.log(set1)
}
