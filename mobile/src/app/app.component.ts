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
import { Pipe, PipeTransform } from '@angular/core';

export class MenuItem {
  title: string 
  component: any 
  icon: string 
  separator: boolean 
  visible: boolean
}

// impure so that Angular doesn't ignore changes within objects
@Pipe({ name: 'visibleItems', pure: false })
export class VisibleItemsPipe implements PipeTransform {
  transform(items: MenuItem[]) {
    return items.filter(item => item.visible);
  }
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
      { title: 'Billets', component: TicketsPage, icon: 'paper', separator: false, visible: true },
      { title: 'Amis', component: FriendsPage, icon: 'person', separator: false, visible: true },
      { title: 'Version Pro', component: ProVersionPage, icon: 'cash', separator: true, visible: true }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // update profile in both case, but in a different way
      // and other configurations
      if (this.authCtrl.hasBeenAuthenticated()) {
        this.rootPage = TicketsPage;
        this.updateProfile(this.authCtrl.getCurrentUser());
        this.pages[2].visible = this.authCtrl.getCurrentUser().proVersion;
      } else {
        this.rootPage = AuthenticationPage;
        this.AuthSubscription = this.sharedService.getAuthSubject()
          .subscribe(() => this.updateProfile(this.authCtrl.getCurrentUser()));
        this.ProSubscription = this.sharedService.getProSubject()
        .subscribe(() => {
          // update in menu since it's not enough only setting the variable
          this.pages[2].visible = false;
        });
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
