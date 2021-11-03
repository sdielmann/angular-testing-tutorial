import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    MenubarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
