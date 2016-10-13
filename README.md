## Maquinita is a vending machine library

- It lets you define denominations of coins.
- Define your products in store and quantity.
- Returns change along with the item.
- Coins are fully returned if there is no item.

Example vending machine state:
``` javascript
const state = {
      products: [
        {
          item: 'taco',
          price: '1.2',
          qty: 5
        },
        {
          item: 'soda',
          price: '.50',
          qty: 5
        },
        {
          item: 'salsa',
          price: '.20',
          qty: 5
        },
        {
          item: 'guac',
          price: '.70',
          qty: 5
        }
      ],
      denominations: ['1', '2', '.50', '.20']
    };
```


Example use:
```javascript
const deposit = ['.50'];
let wallet = [];

deposit.map((coin) => {
  wallet = vm.insertCoin(coin, state.denominations, wallet)
});

const purchase = vm.purchase('salsa', wallet, state.products);

assert.deepEqual({item: { item: 'salsa', price: '.20', qty: 4 }, change: .30}, purchase);
```


#### Test this library with 

npm install

npm test
