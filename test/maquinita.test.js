import assert from 'assert';
import * as vm from '../lib/maquinita';

describe('Maquinita Library as VM', () => {

  describe('insert coin and make deposit', () => {

    const denominations = ['1', '2', '.50', '.20'];

    it('should insert .20 cents and make deposit', () => {
      const wallet = vm.insertCoin('.20', denominations, []);
      assert.deepEqual(['.20'], wallet);
    });

    it('should insert .20 cents and make deposit', () => {
      const wallet = vm.insertCoin('.20', denominations, ['.20']);
      assert.deepEqual(['.20', '.20'], wallet);
    });

    it('should insert .10 cents and don\'t make a deposit', () => {
      const wallet = vm.insertCoin('.10', denominations, ['.20']);
      assert.deepEqual('return not recognised coin', wallet);
    });

    it('should insert .20, .50 and have available to purchase in wallet', () => {
      const deposit = ['.20', '.50'];
      let wallet = [];
      deposit.map((coin) => {
        wallet = vm.insertCoin(coin, denominations, wallet);
      });
      assert.deepEqual(deposit, wallet);
    });

  });

  describe('Decrease storage', () => {
    let items = [
      {
        item: 'taco',
        price: '1.2',
        qty: 1
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
    ];

    it('should decrease quantity', () => {
      items = vm.remove('taco', items);
      assert.equal(items[0].qty, 0);
    });

    it('should decrease quantity', () => {
      items = vm.remove('salsa', items);
      assert.equal(items[2].qty, 4);
    });

  });

  describe('Make a purchase', () => {

    const state = {
      wallet: [],
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

    it('should insert .50, .50, .20 and get a taco', () => {
      const deposit = ['.50', '.50', '.20'];
      let wallet = [];
      deposit.map((coin) => {
        wallet = vm.insertCoin(coin, state.denominations, wallet);
      });
      const purchase = vm.purchase('taco', wallet, state.products);
      assert.deepEqual({item: {item: 'taco', price: '1.2', qty: 4}, change: 0}, purchase);
    });

    it('should insert .50, .20, .20 and get nothing and the change', () => {
      const deposit = ['.50', '.20', '.20'];
      let wallet = [];
      deposit.map((coin) => {
        wallet = vm.insertCoin(coin, state.denominations, wallet);
      });
      const purchase = vm.purchase('taco', wallet, state.products);

      assert.deepEqual({item: null, change: wallet}, purchase);
    });

    it('should insert .50, .20, .20 and get nothing and the change', () => {
      const deposit = ['.50', '.20', '.20'];
      let wallet = [];
      deposit.map((coin) => {
        wallet = vm.insertCoin(coin, state.denominations, wallet);
      });
      const purchase = vm.purchase('taco', wallet, state.products);
      assert.deepEqual({item: null, change: wallet}, purchase);
    });

    it('should insert 1, .20, .10 and get a taco and .20 in change', () => {
      const deposit = ['1', '.20', '.20'];
      let wallet = [];
      deposit.map((coin) => {
        wallet = vm.insertCoin(coin, state.denominations, wallet);
      });
      const purchase = vm.purchase('taco', wallet, state.products);
      assert.deepEqual({item: { item: 'taco', price: '1.2', qty: 3 }, change: .20}, purchase);
    });

  });

  describe('The coins should be fully returned if there is no item.', () => {
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
          qty: 0
        }
      ],
      denominations: ['1', '2', '.50', '.20']
    };

    it('should be out of guac and return all change', () => {

      const deposit = ['.50', '.20'];
      let wallet = [];

      deposit.map((coin) => {
        wallet = vm.insertCoin(coin, state.denominations, wallet)
      });

      const purchase = vm.purchase('guac', wallet, state.products);

      assert.deepEqual({item: null, change: deposit}, purchase);
    });

    it('should buy salsa and return change', () => {

      const deposit = ['.50'];
      let wallet = [];

      deposit.map((coin) => {
        wallet = vm.insertCoin(coin, state.denominations, wallet)
      });

      const purchase = vm.purchase('salsa', wallet, state.products);

      assert.deepEqual({item: { item: 'salsa', price: '.20', qty: 4 }, change: .30}, purchase);
    });

  });

});
