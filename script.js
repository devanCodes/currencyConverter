// fetches exchange rates from the API
fetch('https://openexchangerates.org/api/latest.json?app_id=1c5bcbc9159740c481e8fe9fb135cdd1')
  .then(response => response.json())
  .then(data => {
    // store the exchange rates object
    const exchangeRates = data.rates;

    // fetch currencies from the API
    fetch('https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=1c5bcbc9159740c481e8fe9fb135cdd1')
      .then(response => response.json())
      .then(currencies => {
        // retrieve references to the dropdown elements for selecting the original and desired currencies from the HTML document using their respective 'id' attributes
        const originalCurrencySelect = document.getElementById('originalCurrency');
        const desiredCurrencySelect = document.getElementById('desiredCurrency');

        // populate the original currency dropdown
        // this loop iterates over each currency code in the 'currencies' object obtained from the API
        // creating a variable currencyCode as the name/key property in the currencies object, the script assumes the name/key value in the API is the currency code
        for (const currencyCode in currencies) {
          // create an 'option' element
          const option = document.createElement('option');
          // set the option 'value' attribute to the currency code
          option.value = currencyCode;
          // the 'text' content of the option is set to a combination of the currency code and its corresponding name
          // the last part of the code is able to print out the name that corresponds to the key value of currencyCode in the currencies object
          option.text = `${currencyCode} - ${currencies[currencyCode]}`;
          // the option element is appended to the 'originalCurrencySelect' dropdown box
          originalCurrencySelect.appendChild(option);
        }

        // populate the desired currency dropdown
        // this loop iterates over each currency code in the 'currencies' object obtained from the API
        for (const currencyCode in currencies) {
          // create an 'option' element
          const option = document.createElement('option');
          // set the option 'value' attribute to the currency code
          option.value = currencyCode;
          // the 'text' content of the option is set to a combination of the currency code and its corresponding name
          option.text = `${currencyCode} - ${currencies[currencyCode]}`;
          // the option element is appended to the 'desiredCurrencySelect' dropdown box
          desiredCurrencySelect.appendChild(option);
        }

        // currency conversion function
        function convertCurrency() {
          // get the selected original currency code and desired currency code from the selected currency code's value
          const originalCurrencyCode = originalCurrencySelect.value;
          const desiredCurrencyCode = desiredCurrencySelect.value;

          // get the original amount entered by the user and conver it to a floating point number
          const originalAmount = parseFloat(document.getElementById('originalAmount').value);

          // get references to the error text and converted amount elements
          const errorText = document.getElementById('errorText');
          const convertedAmount = document.getElementById('convertedAmount');

          // check if the original amount is a non-negative number and both currency codes are selected
          if (originalAmount >= 0 && originalCurrencyCode && desiredCurrencyCode && !isNaN(originalAmount)) {
            // clears any previous error message
            errorText.textContent = '';
            
            // get the exchange rate for the original and desired currencies from the exchangeRates object
            const originalRate = exchangeRates[originalCurrencyCode];
            const desiredRate = exchangeRates[desiredCurrencyCode];

            // calculate the desired amount by converting the original amount using the exchange rates
            const desiredAmount = (originalAmount / originalRate) * desiredRate;

            // display the desired amount with 2 decimal places in the converted amount element
            document.getElementById('convertedAmount').textContent = desiredAmount.toFixed(2);
          } else {
            // if any validation condition fails, clear the converted amount and display an error message
            convertedAmount.textContent = '';
            errorText.textContent = "Please enter a value greater than or equal to 0!";
          }
        }

        // accessing the convertButton in HTML file by it's id
        const convertButton = document.getElementById('convertButton');

        // adding an event listener to the button so when it is clicked, the will perform the convertCurrency function that was already established
        convertButton.addEventListener('click', convertCurrency);
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching exchange rates:', error);
  });