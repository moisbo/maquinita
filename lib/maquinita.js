import * as payment from './payment';
import * as items from './items';

function deposit(coin, wallet) {
  return [
    ...wallet,
    coin
  ]
}

//add incoming change to vm wallet
export function insertCoin(coin, denominations, wallet) {
  return payment.accept(coin, denominations)
    ? deposit(coin, wallet)
    : 'return not recognised coin';
}

export function purchase(name, wallet, products) {
  //find item
  let item = items.select(name, products);
  //compare price with wallet
  let funds = payment.funds(item.price, wallet);

  if (typeof funds === 'number') {
    //substract from storage
    products = remove(name, products);

    if (products !== 'out of stock') {
      funds = Math.round(funds * 100) / 100;
      let item = items.select(name, products);
      return {
        item: item,
        change: funds
      }
    } else {
      return {
        item: null,
        change: wallet
      }
    }
  } else {
    return {
      item: null,
      change: wallet
    }
  }
}

export function remove(name, products) {
  let out = null;

  let p = products.map((product) => {
    if (name === product.item) {
      product.qty > 0
        ? product.qty -= 1
        : out = 'out of stock';
    }
    return product;

  });
  return out ? out : p;
}
