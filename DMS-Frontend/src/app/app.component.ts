import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    signUpData=[{
        email:"neogeo@gmail.com",
        password:"neo123"
    }];
    constructor(private primengConfig: PrimeNGConfig) { }
    ngOnInit() {
    localStorage.setItem('signUpData',JSON.stringify(this.signUpData))
        localStorage.setItem('token','ellow');
        this.primengConfig.ripple = true;
    }
}
