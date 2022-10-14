// forms header
const getButton = document.querySelector('#login-button');
const getLogin = document.querySelector('#email-input');
const getPassword = document.querySelector('#password-input');
const trybeUser = 'tryber@teste.com';
const trybePassword = '123456';

// forms main
const formulario = document.querySelector('#evaluation-form');
const getName = document.querySelector('#input-name');
const getLastName = document.querySelector('#input-lastname');
const getEmail = document.querySelector('#input-email');
const getSelect = document.querySelector('#house');
const getTextArea = document.querySelector('#textarea');
const getInputCheckbox = document.querySelector('#agreement');
const getSubmitButton = document.querySelector('#submit-btn');

function checkLogin() {
  const inputName = getLogin.value.trim();
  const inputPassword = getPassword.value.trim();
  if (inputName !== trybeUser || inputPassword !== trybePassword) {
    alert('Email ou senha inválidos.');
  } else {
    alert('Olá, Tryber!');
  }
}
getButton.addEventListener('click', checkLogin);

function checkBox() {
  const checkBoxContent = getInputCheckbox.checked;
  if (checkBoxContent === true) {
    getSubmitButton.disabled = false;
  } else {
    getSubmitButton.disabled = true;
  }
}
getInputCheckbox.addEventListener('input', checkBox);

function countDown(event) {
  const sub = event.target.maxLength - event.target.textLength;
  document.querySelector('#counter').innerHTML = `Máximo de caracteres: ${sub}`;
}
getTextArea.addEventListener('keyup', countDown);

function foundFamily() {
  const family = document.querySelectorAll('.family');
  const selectFamily = [];
  for (let index = 0; index < family.length; index += 1) {
    if (family[index].checked === true) {
      selectFamily.push(family[index].value);
    }
  }
  return selectFamily;
}

function foundDisciplines() {
  const discipline = document.querySelectorAll('.subject');
  const selectDiscipline = [];
  for (let index = 0; index < discipline.length; index += 1) {
    if (discipline[index].checked === true) {
      selectDiscipline.push(` ${discipline[index].value}`);
    }
  }
  return selectDiscipline;
}

function foundEvaluation() {
  const rate = document.querySelectorAll('.rate');
  const selectRate = [];
  for (let index = 0; index < rate.length; index += 1) {
    if (rate[index].checked === true) {
      selectRate.push(rate[index].value);
    }
  }
  return selectRate;
}

getSubmitButton.addEventListener('click', () => {
  const inscription = `Nome: ${getName.value} ${getLastName.value};
  Email: ${getEmail.value};
  Casa: ${getSelect.value};
  Família: ${foundFamily()};
  Matérias: ${foundDisciplines()};
  Avaliação: ${foundEvaluation()};
  Observações: ${getTextArea.value}.`;
  formulario.innerText = inscription;
});
