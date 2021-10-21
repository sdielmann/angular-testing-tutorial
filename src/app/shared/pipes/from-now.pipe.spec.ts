import { FromNowPipe } from './from-now.pipe';

describe('DateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new FromNowPipe();
    expect(pipe).toBeTruthy();
  });
});
