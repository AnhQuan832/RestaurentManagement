import { Component, Inject } from '@angular/core';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { StatisticService } from 'src/app/services/statistic.service';
import * as _ from 'lodash';
import { dA } from '@fullcalendar/core/internal-common';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent {
    lineData;
    rangeDates;
    listInvoice;
    listRevenue;
    genParam;
    exportColumns;
    exportImColumns;
    listBill;
    statOption = [
        // {
        //     id: 'day',
        //     name: 'Today',
        // },
        {
            id: 'week',
            name: 'This Week',
        },
        {
            id: 'month',
            name: 'This Month',
        },
        {
            id: 'year',
            name: 'This Year',
        },
        {
            id: 'SPECIFIC',
            name: 'Specicfic Day',
        },
    ];
    cols = [
        { field: 'servingId', header: 'Serving ID' },
        { field: 'totalPrice', header: 'Total' },
    ];

    reveneCols = [
        { field: 'reportDate', header: 'Date' },
        { field: 'totalRevenue', header: 'Total' },
    ];

    exportRe;
    selectedOption = null;
    mostView;
    mostBuy;
    reveParams;
    constructor(
        private statisticService: StatisticService,
        private orderService: OrderService
    ) {}

    ngOnInit(): void {
        const params = {
            fromDate: moment()
                .clone()
                .startOf('week')
                .set({ hour: 7, minute: 0, second: 0, millisecond: 0 })
                .format('yyyy-MM-DD'),
            toDate: moment().clone().endOf('week').format('yyyy-MM-DD'),
            reportType: 'day',
        };
        this.reveParams = params;

        this.getData(params);
        this.exportColumns = this.cols.map((col) => ({
            title: col.header,
            dataKey: col.field,
        }));
        this.exportRe = this.reveneCols.map((col) => ({
            title: col.header,
            dataKey: col.field,
        }));
    }
    initChart(data) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const reportTime = data.map((i) =>
            this.selectedOption.id === 'year'
                ? moment(i.reportDate).format('MM')
                : moment(i.reportDate).format('DD/MM')
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

    onDateChange() {
        const params = {
            fromDate: moment(this.rangeDates[0])
                .set({
                    hour: 7,
                    minute: 0,
                    second: 0,
                    millisecond: 0,
                })
                .format('yyyy-MM-DD'),
            toDate: moment(this.rangeDates[1])
                .set({
                    hour: 7,
                    minute: 0,
                    second: 0,
                    millisecond: 0,
                })
                .format('yyyy-MM-DD'),
            reportType: 'day',
        };
        this.reveParams = params;
        this.getData(params);
    }

    getData(params) {
        forkJoin([
            this.statisticService.getRevenue(params),
            this.orderService.getBills(),
        ]).subscribe({
            next: (res) => {
                this.listInvoice = res[0];
                this.initChart(res[0]);
                this.listBill = res[1];
            },
        });
    }

    onOptionChange() {
        if (this.selectedOption.id !== 'SPECIFIC') {
            this.rangeDates = null;
            const params = {
                fromDate: moment()
                    .clone()
                    .startOf(this.selectedOption.id)
                    .set({ hour: 7, minute: 0, second: 0, millisecond: 0 })
                    .format('yyyy-MM-DD'),
                toDate: moment()
                    .clone()
                    .endOf(this.selectedOption.id)
                    .format('yyyy-MM-DD'),
                reportType: this.selectedOption.id === 'year' ? 'month' : 'day',
            };
            this.reveParams = params;

            this.getData(params);
            let days = 0;
            switch (this.selectedOption.id) {
                case 'week':
                    days = 7;
                    break;
                case 'month':
                    days = 30;
                    break;
                default:
                    days = 365;
            }
        }
    }

    generatePDF() {
        this.statisticService.getRevenue(this.reveParams).subscribe({
            next: (res) => {
                this.listInvoice = res;
                this.listInvoice.forEach((item) => {
                    item.reportDate = moment(item.reportDate).format(
                        'DD/MM/YYYY'
                    );
                    item.totalRevenue = item.totalRevenue.toLocaleString();
                });
                import('jspdf').then((jsPDF) => {
                    import('jspdf-autotable').then((x) => {
                        const doc = new jsPDF.default('p', 'px', 'a4');
                        doc.text('REVENUE', 200, 20);

                        (doc as any).autoTable(this.exportRe, this.listInvoice);

                        doc.save('reports.pdf');
                    });
                });
            },
        });
    }

    generateInvoicePDF() {
        this.orderService.getBills().subscribe({
            next: (res) => {
                this.listRevenue = res;
                this.listRevenue.forEach((item) => {
                    item.totalPrice = item.totalPrice.toLocaleString();
                });
                import('jspdf').then((jsPDF) => {
                    import('jspdf-autotable').then((x) => {
                        const doc = new jsPDF.default('p', 'px', 'a4');
                        doc.text('INVOICE', 200, 20);

                        (doc as any).autoTable(
                            this.exportColumns,
                            this.listRevenue
                        );

                        doc.save('reports.pdf');
                    });
                });
            },
        });
    }
}
