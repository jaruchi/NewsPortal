import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './module/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule } from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { SearchComponent } from './component/search/search.component';
import { MainComponent } from './component/main/main.component';
import { WeatherComponent } from './component/weather/weather.component';
import { FooterComponent } from './component/footer/footer.component';

import { GoogleLoginProvider } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    SearchComponent,
    MainComponent,
    WeatherComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '495292608022-447bc5pblgh8s111fonhunnhl6hemgj3.apps.googleusercontent.com'
            ), // your client id
          },
        ],
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
