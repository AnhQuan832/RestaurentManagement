import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, forkJoin } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { StatisticService } from 'src/app/services/statistic.service';
import { StorageService } from 'src/app/services/storage.service';
import * as moment from 'moment';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;
    lineData;
    generalData;
    constructor(
        public layoutService: LayoutService,
        private storageService: StorageService,
        private router: Router,
        private statisticService: StatisticService
    ) {}

    ngOnInit(): void {
        const params = {
            fromDate: moment()
                .clone()
                .startOf('month')
                .set({ hour: 7, minute: 0, second: 0, millisecond: 0 })
                .format('yyyy-MM-DD'),
            toDate: moment().clone().endOf('month').format('yyyy-MM-DD'),
            reportType: 'day',
        };

        forkJoin([
            this.statisticService.getRevenue(params),
            this.statisticService.getGeneral(params),
        ]).subscribe({
            next: (res) => {
                this.initChart(res[0]);
                this.generalData = res[1];
            },
        });
    }
    initChart(data) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const reportTime = data.map((i) =>
            moment(i.reportTime).format('DD/MM')
        );
        const value = data.map((item) => item.totalRevenue);
        this.lineData = {
            labels: reportTime,
            datasets: [
                {
                    label: 'Total Sell',
                    data: value,
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    borderColor:
                        documentStyle.getPropertyValue('--primary-500'),
                    tension: 0.4,
                },
            ],
        };
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
