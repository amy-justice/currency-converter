let currency_one = document.getElementById('currency-one');
let currency_two = document.getElementById('currency-two');

let currency_one_amount = document.getElementById('currency-one-value');
let currency_two_amount = document.getElementById('currency-two-value');

let switch_currency = document.getElementById('switch-currency')

let rateNames = [];

async function getCurrencies(code = 'USD') {
    fetch(`https://api.exchangeratesapi.io/latest?base=${code}`)
    .then(res => res.json())
    .then(currency => {
        console.log(currency)
        if (rateNames.length === 0) {
            getRateCodes(currency.rates)
        }
        calculate(currency.rates)
    })
}

function calculate(rates) {
    currency_two_amount.value = (rates[currency_two.value] * currency_one_amount.value).toFixed(2);
}

// adds rate codes to drop down
function getRateCodes(rates) {
    // create array from available rates in response from Fixer.io
    Object.keys(rates).map(key => rateNames.push(key))

    rateNames.sort();

    // add rate codes to both drop downs
    rateNames.forEach(rate => {
        // select USD as default for currency one
        if (rate == 'USD') {
            currency_one.innerHTML += `<option value='${rate}' selected>${rate}</option>`
        }
        // select GBP as default for currency two
        if (rate == 'GBP') {
            currency_two.innerHTML += `<option value='${rate}' selected>${rate}</option>`
        }
        currency_one.innerHTML += `<option value='${rate}'>${rate}</option>`
        currency_two.innerHTML += `<option value='${rate}'>${rate}</option>`
    })
}

function switchCurrency() {
    const base_currency = currency_one.value;
    const second_currency = currency_two.value;

    currency_two.value = base_currency;
    currency_one.value = second_currency;

    getCurrencies(currency_one.value);
}

getCurrencies();

// event listeners

// first currency is changed
currency_one.addEventListener('change', e => {
    currency_one.value = e.target.value;
    getCurrencies(currency_one.value)
})

// second currency is changed
currency_two.addEventListener('change',  e => {
    currency_two.value = e.target.value;
    getCurrencies(currency_one.value)
})

// value of currency one is changed
currency_one_amount.addEventListener('change', e => {
    getCurrencies(currencyOne.value);
})

// swap button is pressed
switch_currency.addEventListener('click', switchCurrency)




