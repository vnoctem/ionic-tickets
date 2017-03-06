import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShowController } from './../../providers/show-controller';
import { AuthController } from './../../providers/auth-controller';

/*
  Generated class for the Shows page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shows',
  templateUrl: 'shows.html'
})
export class ShowsPage {

  private shows: Array<any>;
  private friend: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public showCtrl: ShowController, public authCtrl: AuthController) {
    this.friend = navParams.get('friend');

    showCtrl.getShows(
      this.friend.id,
      authCtrl.getToken()
    )
      .then(shows => {
        this.shows = shows;
      });
  }

  public onRefresh(refresher) {
    this.showCtrl.getShows(
      this.friend.id,
      this.authCtrl.getToken()
    )
      .then(shows => {
        this.shows = shows;
        refresher.complete();
      });
  }

}
