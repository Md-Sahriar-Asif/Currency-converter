const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD")
            newOption.selected = "selected";
        if(select.name === "to" && currCode === "BDT")
            newOption.selected = "selected";
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amVal = amount.value;
    if(amVal === "" || amVal<1){
        amVal = 1;
        amount.value = "1";
    }
    
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    let base = fromCurr.value.toLowerCase();
    let target = toCurr.value.toLowerCase();
    let rate = data[base][target];

    let finalAmount = amVal * rate;

    msg.innerText = `${amVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

window.addEventListener("load", () => {
    updateExchangeRate();
})