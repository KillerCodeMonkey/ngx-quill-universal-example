import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

global['window'] = {}
global['document'] = {
  createElement: () => ({
    classList: {
      toggle: () => {},
      contains: () => {}
    }
  }),
  addEventListener: () => {}
}
global['Node'] = {}
global['navigator'] = {}

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
