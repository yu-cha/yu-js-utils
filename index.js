const f = {}
const { execSync } = require('child_process')

//jpgのタグの取得
f.タグ取得 = (jpgパス) => {
  const タグ配列 = execSync(`exiftool -Keywords "${jpgパス}"`)
    .toString()
    .replace(/^Keywords\s+: /, '')
    .replace('\n', '')
    .replaceAll(', ', ',')
    .split(',')
  return タグ配列
}

f.タグ追加 = (jpgパス, タグ配列) => {
  const 元タグ配列 = f.タグ取得(jpgパス)
  const フィルタ済タグ配列 = タグ配列.filter(
    (タグ) => !元タグ配列.includes(タグ)
  )
  if (!フィルタ済タグ配列.length) {
    return
  }

  let コマンド = `exiftool -CodedCharacterSet=UTF8 -overwrite_original `
  for (const タグ of フィルタ済タグ配列) {
    コマンド += `-Keywords+=${タグ} -Subject+=${タグ} `
  }
  コマンド += jpgパス
  execSync(コマンド)
}

f.タグ削除 = (jpgパス, タグ配列) => {
  const 元タグ配列 = f.タグ取得(jpgパス)
  const フィルタ済タグ配列 = タグ配列.filter((タグ) =>
    元タグ配列.includes(タグ)
  )
  if (!フィルタ済タグ配列.length) {
    return
  }

  let コマンド = `exiftool -CodedCharacterSet=UTF8 -overwrite_original `
  for (const タグ of タグ配列) {
    コマンド += `-Keywords-=${タグ} -Subject-=${タグ} `
  }
  コマンド += jpgパス
  execSync(コマンド)
}

f.座標指定 = (jpgパス, lat, lng) => {
  execSync(`exiftool -overwrite_original -gpslatitude=${lat} -gpslongitude=${lng} "${jpgパス}"`)
}

module.exports = {
  ...f,
}

