import { Injectable } from '@angular/core';

/*
  Generated class for the StorageService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageService {

  public saveObject(key: string, item: any) {
    // Local storage only stores string
    localStorage.setItem(key, JSON.stringify(item));
  }

  public loadObject(key: string) {
    // For the same reason, we need to convert back to JSON
    return JSON.parse(localStorage.getItem(key));
  }

}
