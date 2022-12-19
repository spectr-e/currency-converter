const rateFrom = document.querySelector("p#i-have-convert");
const rateto = document.querySelector("p#i-want-convert");
const inputCur = document.querySelector("select#i-have-opt");
const inputVal = document.querySelector("input#i-have-amt");
const outputCur = document.querySelector("select#i-want-opt");
const outputVal = document.querySelector("input#i-want-amt");

const currency = document.querySelectorAll("select");

const requestURL = "https://api.exchangerate.host/latest";
fetchFunc();
function fetchFunc() {
  return fetch(requestURL)
    .then((response) => response.json())
    .then(latestRates);
}
function latestRates(data) {
  const rates = data.rates;
  currencySelect(rates);
}
function currencySelect(rates) {
  for (i = 0; i < currency.length; i++) {
    for (curr in rates) {
      const option = document.createElement("option");
      option.value = curr;
      option.textContent = curr;
      currency[i].appendChild(option)
    }
  }
  currency[0].addEventListener('change', ()=>{
        displayRates(rates);
  })
}

function displayRates(rates) {
  const from = inputCur.value;
  const to = outputCur.value;
  rateFrom.textContent = `1 ${from} = ${rates[from].toFixed(2)} EUR`;
}
