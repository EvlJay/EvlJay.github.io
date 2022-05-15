const charSlide = document.getElementById('charSlide')
const charTot = document.getElementById('charTot')
const inclUpElement = document.getElementById('inclUp')
const inclNumElement = document.getElementById('inclNum')
const inclSpecElement = document.getElementById('inclSpec')
const form = document.getElementById('pwdForm')
const pwdDisp = document.getElementById('pwdDisp')

// ^ Set Constants and grab elements

const charUp = arrASCII(65, 90)
const charLow = arrASCII(97, 122)
const charNum = arrASCII(48, 57)
const charSpec = arrASCII(33, 47).concat(
  arrASCII(58, 64)
).concat(
  arrASCII(91, 96)
).concat(
  arrASCII(123, 126)
)

// ^ Set characters to be used >> Array

// ^^ These include listed non-alphanumeric characters, however
// any Unicode character that is categorized as an alphanumeric
// character but is not UC or LC ( ex: ⓒ ) can be used.  This
// includes Asian language Unicode as well. This complete list
// (including ALU) has not been included as the current options
// use standard EN keyboard keys and do not require any Unicode
// knowledge or use of ALT codes to enter.

charTot.addEventListener('input', syncCharacterAmount)
charSlide.addEventListener('input', syncCharacterAmount)

form.addEventListener('submit', e => {
  e.preventDefault()
  const characterAmount = charTot.value
  const inclUp = inclUpElement.checked
  const inclNum = inclNumElement.checked
  const inclSpec = inclSpecElement.checked
  const password = generatePassword(characterAmount, inclUp, inclNum, inclSpec)
  pwdDisp.innerText = password
})

// ^ setting listeners for slider, input box, checkboxes and button

function generatePassword(characterAmount, inclUp, inclNum, inclSpec) {
  let charCodes = charLow
  if (inclUp) charCodes = charCodes.concat(charUp)
  if (inclSpec) charCodes = charCodes.concat(charSpec)
  if (inclNum) charCodes = charCodes.concat(charNum)

  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  return passwordCharacters.join('')
}

// ^ creates password by running through as many times as set by
// characterAmount until satisfied.  

function arrASCII(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array
}

// display generated password in window

function syncCharacterAmount(e) {
  const value = e.target.value
  charTot.value = value
  charSlide.value = value
}

// ^ sync the text input box to match the slider when adjusted