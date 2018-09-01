import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NotificationsServices } from './notifications.services';


@Injectable({
    providedIn: 'root'
})
export class MainServices {

    // url = "http://localhost:3000/";
    url = "https://testfordeg.herokuapp.com/"; // production
    currentUser;

    headers;
    constructor(
        private http: HttpClient,
        private router: Router,
        private mess: NotificationsServices
    ) {

        this.getToken();
    }

    ifTokenExpired(err){
        // console.log(err);
        if(typeof err === "string"){
            if(err.includes("invalid") || err.includes("denied") || err.includes("Unauthorized")){
                localStorage.removeItem("currentUser");
                this.router.navigateByUrl('/login');
            }
        }else {
            console.log(err.text);
            this.mess.showMessage("Main Services", err.text, "error");
        }
    }

    getToken() {
        if (JSON.parse(localStorage.getItem("currentUser"))) {
            this.currentUser = localStorage.getItem("currentUser");
            this.setHeaders(this.currentUser);
        } else {
            this.router.navigateByUrl('/login');
        }
    }

    setHeaders(user) {
        let token = JSON.parse(user).token;
        // console.log(token);
        this.headers = new HttpHeaders()
            .set("auth-token", token)
            .set("Content-Type", "application/json");
    }

    getRequest(route) {
        let newRoute = this.url + route;
        return this.http.get(newRoute, { headers: this.headers })
            .pipe(catchError((error, caught) => {
                // console.log("error", error);
                this.ifTokenExpired(error.error);
                return throwError(error);
            })) as any;
    }

    PostRequest(route, body) {
        let newRoute = this.url + route;
        return this.http.post(newRoute, body, { headers: this.headers })
        .pipe(catchError((error, caught) => {
            // console.log("error", error);
            this.ifTokenExpired(error.error);
            return throwError(error);
        })) as any;
    }

    PutRequest(route, body) {
        let newRoute = this.url + route;
        return this.http.put(newRoute, body, { headers: this.headers })
        .pipe(catchError((error, caught) => {
            // console.log("error", error);
            this.ifTokenExpired(error.error);
            return throwError(error);
        })) as any;
    }

    DeleteRequest(route) {
        let newRoute = this.url + route;
        return this.http.delete(newRoute, { headers: this.headers })
        .pipe(catchError((error, caught) => {
            // console.log("error", error);
            this.ifTokenExpired(error.error);
            return throwError(error);
        })) as any;
    }

    handleError() {

    }

}