function myFunction() {//ピボットテーブルで会社別に集計
 const ss=SpreadsheetApp.getActiveSpreadsheet();
 const dataSheet=ss.getSheetByName('シート1');//元シート
 const pivotSheet=ss.getSheetByName('シート5');//先シート
 const dataSource=dataSheet.getDataRange();
 //ピボットテーブルの作成
 const pivotTable=pivotSheet.getRange('A1').createPivotTable(dataSource);

 let itemGroup=pivotTable.addRowGroup(5);
 itemGroup=pivotTable.addColumnGroup(1);
 itemGroup.showTotals(false).sortAscending;
 itemGroup.showRepeatedLabels();
 let pivotvale=pivotTable.addPivotValue(9,SpreadsheetApp.PivotTableSummarizeFunction.SUM);
 pivotvale.setDisplayName('合計金額');
 pivotSheet.setFrozenRows(2);
 pivotSheet.setFrozenColumns(1);
}
