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
  private message: string;
  private loading: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public showCtrl: ShowController, public authCtrl: AuthController, public helper: HttpHelper) {
    this.friend = navParams.get('friend');
    this.message = 'En cours de chargement ...';
    this.loading = true;

    showCtrl.getShows(
      this.friend.id,
      authCtrl.getToken()
    )
      .then(shows => {
        this.message = '';
        this.loading = false;
        this.shows = this.ensureListNotEmpty(shows);
      })
      .catch(err => {
        this.message = '';
        this.loading = false;
        this.manageErrors(err);
      });
  }

  public onRefresh(refresher) {
    this.showCtrl.getShows(
      this.friend.id,
      this.authCtrl.getToken()
    )
      .then(shows => {
        this.message = '';
        this.shows = this.ensureListNotEmpty(shows);
        refresher.complete();
      })
      .catch(err => {
         refresher.cancel();
        this.manageErrors(err);
      });
  }

  private ensureListNotEmpty(list: any) {
    if (list.length == 0) {
      this.message = 'Aucun spectacle à afficher';
      return [];
    }
    return list;
  }

  private manageErrors(err: any) {
    if (err.status == 0) { // API is unavailable
      this.message = 'Le serveur n\'est pas disponible.'
    } else if (err.status == 401) { // Unauthorized : Probably because the token has expired or is invalid
      this.navCtrl.setRoot(AuthenticationPage,
        {
          'error': 'Votre session a expiré.'
        }
      );
    } else {
      this.message = 'Une erreur inconnue est survenue.';
    }
  }

}
