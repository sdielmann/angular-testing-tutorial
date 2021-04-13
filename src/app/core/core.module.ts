import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { AppRoutingModule } from './routing/app-routing.module';

/**
 * It is good practice to keep a CoreModule that is responsible for all one-time imports (e.g. with forRoot() calls).
 * The AppModule should only be responsible for bootstrapping the application.
 */
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    SharedModule,
    RouterModule
  ]
})
export class CoreModule { }
