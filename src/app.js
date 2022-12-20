const rateFrom = document.querySelector("p#i-have-convert");
const rateTo = document.querySelector("p#i-want-convert");
const inputCur = document.querySelector("select#i-have-opt");
const inputVal = document.querySelector("input#i-have-amt");
const outputCur = document.querySelector("select#i-want-opt");
const outputVal = document.querySelector("input#i-want-amt");
const currency = document.querySelectorAll("select");
const form = document.querySelector("form");
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
      currency[i].appendChild(option);
    }
    currency[i].addEventListener("change", (e) => {
      formReset();
      displayRates(rates);
      changeFlag(e.target);
    });
  }
}
function formReset() {
  inputVal.value = "";
  outputVal.value = "";
}
function displayRates(rates) {
  const from = inputCur.value;
  const to = outputCur.value;
  const have = (1 / rates[from] / (1 / rates[to])).toFixed(4);
  const want = (1 / rates[to] / (1 / rates[from])).toFixed(4);
  rateFrom.textContent = `1 ${from} = ${have} ${to}`;
  rateTo.textContent = `1 ${to} = ${want} ${from}`;
  inputVal.placeholder = `From - ${from} 0.00`
  outputVal.placeholder = `Receive - ${to} 0.00`
  onConvert(have, want);
}
function changeFlag(target) {
  for (code in country) {
    if (code === target.value) {
      const flag = target.parentElement.querySelector("img");
      flag.src = `https://flagsapi.com/${country[code]}/flat/64.png`;
    }
  }
}
function onConvert(have, want) {
  console.log(form);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    convert(have, want);
  });
}
function convert(have, want) {
  const userInp = inputVal.value;
  const converted = (userInp * have).toFixed(4);
  outputVal.value = `${converted}`;
}
