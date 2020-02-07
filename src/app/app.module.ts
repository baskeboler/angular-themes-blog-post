import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemesService } from './services/themes.service';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemesInitService } from './services/themes-init.service';


export const initThemes = (themes: ThemesInitService) => {
  return (): Promise<any> => themes.init();
}

@NgModule({
  exports: [
    AppComponent,
    HomeComponent,
    NavbarComponent

  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ThemesService,
    {
      provide: APP_INITIALIZER,
      useFactory: initThemes,
      deps: [ThemesInitService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
