import { Injectable } from '@angular/core';
import { AppSettings } from './app-settings';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AuthController {
    private socialApiUrl: string = this.appSettings.getSocialApiUrl();
    
    constructor(public http: Http, public appSettings: AppSettings) {
    }

    public postLogin(data: any) {
        return this.http.post(this.socialApiUrl + 'login', data)
            .map(res => res.json()).toPromise();
    }

}