const rateFrom = document.querySelector("p#i-have-convert");
const inputCur = document.querySelector("select#i-have-opt");
const inputVal = document.querySelector("input#i-have-amt");
const outputCur = document.querySelector("select#i-want-opt");
const outputVal = document.querySelector("input#i-want-amt");
const requestURL = "https://api.exchangerate.host/latest";
fetchFunc();
function fetchFunc() {
  return fetch(requestURL)
    .then((response) => response.json())
    .then(latestRates);
}
function latestRates(data) {
  const rates = data.rates;
  currList(rates);
}
function currList(rates) {
    for (i in rates) {
        const optHave = document.createElement("option");
        optHave.value = i;
        optHave.textContent = i;
        const optWant = document.createElement("option");
        optWant.value = i;
        optWant.textContent = i;
        inputCur.appendChild(optHave);
        outputCur.appendChild(optWant);
        
    }
}
