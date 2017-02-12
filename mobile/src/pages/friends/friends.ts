import { ShowsPage } from './../shows/shows';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FriendController} from './../../providers/friend-controller';
import { AuthController } from './../../providers/auth-controller'
import { TicketController } from './../../providers/ticket-controller'

/*
  Generated class for the Friends page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
  providers: [FriendController]
})
export class FriendsPage {

  private isLocal: boolean = false;
  private friends: Array<any>;



  constructor(public navCtrl: NavController, public navParams: NavParams, public friendCtrl: FriendController, public authCtrl: AuthController) {
    friendCtrl.getFriends(
      authCtrl.getCurrentUser().id,
      authCtrl.getToken()
    ).then((res) => {
      this.friends = res;
    });
  }

  goToShows(friend) {
    this.navCtrl.push(ShowsPage, { 'friend': FriendsPage });
  }

}
