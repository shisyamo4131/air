/**
 * ページ（URL）毎のPermissionを設定
 * ルート以下のURLを、スラッシュをハイフンに書き換えた文字列をkeyとし、
 * 当該URLへのPermissionを配列で指定する。
 * 配列の要素は文字列で、Authenticationsのroleに設定されるものを使用する。
 * ※roleの設定はCloud Functions
 * 配列が空の場合はすべて許可される。
 */
module.exports = {
  'admin-autonumbers': ['admin', 'developer'],
  'developments-sandbox': ['developer'],
  'developments-models': ['developer'],
  companies: ['admin'],
  'companies-regist': ['admin'],
  'companies-docId': ['admin'],
  'companies-docId-edit': ['admin'],
  members: ['admin'],
  'members-regist': ['admin'],
  'members-docId': ['admin'],
  'members-docId-edit': ['admin'],
}
