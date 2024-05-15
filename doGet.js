
function include(FileName){
 return HtmlService.createHtmlOutputFromFile(FileName)
 .getContent(); 
}

function showDialog(){
  const output =HtmlService.createTemplateFromFile(`index`);
  const ss=SpreadsheetApp.getActiveSpreadsheet();
  output.formHTML=getforHTML();
  output.verySlowFunk=verySlowFunc();
 
  const html=output.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME)
             .setWidth(500)
             .setHeight(500)
             .setTitle(`確認画面`);
  ss.show(html);
}

function getforHTML(alert = '') {
  let html = `
    <p class="text-danger">${alert}</p>
    <table>
    `;
  const items = getFileNameId(); // 供給フォルダ内のファイル呼び出し
  for (const item of items) {
    const itemname = item['name'];
    const itemurl = item['url'];
    const itemid = item['id'];

    html += `<tr><td><label class="label">${itemname}:</label></td>`;
    html += `<td><button class="btn" name="${itemname}" id="${itemid}" onclick="handleButtonClick('${itemid}')">選択</button></td></tr>`;
  }
  html += `</table>`;
  function handleButtonClick(id) {
    // ボタンを押したときの処理を記述
    console.log(`ボタンが押されました。ID: ${id}`);
  }
  return html;

}
function convertExcelToGsheet(folderId,excelFileObj){//エクセルをスプ氏に変換
  let convertInfo = {
    title: `mySheet`,//変換後の名前
    mimeType: MimeType.GOOGLE_SHEETS,//変換後のタイプ
    parents: [{id: folderId}],//作成先フォルダ
  };
  
  let res = Drive.Files.insert(convertInfo, excelFileObj.getBlob());

  return res.id;//作成ファイルのIDを返す
}

function makeSS(id){//受け取ったIDの処理
  showLoader(); // ローディング画面を表示
  let folderId = '1W2GSj-C2YAFSbY53VD4nqFZWp03wWRin';//作成先フォルダ
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(1,1).setValue(id);
  let excelFileObj=DriveApp.getFileById(id);//エクセルファイル取得
  let newid=convertExcelToGsheet(folderId,excelFileObj);
  hideLoader();// ローディング画面を非表示
  Logger.log(newid);
  
}

function getFileNameId(){//読み込み先のファイル検索
  let rofolder = '1-2sVD8ti52LlvFEIp4fJeBmrPAtO4Bt7'//読み込み先のフォルダID
  let roadfolderid =listFilesInFolder(rofolder)
  Logger.log(roadfolderid)
  return(roadfolderid);
}

function listFilesInFolder(roadfolder) {//読み込み先ファイルの三点ゲット
  const folderId = roadfolder// ここにフォルダIDを入力します。
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();
  let fileName = [];
  while (files.hasNext()) {
    const file = files.next();
    let name=file.getName();//ファイル名
    let url=file.getUrl();//ファイルURL
    let id=file.getId();//ファイルID
    fileName.push({
      name:name,
      url:url,
      id:id
    });
   // console.log(fileName['id']);
  }
  return(fileName);
}
