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
        'https://api.cg79x9wuu9-eccommerc1-p4-public.model-t.myhybris.cloud',
    }),
  ],
})
export class AppServerModule {}
