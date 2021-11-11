import _ from 'lodash';

const passwordField = document.querySelector('input[type="text"]');
const passwordLength = document.querySelector('input[type="number"]');
const inputRange = document.querySelector('input[type="range"]');
const uppercaseLetters = document.getElementById('uppercase-letters');
const lowercaseLetters = document.getElementById('lowercase-letters');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');

const regeneratePasswordButton = document.getElementById('regeneratePassword');
const copyPasswordButton = document.getElementById('copy-password');

const generatePassword = (length) => {
  const passwordCharacters = getCharacterCodes();
  let generatedPassword = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * passwordCharacters.length);
    generatedPassword += String.fromCodePoint(passwordCharacters[index]);
  }

  return generatedPassword;
};

const getCharacterCodes = () => {
  let charCodes = [];
  const codesToRemove = [34, 39, 44, 46, 58, 59, 96, 124];

  for (let i = 33; i <= 125; i++) {
    if (codesToRemove.includes(i)) {
      continue;
    }
    charCodes.push(i);
  }

  if (!uppercaseLetters.checked) {
    let codeToRemove = [];
    for (let i = 65; i <= 90; i++) {
      codeToRemove.push(i);
    }

    charCodes = charCodes.filter((el) => !codeToRemove.includes(el));
  }

  if (!lowercaseLetters.checked) {
    let codeToRemove = [];
    for (let i = 97; i <= 122; i++) {
      codeToRemove.push(i);
    }

    charCodes = charCodes.filter((el) => !codeToRemove.includes(el));
  }

  if (!numbers.checked) {
    let codeToRemove = [];
    for (let i = 48; i <= 57; i++) {
      codeToRemove.push(i);
    }

    charCodes = charCodes.filter((el) => !codeToRemove.includes(el));

    console.log(charCodes);
  }

  if (!symbols.checked) {
    let codeToRemove = [
      33, 35, 36, 37, 38, 40, 41, 42, 43, 45, 47, 60, 61, 62, 63, 64, 91, 92,
      93, 94, 95, 123, 125,
    ];

    charCodes = charCodes.filter((el) => !codeToRemove.includes(el));

    console.log(charCodes);
  }

  return charCodes;
};

function copyPassword() {
  passwordField.select();
  passwordField.focus();
  document.execCommand('copy');
  passwordField.blur();
}

let generatedPassword = generatePassword(Number(passwordLength.value));

passwordField.value = generatedPassword;

passwordLength.addEventListener(
  'change',
  () => (inputRange.value = passwordLength.value)
);

regeneratePasswordButton.addEventListener(
  'click',
  () => (passwordField.value = generatePassword(Number(passwordLength.value)))
);

copyPasswordButton.addEventListener('click', copyPassword);
