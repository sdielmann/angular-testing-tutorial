import { EmailHrefPipe } from './email-href.pipe';

describe('EmailHrefPipe', () => {
  let pipe: EmailHrefPipe;

  beforeEach(() => {
    pipe = new EmailHrefPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should create a correct email mailto link', () => {
    const mail = 'hans.meier@supercompany.com';

    expect(pipe.transform(mail)).toEqual('mailto:hans.meier%40supercompany.com');
    expect(pipe.transform(mail, {addPrefix: false})).toEqual('hans.meier%40supercompany.com');
    expect(pipe.transform(mail, {subject: 'Hello World!'})).toEqual('mailto:hans.meier%40supercompany.com?subject=Hello%20World!');
  });

  it('should create a correct email mailto link when multiple recipients are added', () => {
    const mails = ['hans.meier@supercompany.com', 'darth.vader@empire.com'];
    expect(pipe.transform(mails)).toEqual('mailto:hans.meier%40supercompany.com,darth.vader%40empire.com');
  });
});
