import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {
    CaseControllerService,
    PatientControllerControllerService,
} from 'src/app/api/services';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    subscription!: Subscription;
    totalPatients = 0;
    constructor(private caseController: CaseControllerService) {}

    ngOnInit() {
        const { role, id } = JSON.parse(localStorage.getItem('user')) || {};
        this.getCasesCount(role, id);
    }

    getCasesCount(role, id) {
        let filter = {};
        if (role == 'admin') {
            filter = {};
        } else {
            filter = {
                userId: id,
            };
        }
        this.caseController
            .count({ where: JSON.stringify(filter) })
            .subscribe((res) => {
                this.totalPatients = res.count;
            });
    }

    // getCasesClosedCount(role, id){
    //     let filter = {};
    //    if (role == 'admin') {
    //     filter['where'] = {
    //         sta
    //     }
    //    } else {
    //     filter['where'] = {
    //         userId: id
    //     }
    //    }
    //    this.pateintControllerService.count(filter).subscribe((res) => {
    //     this.totalPatients = res.count;
    //    });
    // }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
