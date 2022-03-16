let miStorage = window.localStorage;

const getCryptos = () => {
    const URL =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            selectCrypto(data);
        });
};
getCryptos();

const selectCrypto = (crypto) => {
    crypto.forEach((e, i) => {
        let cryptoObj = {
            cryptoId: i,
            cryptoName: e.name,
            cryptoValue: e.current_price,
            cryptoImage: e.image,
        };
        setCryptos(cryptoObj);
    });
};

const setCryptos = (crypto) => {
    var createOption = document.createElement("option");
    createOption.innerText = crypto.cryptoName;
    const getSelect = document.getElementById("formSelect");
    getSelect.append(createOption);

    getSelect.addEventListener("change", (event) => {
        getCryptoE = event.target.value;
        if (getCryptoE === crypto.cryptoName) {
            const setCurrentValue = document.getElementById("currentValue");
            setCurrentValue.innerText = `Valor actual: U$D ${crypto.cryptoValue}`;
            buyCrypto(crypto);
        }
    });
};

const buyCrypto = (crypto) => {
    const getCryptoList = document.getElementById("buyInput--container");
    const createBuyInputContainer = `<div class="buyInput">
            <label for="buyLabel">Compré ${crypto.cryptoName}</label>
            <input type="text" id="getInputPrice"></input>
            <a id="buyCrypto-btn" type="button" class="btn btn-dark buyCrypto-btn">Guardar</a>
        </div>`;
    getCryptoList.innerHTML = createBuyInputContainer;

    getBuyCryptoBtn = document.getElementById("buyCrypto-btn");

    getBuyCryptoBtn.addEventListener("click", function () {
        getInputPrice = document.getElementById("getInputPrice");
        TransactionCalc = getInputPrice.value * crypto.cryptoValue;
        createList(crypto, TransactionCalc);
    });
};

const createList = (crypto, transaction) => {
    const getTableTransaction = document.getElementById("cryptoList--container");
    const dateTransaction = Date.now();
    const today = new Date(dateTransaction);
    const setImgSrc = crypto.cryptoImage.toString();
    const profitCalc = (transaction / crypto.cryptoValue) * 100;

    const createListElem =
        `<tr class="table-transaction">
                <td class="item-transaction"><img class="logoCrypto" src="${setImgSrc}" title="${crypto.cryptoName}"></img></td>
                <td class="item-transaction">${today.toLocaleDateString()}</td>
                <td class="item-transaction">$${transaction.toFixed(2)}</td>
                <td class="item-transaction">$${crypto.cryptoValue}</td>
                <td class="item-transaction">${profitCalc.toFixed(2)}%</td>
            </tr>`;
    getTableTransaction.innerHTML += createListElem;
    for (let i = 0; i < localStorage.length; i++) {
        let localSValue = localStorage.key(i);
        localStorage.setItem(createListElem, localSValue);
    }
};