const getCryptos = () => {
    const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    fetch (URL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        selectCrypto(data);
    });
}
getCryptos();

const selectCrypto = (crypto) => {
    crypto.forEach(e => {
        let cryptoObj = {
            cryptoName: e.name,
            cryptoValue: e.current_price
        }
        
    });
}

