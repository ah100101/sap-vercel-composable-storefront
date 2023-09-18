import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { provideServer } from '@spartacus/setup/ssr';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    ...provideServer({
      serverRequestOrigin:
        // 'https://api.c65i60w-esaustral1-s2-public.model-t.cc.commerce.ondemand.com',
        'https://api.c3geq3sr3n-uniformsy1-d1-public.model-t.cc.commerce.ondemand.com',
    }),
  ],
})
export class AppServerModule {}
