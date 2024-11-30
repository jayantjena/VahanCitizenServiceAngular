//Task ID:3913 By BS on 20181206 called clear session function in logout function as discussed with Navin Sir
//Task ID:3913 By BS on 20181206 removed router discussed with Navin Sir  

import { Injectable, Inject } from '@angular/core';

//import { Router } from '@angular/router';

@Injectable()
export class SessionService {
    public data: any = [];

    constructor() 
    {

    }

    saveInLocal(key, val): void {
        var myStorage = window.localStorage;
        myStorage.setItem(key, btoa(val));
    }

    saveSettingInLocal(key, val): void {
        var myStorage = window.localStorage;
        myStorage.setItem(key, btoa(val));
    }

    saveInLocalSession(key, val): void {
        var myStorage = window.localStorage;
        myStorage.setItem(key, btoa(val));
    }

    getFromLocal(key): any {
        var myStorage = window.localStorage;
        if (myStorage.getItem(key) == null || myStorage.getItem(key) == "") {
            return "";
        } else {
            this.data = myStorage.getItem(key);
            return atob(this.data);
        }
    }

    getSettingFromLocal(key): any {
        var myStorage = window.localStorage;
        if (myStorage.getItem(key) == null || myStorage.getItem(key) == "") {
            return "Setting Not Found";
        } else {
            this.data = myStorage.getItem(key);
            return atob(this.data);
        }
    }

    // getFromLocalSession(key): any {
    //     var myStorage = window.localStorage;
    //     if (myStorage.getItem(key) == null || myStorage.getItem(key) == "") {
    //         return "";
    //     } else {
    //         this.data = myStorage.getItem(key);
    //         return atob(this.data);
    //     }
    // }

    removeFromLocal(key): void {
        window.localStorage.removeItem(key);
        console.log(this.data);
    }

    private setSession(authResult) {
        const expiresAt = new Date().setSeconds(authResult.expiresIn);
        this.saveInLocal('token', authResult.idToken);
        this.saveInLocal("expires_at", JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        this.clearSessionStorage();
        //this.router.navigate(['/login']);        
    }

    clearSessionStorage(){
        this.removeFromLocal("token");
        this.removeFromLocal("expires_at");
        this.removeFromLocal("UserCode");
        this.removeFromLocal("UserId");
        this.removeFromLocal("password");
        this.removeFromLocal("sharedData");
        this.removeFromLocal("AppId");
        this.removeFromLocal("Theme");
        this.removeFromLocal("Lang");
        this.removeFromLocal("AppName");
        this.removeFromLocal("DateFormat");
        this.removeFromLocal("AppIconName");

        this.removeFromLocal("TimeZone");
        this.removeFromLocal("AuthenticationMode");
        this.removeFromLocal("DateFormat");
        this.removeFromLocal("TimeFormat");
        this.removeFromLocal("ProgramURL");
        this.removeFromLocal("ProgramAppURL");
        this.removeFromLocal("ProgramBreadCrumb");
        this.removeFromLocal("LastApiHitTime");
        this.removeFromLocal("TenantId");
        this.removeFromLocal("BaseOrgCode");


    }

    public isLoggedIn() {
        try{
        const expiration = this.getFromLocal("expires_at");
        if (expiration == null || expiration=="")
            return false;    // set false when expiry time not found as discussed with shelender sir

        const expiresAt = JSON.parse(expiration);
        const now = new Date();
        let tokenExpiryTime = new Date(this.getFromLocal('TokenIssueTime'));
        tokenExpiryTime.setSeconds(tokenExpiryTime.getSeconds() + parseInt(expiresAt.toString()));

        const isloggedin = now < tokenExpiryTime ? true : false;
        return isloggedin;
        }catch(ex){
            return false;
        }
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = this.getFromLocal("expires_at");
        const expiresAt = JSON.parse(expiration);
        return expiresAt;
    }

    //clear session after particular time interval
    // setTimoutSession(key):void{
    //     setTimeout(function () {
    //         console.log('session expired');
    //         window.localStorage.removeItem(key);
    //     }, 300000); //5 min
    // }

}
