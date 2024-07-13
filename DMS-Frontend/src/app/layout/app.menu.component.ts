import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                roles: ['admin', 'doctor'],
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Patient Management',
                roles: ['admin', 'doctor'],
                items: [
                    { label: 'Cases', icon: 'pi pi-fw pi-briefcase', routerLink: ['/case/list'] }
                ]
            }
        ];

        const role = JSON.parse(localStorage.getItem('user'))?.role;
        if(role) {
            this.model = this.model.filter((item) => item.roles.includes(role));
        }
    }
}
