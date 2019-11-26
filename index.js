/*
 * CURRENCY CONVERTER RELOADED
 * Author: Luca Klingler
 * ---------------------------
 *
 * This converts currencies...somehow.
 *
 * A list of ressources you used, for example links:
 * [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).
 */

/*
 *  Aufgabe: Baut einen neuen Währungsumrechner. Nachfolgend findet ihr Code der die 
 *  dafür notwendingen Eingabewerte von der Konsole entgegennimmt.
 * 
 *  Dafür müsst ihr das Script wie folgt aufrufen:
 *  npm start -- <Ausgangssumme> <Ausgangswährung-Code> <Zielwährung-Code>
 *  also z.B.
 *  npm start -- 10.0 USD EUR
 * 
 *  Die erwartete Ausgabe ist ein Text in folgender Form:
 *  "Ergebnis: <Ausgangssumme> <Ausgangswährung> = <Ergebnis> <Zielwährung>"
 *  also z.B.
 *  Ergebnis: 10.00 USD = 11.00 EUR
 *  
 *  Das Script soll mindestens drei verschiedene Währungen in beide Richtungen unterstützen
 */

let args = process.argv.slice(2);

let amount, originalCurrency, targetCurrency;

if (args.length < 3) {
  console.log('Error: Not enough input arguments given!');
} else {
  amount = args[0];
  originalCurrency = args[1];
  targetCurrency = args[2];
}
/*
let newAmount;
let varEUR = 1;
let varUSD = 0.9;
let varGBP = 1.16;
let varBGT = 0.011;
let varTHB = 0.030;


if (originalCurrency == 'EUR' && targetCurrency == 'USD') {
  newAmount = amount * varUSD / varEUR;
  console.log(amount + originalCurrency + '=' + newAmount + targetCurrency);
} else if (originalCurrency == 'EUR' && targetCurrency == 'GBP') {
  newAmount = amount * varGBP / varEUR;
  console.log(amount + originalCurrency + '=' + newAmount + targetCurrency);
} else if (originalCurrency == 'USD' && targetCurrency == 'EUR') {
  newAmount = amount * varEUR / varUSD;
  console.log(amount + originalCurrency + '=' + newAmount + targetCurrency);
} //else if (originalCurrency == 'USD' && targetCurrency == 'GBP') {
  //newAmount = amount * varGBP / varUSD;
  //console.log(amount + originalCurrency + '=' + newAmount + targetCurrency);
} else if (originalCurrency == 'GBP' && targetCurrency == 'EUR') {
  newAmount = amount * varEUR / varGBP;
  console.log(amount + originalCurrency + '=' + newAmount + targetCurrency);
} //else if (originalCurrency == 'GBP' && targetCurrency == 'USD') {
  //newAmount = amount * varUSD / varGBP;
  //console.log(amount + originalCurrency + '=' + newAmount + targetCurrency);
} else if (originalCurrency == 'EUR' && targetCurrency == 'BGT') {
  newAmount = amount * varBGT / varEUR;
  console.log(amount + originalCurrency + '=' + newAmount + targetCurrency);
} else if (originalCurrency == 'BGT' && targetCurrency == 'EUR') {
  newAmount = amount + varEUR / varBGT;
  console.log(amount + originalCurrency + '=' + newAmount + targetCurrency);
} else if (originalCurrency == 'EUR' && targetCurrency == 'THB') {
  newAmount = amount + varTHB / varEUR;
  console.log(amount + originalCurrency + '=' + newAmount + targetCurrency);
} else if (originalCurrency == 'THB' && targetCurrency == 'EUR') {
  newAmount = amount + varEUR / varTHB;
  console.log(amount + originalCurrency + '=' + newAmount + targetCurrency);
}
*/
let output;
const Change = {
  USD: {
    rate: 1.11,
    symbol: '$'
  },
  GBP: {
    rate: 0.85,
    symbol: '£'
  },
  BHT: {
    rate: 33.24,
    symbol: 'Bt'
  },
  BGT: {
    rate: 93.73,
    symbol: '৳'
  },
  TRY: {
    rate: 6.33,
    symbol: '₺'
  },
  CHF: {
    rate: 1.10,
    symbol: 'CHF'
  },
  RUB: {
    rate: 70.49,
    symbol: '₽'
  },
  EUR: {
    rate: 1,
    symbol: '€'
  }

}






try {
  const request = require('request');
  request('https://api.exchangeratesapi.io/latest', function (error, response, body) {
    //console.error('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
    let download = JSON.parse(body);
    console.log(download);



    try {
      for (const rates in download.rates) {
        if (Change.hasOwnProperty(rates)) {
          Change[rates].rate = download.rates[rates];
        } else if (Change.hasOwnProperty(rates) === false) {
          Change[rates] = {};
          Change[rates].rate = download.rates[rates];
        }
      }
    } catch (error) {
      console.log(error);
    }


    const amountInEur = amount / Change[originalCurrency].rate;
    output = amountInEur * Change[targetCurrency].rate;
    if (!Change[targetCurrency].hasOwnProperty('symbol') && !Change[originalCurrency].hasOwnProperty('symbol')) {
      console.log('Für ' + amount + Change[originalCurrency].symbol + ' erhalten sie ' + output + Change[targetCurrency].symbol);
    } else {
      console.log('Für ' + amount + ' erhalten sie ' + output);
    }
  });

} catch (error) {
  console.log('Bruder du hast kein Internet');
}
