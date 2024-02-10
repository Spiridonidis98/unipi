import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ComponentMasterModule } from './components/component-master-module';
import { MainComponent } from './pages/main/main.component';
import {MatSelectModule} from '@angular/material/select'
import { MAT_DATE_LOCALE, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayingNowComponent } from './components/playing-now/playing-now.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { ContactComponent } from './components/contact/contact.component';
import { FacebookLoginProvider,GoogleSigninButtonModule , GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { ScreeningComponent } from './components/screening/screening.component';
import { RoomsComponent } from './components/screening/rooms/rooms.component';
import { SeatsComponent } from './components/screening/seats/seats.component';
import { ConfirmComponent } from './components/screening/confirm/confirm.component';
import { AdminScreeningComponent } from './components/admin/admin-screening/admin-screening.component';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { CreateScreeningComponent } from './components/admin/admin-screening/create-screening/create-screening.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlayingNowComponent,
    ComingSoonComponent,
    ContactComponent,
    ScreeningComponent,
    RoomsComponent,
    SeatsComponent,
    ConfirmComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentMasterModule,
    MatSelectModule,
    MatOptionModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    MatDatepickerModule,
    GoogleSigninButtonModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '51980323970-jgmh3nccbe4acgr4hmt1ch40oem9f69b.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('3586981141524852')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {provide: MatDatepickerIntl},
    {provide: MAT_DATE_LOCALE, useValue: 'el-EL'},
    provideNativeDateAdapter(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
function provideMomentDateAdapter(arg0: { parse: { dateInput: string[]; }; display: { dateInput: string; monthYearLabel: string; dateA11yLabel: string; monthYearA11yLabel: string; }; }): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

