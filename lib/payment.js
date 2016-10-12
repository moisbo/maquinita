//define the payment methods of the machine

export function accept(coin, coins) {
  return coin == coins.filter((c) => {
      return coin === c;
    });
}

export function funds(price, wallet) {
  let total = 0;
  wallet.map((coin) => {
    total += parseFloat(coin);
  });
  return total >= price
    ? price - total
    : 'not enough funds'
}
