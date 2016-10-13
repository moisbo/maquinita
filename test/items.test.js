import assert from 'assert';
import * as items from '../lib/items';

describe('Items', () => {

  const products = [
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
  ];

  describe('The vending machine should return one of four different items.', () => {

    it('should select a taco and return taco', () => {
      var taco = items.select('taco', products);
      assert.deepEqual(taco, products[0]);
    });

    it('should select a croissant and return not in store', () => {
      var croissant = items.select('croissant', products) || {};
      assert.deepEqual(croissant, {});
    });

    it('should select a guac and return price of guac', () => {
      var guac = items.select('guac', products);
      assert.equal(guac.price, '.70');
    });

  });

});

