import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    constructor() {

    }

    getUserRole() {
        return JSON.parse(localStorage.getItem('token'))?.role;
    }
}