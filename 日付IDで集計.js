function ymTotal(){//これは使わない予定
  const SS =SpreadsheetApp.getActiveSpreadsheet().getSheets();
   const sheetLen = SS.length;
   const Seet =getActiveSpreadsheet('一覧')
  //B,シート名を1つずつ取得
  for(var i=4; i<sheetLen; i++){
    let name=SS[i].getSheetName();
    console.log(name)
    let ymIdPrice=totalling(name)
    console.log(ymIdPrice)
    ymIdPrice.forEach(function(yp){
      console.log(yp['ymID']);
    let posi=position(name,yp['ymID']);
     console.log(posi[0]);
     console.log(posi[1])
    //if()
    let a=(posi[0]+2);
    let b=(posi[1]+1);
    
    Seet[1].getRange(a,b).setValue(yp['price'])
    });
  }

  
}




function position(copname,ymID){
 const Seet =getActiveSpreadsheet('一覧')
 let datR = Seet[1].getRange(2,1,Seet[1].getLastRow()).getValues().flat();
 let datarow = datR.indexOf(copname);
 let datC = Seet[1].getRange(1,2,1,Seet[1].getLastColumn(),).getValues().flat();
 let datacolm = datC.indexOf(ymID);
 
 let position =[datarow,datacolm];

  return position;
}

function getValues(sheetname) {
   const seet =getActiveSpreadsheet(sheetname)//一覧の会社名をget
   let values = seet[1].getDataRange().getValues();
   values.shift();
   const invoice = [];
   
   for(const value of values){
    const [ymID,mmdd,type,model,co,rem1,rem2,proname,price,unit,num]= value;
    invoice.push({
      ymID:ymID,
      mmdd:mmdd,
      type:type,
      model:model,
      co:co,
      rem1:rem1,
      rem2:rem2,
      proname:proname,
      price:price,
      unit:unit,
      num:num
    });
   }
 //console.log(invoice);
 return(invoice);
 }

 function totalling(copname){
 const invoice=getValues(copname);
 const groupby = invoice.reduce((acc,cur)=>{
  const found = acc.find(value=>value.ymID===cur.ymID);
  if(found){
    found.price+=cur.price;
  }else{
    acc.push({
      ymID: cur.ymID,
      price: cur.price,
   });
  }
  return acc;
 },[]);
 //console.log(groupby);
 return groupby;
}
