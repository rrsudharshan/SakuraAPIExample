import {testSapi} from '../../spec/helpers/sakura-api';
import {SomeApi} from './some-api';

describe('SomeApi tests', () => {
  const sapi = testSapi({
    routables: [SomeApi]
  });

  it('SomeApi', () => {
    pending('not implemented');
  });
});
