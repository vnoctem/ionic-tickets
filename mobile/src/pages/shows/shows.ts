import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShowController } from './../../providers/show-controller';
import { AuthController } from './../../providers/auth-controller';
import { HttpHelper } from './../../providers/http-helper';
import { AuthenticationPage } from './../authentication/authentication';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public showCtrl: ShowController, public authCtrl: AuthController, public helper: HttpHelper) {
    this.friend = navParams.get('friend');

    showCtrl.getShows(
      this.friend.id,
      authCtrl.getToken()
    )
      .then(shows => {
        //this.shows = this.helper.ensureListNotEmpty(shows, 'Aucun spectacle à afficher');
      })
      .catch(err => {
        //return this.helper.onHttpError(err, this.navCtrl, AuthenticationPage);
      })
      .catch(err => {});
  }

  public onRefresh(refresher) {
    this.showCtrl.getShows(
      this.friend.id,
      this.authCtrl.getToken()
    )
      .then(shows => {
        //this.shows = this.helper.ensureListNotEmpty(shows, 'Aucun spectacle à afficher');
        refresher.complete();
      })
      .catch(err => {
        //return this.helper.onHttpError(err, this.navCtrl, AuthenticationPage);
        // no need to call refresher since it will be destroyed when redirecting
      })
      .catch(err => {
        if (err.status == 0) { // api unavailable
          refresher.cancel();
        }
      });
  }

}
