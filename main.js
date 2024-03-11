let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById('fromCurrency');
const toDropDown = document.getElementById('toCurrency');
const result = document.querySelector('.result');
const swap= document.querySelector('#swapButton');

currencies.forEach((currency) => {
    const option = document.createElement('option');
    option.value = currency.code;
    option.text = currency.name;
    fromDropDown.appendChild(option);
});

currencies.forEach((currency) => {
    const option = document.createElement('option');
    option.value = currency.code;
    option.text = currency.name;
    toDropDown.appendChild(option);
});

fromDropDown.value = "USD";
toDropDown.value = "INR";

swap.addEventListener('click', () => {
    const temp = fromDropDown.value;
    fromDropDown.value = toDropDown.value;
    toDropDown.value = temp;
    convertCurrency();
})

let convertCurrency = () => {
    const amount = document.getElementById('amount').value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    if(amount.length !=0){
        // alert(`Amount: ${amount}, From: ${fromCurrency}, To: ${toCurrency}`);
        fetch(api).then(res => {
            return res.json();
        }).then(data => {
            const fromExchangeRate = data.conversion_rates[fromCurrency];
            const toExchangeRate = data.
            conversion_rates[toCurrency];
            const convertedAmount = (amount * toExchangeRate) / fromExchangeRate;
            result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        });
    }
    else{
        alert("Please enter the amount to be converted");
    }
}

document.querySelector(".convert").addEventListener("click", convertCurrency);
window.addEventListener("load",convertCurrency)