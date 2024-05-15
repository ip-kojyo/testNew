function verySlowFunc(){

   Utilities.sleep(3 * 1000);

  return'Success';//終了時に表示する文字列
  throw new Error('Failuer!');
}

/** ローディング画面に受け渡すためのグローバル変数 */
let loading_cb = '';

/** ローディング画面の呼び出し*/
function beginLoading() {
  // ローディング中に実行する関数をコールバックに指定
  loading_cb = 'verySlowFunc';

  const html = HtmlService
    .createTemplateFromFile('load.html')
    .evaluate();
  SpreadsheetApp.getUi().showModalDialog(html, '重たい処理...');
  console.log('i')
}


/**
 * ローディング画面からのコールバック用関数
 * @param[in] {string} func 呼び出す関数名
 */
function callBack(func) {
  // コールバックテーブル
  const callBackTable = {
    'verySlowFunc': () => verySlowFunc(),
  };

  // コールバック関数実行
  if(callBackTable[func])
    return callBackTable[func]();

  // テーブルに無ければエラー
  throw new Error('no callback');
}