const f = {}
const { execSync } = require('child_process')

//jpg$B$N%?%0$N<hF@(B
f.$B%?%0<hF@(B = (jpg$B%Q%9(B) => {
  const $B%?%0G[Ns(B = execSync(`exiftool -Keywords "${jpg$B%Q%9(B}"`)
    .toString()
    .replace(/^Keywords\s+: /, '')
    .replace('\n', '')
    .replaceAll(', ', ',')
    .split(',')
  return $B%?%0G[Ns(B
}

f.$B%?%0DI2C(B = (jpg$B%Q%9(B, $B%?%0G[Ns(B) => {
  const $B85%?%0G[Ns(B = f.$B%?%0<hF@(B(jpg$B%Q%9(B)
  const $B%U%#%k%?:Q%?%0G[Ns(B = $B%?%0G[Ns(B.filter(
    ($B%?%0(B) => !$B85%?%0G[Ns(B.includes($B%?%0(B)
  )
  if (!$B%U%#%k%?:Q%?%0G[Ns(B.length) {
    return
  }

  let $B%3%^%s%I(B = `exiftool -CodedCharacterSet=UTF8 -overwrite_original `
  for (const $B%?%0(B of $B%U%#%k%?:Q%?%0G[Ns(B) {
    $B%3%^%s%I(B += `-Keywords+=${$B%?%0(B} -Subject+=${$B%?%0(B} `
  }
  $B%3%^%s%I(B += jpg$B%Q%9(B
  execSync($B%3%^%s%I(B)
}

f.$B%?%0:o=|(B = (jpg$B%Q%9(B, $B%?%0G[Ns(B) => {
  const $B85%?%0G[Ns(B = f.$B%?%0<hF@(B(jpg$B%Q%9(B)
  const $B%U%#%k%?:Q%?%0G[Ns(B = $B%?%0G[Ns(B.filter(($B%?%0(B) =>
    $B85%?%0G[Ns(B.includes($B%?%0(B)
  )
  if (!$B%U%#%k%?:Q%?%0G[Ns(B.length) {
    return
  }

  let $B%3%^%s%I(B = `exiftool -CodedCharacterSet=UTF8 -overwrite_original `
  for (const $B%?%0(B of $B%?%0G[Ns(B) {
    $B%3%^%s%I(B += `-Keywords-=${$B%?%0(B} -Subject-=${$B%?%0(B} `
  }
  $B%3%^%s%I(B += jpg$B%Q%9(B
  execSync($B%3%^%s%I(B)
}

module.exports = {
  ...f,
}

