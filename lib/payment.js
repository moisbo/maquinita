//Payment

export function accept(coin, coins) {
  return coin == coins.filter((c) => { // eslint-disable-line eqeqeq
      return coin === c;
    });
}

export function funds(price, wallet) {
  let total = 0;

  wallet.map((coin) => {
    total += parseFloat(coin);
  });

  return total >= price
    ? total - price
    : 'not enough funds'
}
