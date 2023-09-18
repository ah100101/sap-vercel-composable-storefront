import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const stateKey = makeStateKey<string>('dateTimeStamp');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'vercel-sap-store';
  dateTimeStamp = new Date().toString();

  constructor(transferState: TransferState, @Inject(PLATFORM_ID) id: string) {
    if (isPlatformBrowser(id)) {
      this.dateTimeStamp = transferState.get(stateKey, '');
    } else {
      this.dateTimeStamp = new Date().toString();
      transferState.set(stateKey, this.dateTimeStamp);
    }
  }
}
