import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';
import { DemoFileUploadComponent } from './demo-file-upload/demo-file-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    DemoFileUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SlimLoadingBarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
