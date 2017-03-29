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
  private message: string;
  private loading: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public friendCtrl: FriendController, public authCtrl: AuthController, public helper: HttpHelper) {
    this.message = 'En cours de chargement ...';
    this.loading = true;

    friendCtrl.getFriends(authCtrl.getToken())
      .then(friends => {
        this.message = '';
        this.loading = false;
        this.friends = this.ensureListNotEmpty(friends);
      })
      .catch(err => {
        this.message = '';
        this.loading = false;
        this.manageErrors(err);
        //return this.helper.onHttpError(err);
      });
      /*.catch(err => {
        this.manageErrors(err);
      });*/
  }

  public onRefresh(refresher) {
    this.friendCtrl.getFriends(this.authCtrl.getToken())
      .then(friends => {
        this.message = '';
        this.friends = this.ensureListNotEmpty(friends);
        refresher.complete();
      })
      .catch(err => {
        this.manageErrors(err);
        refresher.cancel();
        //return this.helper.onHttpError(err);
        // no need to call refresher since it will be destroyed when redirecting
      });
    /*.catch(err => {
      if (!err.redirect) {
        refresher.cancel();
      }
      this.manageErrors(err);
    });*/
  }

  private ensureListNotEmpty(list: any) {
    if (list.length == 0) {
      this.message = 'Aucun ami à afficher';
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
    }
    /*if (err.redirect) {
      this.navCtrl.setRoot(AuthenticationPage, {
        'error': err.message
      });
    } else if (err.message) {
      this.message = err.message;
    }*/
  }

  public goToShows(friend) {
    this.navCtrl.push(ShowsPage, { 'friend': friend });
  }

}
