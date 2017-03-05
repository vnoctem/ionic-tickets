import { ShowsPage } from './../shows/shows';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FriendController } from './../../providers/friend-controller';
import { AuthController } from './../../providers/auth-controller'

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public friendCtrl: FriendController, public authCtrl: AuthController) {
    friendCtrl.getFriends(
      authCtrl.getCurrentUser().id,
      authCtrl.getToken()
    )
      .then(friends => {
        this.friends = friends;
      });
  }

  public onRefresh(refresher) {
    this.friendCtrl.getFriends(
      this.authCtrl.getCurrentUser().id,
      this.authCtrl.getToken()
    )
      .then(friends => {
        this.friends = friends;
        refresher.complete();
      });
  }

  goToShows(friend) {
    this.navCtrl.push(ShowsPage, { 'friend': friend });
  }

}
