import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        let data: any = localStorage.getItem('isAuthenticated');
        data = JSON.parse(data);
        if (data && localStorage.getItem('token')) {
            return true;
        }
        alert('Kindly Login Again');
        this.router.navigate(['/auth/login']);
        return false;
    }
}