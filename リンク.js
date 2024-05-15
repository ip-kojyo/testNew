function myAllSName(){//シートから会社名を取得してリンク着けて貼り付け
const sh = SpreadsheetApp.getActiveSpreadsheet();
//const sheets = sh.getSheets();
const sheets = getSN();
const url = sh.getUrl();
Logger.log(sheets.length)
if(sheets.length>0){  
Logger.log(sheets);
let hLinks=sheets.map(sheet =>{
let sheetUrl=url+'#gid='+sh.getSheetId();
let hLink='=HYPERLINK("'+sheetUrl+'","'+sheet.getName()+'")';
return([hLink]);})
let sheet4 =sh.getSheetByName('一覧');
let lastRow= sheet4.getLastRow();

sheet4.getRange(lastRow+1,1,hLinks.length).setValues(hLinks);//一覧の最後に貼り付け


}}
function getSN () {//シート名と一覧を比較して無い名前を
    const seet3 = getActiveSpreadsheet('一覧');//一覧の会社名をget
    const lastRow = seet3[1].getLastRow();
    const setName = seet3[1].getRange(2, 1, lastRow).getValues();
    const sName = seet3[0].getSheets();//会社名シートから会社名をget
    // Logger.log(setName);
    let SNs = sName.map(sheet => {
      let SN = sheet.getName();
      return [SN];
    });
    let sNs2 = SNs.splice(4, SNs.length);//会社名じゃないのをカット
    let res = sNs2.filter(e => {//一覧にないシートを見つける
      return setName.filter(f => { return e.toString() == f.toString(); }).length == 0;
    });
    let resSheet = res.map(bb => {
      let resST = seet3[0].getSheetByName(bb);
      return resST;
    });
    Logger.log(resSheet);
    Logger.log(res);
    return resSheet;
  }