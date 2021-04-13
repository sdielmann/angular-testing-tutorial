import { PhoneHrefPipe } from './phone-href.pipe';

describe('PhoneHrefPipe', () => {
  let pipe: PhoneHrefPipe;

  beforeEach(() => {
    pipe = new PhoneHrefPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should create a normalized phone href link', () => {
    /* Pipes are pretty simple to test. Since there is usually only the single relevant "transform" function, it can
     * simply be tested for its behavior by treating it as a blackbox. Your provide an input value and test whatever
     * your expect to be the outcome of the function. */

    const expected = 'tel:%2B491511234567';
    expect(pipe.transform('0151 1234567')).toEqual(expected);
    expect(pipe.transform('+49 151 1234567')).toEqual(expected);
    expect(pipe.transform('+49 (151) 1234567')).toEqual(expected);
    expect(pipe.transform('+49 151 123-4567')).toEqual(expected);
    expect(pipe.transform('+49 151 1234567', false)).toEqual(expected.replace('tel:', ''));
  });
});
