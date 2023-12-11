import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(private router: Router) {}

    ngOnInit() {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            this.router.navigate(['/auth/login']);
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
