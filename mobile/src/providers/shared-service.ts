import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

/*
  Generated class for the SharedService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SharedService {

  // once the user is authenticated
  private authSubject = new Subject<any>();

  public getAuthSubject() : Observable<any> {
    return this.authSubject.asObservable();
  }

  public notifyAuthSubscribers() {
    this.authSubject.next();
  }

}
