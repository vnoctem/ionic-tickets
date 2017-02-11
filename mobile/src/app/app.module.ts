import { ShowsPage } from './../pages/shows/shows';
import { ProVersionPage } from './../pages/pro-version/pro-version';
import { FriendsPage } from './../pages/friends/friends';
import { QrCodePage } from './../pages/qr-code/qr-code';
import { TicketsPage } from './../pages/tickets/tickets';
import { AuthenticationPage } from './../pages/authentication/authentication';
import { AdBannerComponent } from './../components/ad-banner/ad-banner'
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MaximizableDirective } from './../attributes/maximizable.directive';
import { AuthController } from './../providers/auth-controller';
import { AppSettings } from './../providers/app-settings';

@NgModule({
  declarations: [
    MyApp,
    AuthenticationPage,
    TicketsPage,
    QrCodePage,
    FriendsPage,
    ShowsPage,
    ProVersionPage,
    AdBannerComponent,
    MaximizableDirective
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthenticationPage,
    TicketsPage,
    QrCodePage,
    FriendsPage,
    ShowsPage,
    ProVersionPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    AuthController, 
    AppSettings
  ]
})
export class AppModule {}
