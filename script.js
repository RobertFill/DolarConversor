const valorReal = document.getElementById('real-value');
const valorDolar = document.getElementById('dolar-value');
const valorEuro = document.getElementById('euro-value');

const btnConversor = document.getElementById('btn');
const btnClear = document.getElementById('clear');

const textMoneyFormat = document.getElementById('Dolar-text'); //change name format region//

const resultBRL = document.querySelector('.valorResultBRL');
const resultUSD = document.querySelector('.valorResultUSD');
const resultEUR = document.querySelector('.valorResultEUR');
const resultBRLE = document.querySelector('.valorResultBRLE');

const btnUSD = document.getElementById('USD');
const btnEUR = document.getElementById('EUR');
const btnBRLE = document.getElementById('BRLE'); // buttons change Region //
const btnBRL = document.getElementById('BRL');

btnUSD.addEventListener('click', () => {
  showValueInputDolar('Real:');
  showResult(resultUSD);
  hideResult(resultBRL, resultEUR, resultBRLE);
});

btnEUR.addEventListener('click', () => {
  showValueInputEuro('Real:');
  showResult(resultEUR);
  hideResult(resultUSD, resultBRL, resultBRLE);
});

btnBRLE.addEventListener('click', () => {
  showValueInputRealEuro('Euro:');
  showResult(resultBRLE);
  hideResult(resultUSD, resultBRL, resultEUR);
});

btnBRL.addEventListener('click', () => {
  showValueInputReal('Dólar:');
  showResult(resultBRL);
  hideResult(resultUSD, resultEUR, resultBRLE);
});

btnConversor.addEventListener('click', async (event) => {
  event.preventDefault();
  await convertValueBRL();
  await convertValueUSD();
  await convertValueEUR();
  await convertValueBRLE();

  resetInput('real-value')
  resetInput('dolar-value')
  resetInput('euro-value')
});

btnClear.addEventListener('click', () => {
  clearResults();
});

async function convertValueBRL() { //conversores//
  const requestURL = `https://api.exchangerate.host/convert?from=BRL&to=USD&amount=${valorReal.value}`;
  const response = await fetch(requestURL);
  const data = await response.json();
  resultBRL.textContent = data.result.toFixed(2);
}

async function convertValueUSD() {
  const requestURL = `https://api.exchangerate.host/convert?from=USD&to=BRL&amount=${valorDolar.value}`;
  const response = await fetch(requestURL);
  const data = await response.json();
  resultUSD.textContent = data.result.toFixed(2);
}

async function convertValueEUR() {
  const requestURL = `https://api.exchangerate.host/convert?from=EUR&to=BRL&amount=${valorEuro.value}`;
  const response = await fetch(requestURL);
  const data = await response.json();
  resultEUR.textContent = data.result.toFixed(2);
}

async function convertValueBRLE() {
  const requestURL = `https://api.exchangerate.host/convert?from=BRL&to=EUR&amount=${valorReal.value}`;
  const response = await fetch(requestURL);
  const data = await response.json();
  resultBRLE.textContent = data.result.toFixed(2);
}

function showValueInputReal(text) { //mostrar a região selecionada e esconder a outra região//
  valorReal.style.display = 'block';
  valorDolar.style.display = 'none';
  valorEuro.style.display = 'none';
  textMoneyFormat.innerText = text;
}
function showValueInputDolar(text) {
  valorReal.style.display = 'none';
  valorDolar.style.display = 'block';
  valorEuro.style.display = 'none';
  textMoneyFormat.innerText = text;
}
function showValueInputEuro(text) {
  valorReal.style.display = 'none';
  valorDolar.style.display = 'none';
  valorEuro.style.display = 'block';
  textMoneyFormat.innerText = text;
}
function showValueInputRealEuro(text) {
  valorReal.style.display = 'block';
  valorDolar.style.display = 'none';
  valorEuro.style.display = 'none';
  textMoneyFormat.innerText = text;
}

function showResult(resultElement) { //mostrar o resultado selecionado//
  resultElement.style.display = 'block';
}

function hideResult(...resultElements) {  //para esconder os resultados anteriores//
  resultElements.forEach((resultElement) => {
    resultElement.style.display = 'none';
  });
}

function clearResults() {
  resultUSD.textContent = '00';
  resultBRL.textContent = '00';
  resultEUR.textContent = '00';
  resultBRLE.textContent = '00';
}
function resetInput(inputId) { //função para resetar input após o valor//
  document.getElementById(inputId).value = '';
}