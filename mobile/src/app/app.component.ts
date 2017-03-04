import { ProVersionPage } from './../pages/pro-version/pro-version';
import { FriendsPage } from './../pages/friends/friends';
import { TicketsPage } from './../pages/tickets/tickets';
import { AuthenticationPage } from './../pages/authentication/authentication';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthController } from './../providers/auth-controller';
import { SharedService } from './../providers/shared-service';
import { Subscription } from 'rxjs/Subscription';

export class MenuItem {
  title: string 
  component: any 
  icon: string 
  separator: boolean
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnDestroy {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<MenuItem>;
  private fullname: string;
  private photo: string;

  private AuthSubscription: Subscription;
  private ProSubscription: Subscription;

  constructor(public platform: Platform, public authCtrl: AuthController, public sharedService: SharedService) {
    this.initializeApp();

    // initializae the menu
    this.pages = [
      { title: 'Billets', component: TicketsPage, icon: 'paper', separator: false },
      { title: 'Amis', component: FriendsPage, icon: 'person', separator: false },
      { title: 'Version Pro', component: ProVersionPage, icon: 'cash', separator: true }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      if (this.authCtrl.isLocal()) { // there's no internet access
        // show tickets from local storage
        this.rootPage = TicketsPage;
        // remove all menu links
        this.pages.length = 0;
      } else {
        // update profile in both case, but in a different way
        // and other configurations
        if (this.authCtrl.hasBeenAuthenticated()) {
          this.rootPage = TicketsPage;
          this.updateProfile(this.authCtrl.getCurrentUser());
          if (this.authCtrl.getCurrentUser().proVersion) {
            // remove pro version menu link since it's already a pro version
            this.pages.pop();
          }
        } else {
          this.rootPage = AuthenticationPage;
          this.AuthSubscription = this.sharedService.getAuthSubject()
            .subscribe(() => this.updateProfile(this.authCtrl.getCurrentUser()));
          this.ProSubscription = this.sharedService.getProSubject()
          .subscribe(() => {
            // update menu links
            this.pages.pop();
          });
        }
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private updateProfile(currentUser) {
    this.fullname = currentUser.fullname;
    this.photo = currentUser.photo;
  }

  public ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.AuthSubscription.unsubscribe();
    this.ProSubscription.unsubscribe();
  }
}
