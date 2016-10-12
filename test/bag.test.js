import assert from 'assert';
import * as bag from '../lib/bag';

describe('Test the Bag', () => {
  describe('insert coin', () => {
    it('should insert .20 from an empty wallet and know how much is in the bag', () => {
      let wallet = [];
      wallet = bag.add('.20', wallet);
      assert.deepEqual(wallet, ['.20']);
    });
    it('should insert 1 from a wallet with .20 and know how much is in the bag', () => {
      let wallet = ['.20'];
      wallet = bag.add('1', wallet);
      assert.deepEqual(wallet, ['.20', '1']);
    });
  });
  describe('return change', () => {
    it('should return .20 change', () => {
      let wallet = ['1', '.20'];
      assert.deepEqual(bag.remove(wallet, 1), ['1']);
    });
    it('should return 1 change', () => {
      let wallet = ['1', '.20'];
      assert.deepEqual(bag.remove(wallet, 0), ['.20']);
    });
  });
});
