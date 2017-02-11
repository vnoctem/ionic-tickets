import { Injectable } from '@angular/core';

const CONFIG = {
    socialApiUrl: 'http://127.0.0.1:3000/api/'
}

@Injectable()
export class AppSettings {
    
    constructor() {
    }

    public getSocialApiUrl() {
        return CONFIG.socialApiUrl;
    }

}