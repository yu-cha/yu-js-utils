// 呼び出される関数。ダイアログを表示し、クローザーを返す。
function showDialog(message) {
  const dialog = document.createElement('dialog')
  dialog.id = "my-dialog"

  const style = document.createElement("style")
  document.head.appendChild(style)
  const sheet = style.sheet
    ;[`#my-dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  }`,
      `#my-dialog {
  background-color: yellow;
  }`].forEach((rule) => sheet.insertRule(rule))

  const div = document.createElement('div')
  div.innerText = message
  dialog.appendChild(div)
  document.body.appendChild(dialog)
  dialog.showModal()
  return () => dialog.close()
}
// // ダイアログを表示する
// const closer=showDialog("タブ移動・他のクロームへの移動　厳禁！")

// // クローザーでダイアログを閉じる
// // setTimeout(closer,2000) //単体で試す時のための例
// closer() //通常は処理が終わった後にこう呼び出せばよい