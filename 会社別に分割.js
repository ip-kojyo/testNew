function splitsheet(Seet,Co) {//シート1から各会社シートに振り分け
  //const Seet =getActiveSpreadsheet(SN)
  const records = Seet[1].getDataRange().getValues();
  const header = records.shift();
  const newRecord = records.filter(record=>record[4]===Co);
  newRecord.unshift(header);
  sheet=Seet[0].getSheetByName(Co);
  Logger.log(newRecord)
  sheet.getRange(1,1,newRecord.length,newRecord[0].length).setValues(newRecord);

}
