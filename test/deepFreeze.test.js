import assert from 'assert';
import {deepFreeze} from '../utils/deepFreeze';

const obj1 = {
  internal: {}
};

describe('deep freeze', () => {
  it('should deep freeze', () => {
    deepFreeze(obj1);
    function internal() {
      obj1.internal.a = 'anotherValue';
    }

    assert.throws(internal, Error)
  });
});
