import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import { Configuration } from 'webpack';


export default (config: Configuration, options: CustomWebpackBrowserSchema, targetOptions: TargetOptions) => {
  // config object can be modified here
  console.log('Customizing webpack configuration...');
  return config;
};
