// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const path = require('path');
const fs = require('fs');

const reportDir = path.resolve(__dirname, 'report');
const timestamp = new Date()
  .toISOString()
  .replace(/T/, '_')
  .replace(/:/g, '-')
  .replace(/\..+/, '')

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  baseUrl: 'http://host.docker.internal:4200/',
  specs: ['features/**/*.feature'],

  directConnect: false,
  seleniumAddress: 'http://localhost:4444',
  capabilities: {
    browserName: 'chrome'
  },

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    'require-module': 'ts-node/register',
    require: [
      'src/setup.ts',
      'src/steps/**/*.ts'
    ],
    format: [
      '@cucumber/pretty-formatter',
      `html:${reportDir}/report_${timestamp}.html`
    ]
  },
  allScriptsTimeout: 11000,

  onPrepare() {
    require('ts-node').register({
      project: path.join(__dirname, './tsconfig.json')
    });

    if (!fs.existsSync(reportDir)){
      fs.mkdirSync(reportDir, {recursive: true});
    }
  },

  SELENIUM_PROMISE_MANAGER: false
};
