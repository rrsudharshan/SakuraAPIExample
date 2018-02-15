import {testSapi} from '../../spec/helpers/sakura-api';
import {SomeModel} from './some-model';

describe('SomeModel tests', () => {
  const sapi = testSapi({
    models: [SomeModel]
  });

  it('SomeModel', () => {
    pending('not implemented');
  });
});
