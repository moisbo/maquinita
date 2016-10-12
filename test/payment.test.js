import assert from 'assert';
import * as payment from '../lib/payment';

describe('Payment', () => {
  describe('The vending machine should accept four denominations of coins.', function () {
    const coins = ['1', '2', '.50', '.20'];

    it('Should accept 2 dollar coin', () => {
      assert.equal(payment.accept('2', coins), true);
    });
    it('Should accept 1 dollar coin', () => {
      assert.equal(payment.accept('1', coins), true);
    });
    it('Should accept 50 cent coin', () => {
      assert.equal(payment.accept('.50', coins), true);
    });
    it('Should accept 20 cent coin', () => {
      assert.equal(payment.accept('.20', coins), true);
    });
    it('Should not accept 10 cent coin', () => {
      assert.equal(payment.accept('.10', coins), false);
    });
  });

});
