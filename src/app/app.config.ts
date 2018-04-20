import { AppConfig } from './app-config';
export { AppConfig } from './app-config';

import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost:8083/api/'
};