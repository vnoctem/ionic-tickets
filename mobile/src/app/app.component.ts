import { ProVersionPage } from './../pages/pro-version/pro-version';
import { FriendsPage } from './../pages/friends/friends';
import { TicketsPage } from './../pages/tickets/tickets';
import { AuthenticationPage } from './../pages/authentication/authentication';
import { Component, ViewChild, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AuthController } from './../providers/auth-controller';
import { SharedService } from './../providers/shared-service';
import { HttpHelper } from './../providers/http-helper';
import { InternetService } from './../providers/internet-service';
import { Subscription } from 'rxjs/Subscription';

export class MenuItem {
  title: string
  component: any
  icon: string
  separator: boolean
  active: boolean
}

@Pipe({
  name: 'activeLinks',
  pure: false // also need to detect property's changes
})
export class ActiveLinksPipe implements PipeTransform {
  transform(links: any[]) {
    // filter items array, items which match and return true will be kept, false will be filtered out
    return links.filter(link => link.active);
  }
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnDestroy {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<MenuItem> = [
    { title: 'Billets', component: TicketsPage, icon: 'paper', separator: false, active: true },
    { title: 'Amis', component: FriendsPage, icon: 'person', separator: false, active: true },
    { title: 'Version Pro', component: ProVersionPage, icon: 'cash', separator: true, active: true }
  ];
  private fullname: string;
  private photo: string;

  private hasProSubscription: boolean = false;
  private hasAuthSubscription: boolean = false;

  private AuthSubscription: Subscription;
  private ProSubscription: Subscription;

  private connectSubscription: Subscription;
  private disconnectSubscription: Subscription;
  // for some reasons, onDisconnect is fired twice every time
  // so we need to make use of a boolean
  private isLocal: boolean = false;

  private restoreLinks() {
    for (let i = 0; i < this.pages.length; i++) {
      this.pages[i].active = true;
    }
  }

  constructor(public platform: Platform, public menuCtrl: MenuController, public authCtrl: AuthController, public sharedService: SharedService, public interService: InternetService, public helper: HttpHelper) {
    this.initializeApp();
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
        this.isLocal = true;
      } else {
        // update profile in both case, but in a different way
        // and other configurations
        if (this.authCtrl.hasBeenAuthenticated()) {
          this.rootPage = TicketsPage;
          this.updateProfile(this.authCtrl.getCurrentUser());
          if (this.authCtrl.getCurrentUser().proVersion) {
            // remove pro version menu link since it's already a pro version
            this.pages[2].active = false;
          }
        } else {
          this.rootPage = AuthenticationPage;
          this.AuthSubscription = this.sharedService.getAuthSubject()
            .subscribe(() => this.updateProfile(this.authCtrl.getCurrentUser()));
          this.ProSubscription = this.sharedService.getProSubject()
            .subscribe(() => {
              // update menu links
              this.pages[2].active = false;
            });
          this.hasAuthSubscription = this.hasProSubscription = true;
        }
      }
    });
  }

  // Respond after Angular initializes the component's views and child views
  // need to be done outside of ready(), preventing from crashing
  public ngAfterViewInit() {
    // watch network for a disconnect
    this.disconnectSubscription = this.interService.GetOnDisconnect().subscribe(() => {
      if (!this.isLocal) {
        this.menuCtrl.close();
        this.helper.showToast('Connexion perdue');
        this.nav.setRoot(TicketsPage);
        this.isLocal = true;
        if (this.hasAuthSubscription) {
          this.AuthSubscription.unsubscribe();
          this.hasAuthSubscription = false;
        }
        if (this.hasProSubscription) {
          this.ProSubscription.unsubscribe();
          this.hasProSubscription = false;
        }
      }
    });

    // watch network for a connection
    this.connectSubscription = this.interService.GetOnConnect().subscribe(() => {
      // We just got a connection but we need to wait briefly
      // before we determine the connection type.  Might need to wait
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.interService.hasInternetAccess()) {
          if (this.isLocal) {
            this.helper.showToast('Connexion rétablie');
            // restore menu links
            this.restoreLinks();
            this.isLocal = false;
            if (this.authCtrl.hasBeenAuthenticated()) {
              // reload the user saved in local storage
              this.authCtrl.refreshUser();
              this.updateProfile(this.authCtrl.getCurrentUser());
              if (this.authCtrl.getCurrentUser().proVersion) {
                // remove pro version menu link since it's already a pro version
                this.pages[2].active = false;
              } else {
                this.ProSubscription = this.sharedService.getProSubject()
                .subscribe(() => {
                  // update menu links
                  this.pages[2].active = false;
                });
                this.hasProSubscription = true;
              }
              // need to be the last line so that all code could be executed
              this.nav.setRoot(TicketsPage);
            } else {
              this.AuthSubscription = this.sharedService.getAuthSubject()
                .subscribe(() => this.updateProfile(this.authCtrl.getCurrentUser()));
              this.ProSubscription = this.sharedService.getProSubject()
                .subscribe(() => {
                  // update menu links
                  this.pages[2].active = false;
                });
              this.hasAuthSubscription = this.hasProSubscription = true;
              this.nav.setRoot(AuthenticationPage);
            }
          }
        }
      }, 3000);
    });
  }

  public openPage(page) {
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
    if (this.hasAuthSubscription) {
      this.AuthSubscription.unsubscribe();
    }
    if (this.hasProSubscription) {
      this.ProSubscription.unsubscribe();      
    }
    this.disconnectSubscription.unsubscribe();
    this.connectSubscription.unsubscribe();
  }
}
