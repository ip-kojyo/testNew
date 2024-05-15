function sheetcopy() {//シート1を会社別に分割
 //シート名を取得
 const Seet =getActiveSpreadsheet('シート1')
 const Seet2 =getActiveSpreadsheet('会社別元シート')
 //最終行数
 const lastRow= Seet[1].getLastRow();

 const value= Seet[1].getDataRange().getValues();//読み込むシートの全データ取得
 const colm1=rowSelect(0,lastRow,value);//日付ID取得
 const colm4= rowSelect(4,lastRow,value);//会社名取得
 //Logger.log(colm1);
 colm4.forEach(function(name){//シートを複製して会社名に変える
  let seetName = Seet[0].getSheetByName(name);
 
    if(seetName===null){//重複がなければシートコピー
     let sheetCopy =Seet2[1].copyTo(Seet[0]);
     sheetCopy.setName(name);
     splitsheet(Seet,name);//会社別に分割
     //Logger.log(name);
    }  
 });

 const seet3 =getActiveSpreadsheet('一覧')//一覧シートの年月IDを取得
 const lastcol=seet3[1].getLastColumn();
 let setName=seet3[1].getRange(1,1,1,lastcol).getValues();
 //Logger.log(setName)   

 colm1.forEach(function(name){//年月IDを取得して貼り付け
    name = name.toString();
    setName = setName.toString();
  if (!setName.includes(name)){//重複削除
    let lastcol=seet3[1].getLastColumn()+1;
    seet3[1].getRange(1,lastcol).setValue(name);
  };
 //Logger.log(newset);
 });
}

function rowSelect(col1,lastRow,value){//行から重複除外して取り出す
 let value1 = [];
   for(let i=1;i<lastRow;i++){
       value1.push(value[i][col1]); //列を指定して取り出し 
   }
   let result2=[...new Set(value1)];//重複除外
return result2
}
 //1次配列で取り出す
 //let list = value.reduce((pre,current) =>{pre.push(...current);return pre},[]);
 //newsetで重複削除
 //let result=[...new Set(list)];
 //let results = result.length;