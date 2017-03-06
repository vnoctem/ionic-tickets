import { ShowsPage } from './../shows/shows';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FriendController } from './../../providers/friend-controller';
import { AuthController } from './../../providers/auth-controller';
import { HttpHelper } from './../../providers/http-helper';
import { AuthenticationPage } from './../authentication/authentication';

/*
  Generated class for the Friends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',

})
export class FriendsPage {

  private friends: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public friendCtrl: FriendController, public authCtrl: AuthController, public helper: HttpHelper) {
    friendCtrl.getFriends(
      authCtrl.getCurrentUser().id,
      authCtrl.getToken()
    )
      .then(friends => {
        this.friends = friends;
      })
      .catch(err => {
        return this.helper.onHttpError(err, this.navCtrl, AuthenticationPage);
      })
      .catch(err => {});
  }

  public onRefresh(refresher) {
    this.friendCtrl.getFriends(
      this.authCtrl.getCurrentUser().id,
      this.authCtrl.getToken()
    )
      .then(friends => {
        this.friends = friends;
        refresher.complete();
      })
      .catch(err => {
        return this.helper.onHttpError(err, this.navCtrl, AuthenticationPage);
        // no need to call refresher since it will be destroyed when redirecting
      })
      .catch(err => {
        if (err.status == 0) { // api unavailable
          refresher.cancel();
        }
      });
  }

  goToShows(friend) {
    this.navCtrl.push(ShowsPage, { 'friend': friend });
  }

}
