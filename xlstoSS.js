
function fileOpen_getsheet(id='12HNGoFdiio8HFlo4jQeyO7MD190NVJ9bYNmntgpjhlw'){
  let ss = SpreadsheetApp.openById(id);
  let sheets = ss.getSheets();
  //let sheetN = [];
  // for(let value of sheets){
   // let [sheetName]= value;
    //sheetN.push({
      //sheetName:sheetName,
    //});
   //}
   console.log(sheets);
}

