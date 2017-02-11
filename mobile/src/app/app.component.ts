import { ProVersionPage } from './../pages/pro-version/pro-version';
import { FriendsPage } from './../pages/friends/friends';
import { TicketsPage } from './../pages/tickets/tickets';
import { AuthenticationPage } from './../pages/authentication/authentication';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthController } from './../providers/auth-controller';
import { ProfileComponent } from './../components/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(ProfileComponent) profile: ProfileComponent;

  rootPage: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public authCtrl: AuthController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Billets', component: TicketsPage, icon: 'paper' },
      { title: 'Amis', component: FriendsPage, icon: 'person' },
      { title: 'Version Pro', component: ProVersionPage, icon: 'cash' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      if (this.authCtrl.hasBeenAuthenticated()) {
        this.rootPage = TicketsPage;
        // notify profile directly since the user has been authenticated
        this.profile.notify(this.authCtrl.getCurrentUser());
      } else {
        this.rootPage = AuthenticationPage;
        this.authCtrl.addObserver(this.profile);
      }      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
