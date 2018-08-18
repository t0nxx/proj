import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class MainServices {

    url = "http://localhost:3000/";

    constructor(
        private http: HttpClient
    ) {

    }

    getRequest(route) {
        let newRoute = this.url + route;
        return this.http.get(newRoute);
    }

    PostRequest(route, body) {
        let newRoute = this.url + route;
        return this.http.post(newRoute, body);
    }

    PutRequest(route, body) {
        let newRoute = this.url + route;
        return this.http.put(newRoute, body);
    }

    DeleteRequest(route) {
        let newRoute = this.url + route;
        return this.http.delete(newRoute);
    }

}