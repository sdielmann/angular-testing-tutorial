import { FromNowPipe } from './from-now.pipe';

/*
 * Usually we want to mock dayjs as a third party dependency here. We can assume dayjs itself is already tested.
 * Yet it is also an option to test it integrated if you want to make sure dayjs still works as you expect it to.
 *
 * Uncomment the next lines to see the test with a mocked version of dayjs.
 */

// jest.mock('dayjs', (() => {
//   return () => ({
//       isValid: jest.fn().mockReturnValue(true),
//       fromNow: jest.fn().mockReturnValue('vor einem Tag')
//   });
// }));

describe('DateFormatPipe', () => {
  let pipe: FromNowPipe;

  beforeAll(() => {
    pipe = new FromNowPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a date using dayjs', () => {
    const date = new Date();
    expect(pipe.transform(date)).toEqual('a few seconds ago');
    expect(pipe.transform(date.toISOString())).toEqual('a few seconds ago');
  });

  it('should return the original value when no valid date is provided', () => {
    const inp = 'FooBar';
    expect(pipe.transform(inp)).toEqual(inp);
  });
});
