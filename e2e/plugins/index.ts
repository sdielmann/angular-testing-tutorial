import resolve from 'resolve';
import browserify from '@cypress/browserify-preprocessor';
import got from 'got';

const cucumber = require('cypress-cucumber-preprocessor').default;

export default (on, config) => {
  const options = {
    ...browserify.defaultOptions,
    typescript: resolve.sync('typescript', { baseDir: config.projectRoot })
  };

  on('file:preprocessor', cucumber(options));

  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push('--disable-gpu');
      return launchOptions;
    }
  });

  on('task', {
    resetDB() {
      /* This endpoint is defined in the mock backend.
       It seeds the database with predefined data to use in the tests. */
      return got.post('http://localhost:9080/e2e/reset').then(() => true);
    }
  });
};

