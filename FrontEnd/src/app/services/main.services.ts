import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class MainServices {

    url = "http://localhost:3000/";
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    headers = {
        headers: new HttpHeaders({
            "auth-token": this.currentUser,
            "Content-Type": "application/json"
        })
    }

    constructor(
        private http: HttpClient
    ) {

        // console.log(this.currentUser.token);

    }

    getRequest(route) {
        let newRoute = this.url + route;
        return this.http.get(newRoute, this.headers);
    }

    PostRequest(route, body) {
        let newRoute = this.url + route;
        return this.http.post(newRoute, body, this.headers);
    }

    PutRequest(route, body) {
        let newRoute = this.url + route;
        return this.http.put(newRoute, body, this.headers);
    }

    DeleteRequest(route) {
        let newRoute = this.url + route;
        return this.http.delete(newRoute, this.headers);
    }

}