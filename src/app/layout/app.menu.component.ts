import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                items: [
                    // {
                    //     label: 'Auth',
                    //     icon: 'pi pi-fw pi-user',
                    //     items: [

                    //         {
                    //             label: 'Error',
                    //             icon: 'pi pi-fw pi-times-circle',
                    //             routerLink: ['/auth/error']
                    //         },
                    //         {
                    //             label: 'Access Denied',
                    //             icon: 'pi pi-fw pi-lock',
                    //             routerLink: ['/auth/access']
                    //         }
                    //     ]
                    // },

                    {
                        label: 'Order',
                        icon: 'pi pi-fw pi-shopping-cart',
                        routerLink: ['/pages/order'],
                    },
                    {
                        label: 'Menu',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/pages/menu'],
                    },
                    {
                        label: 'Table',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['/pages/table'],
                    },
                    {
                        label: 'Staff',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/pages/staff'],
                    },
                    {
                        label: 'Statistic',
                        icon: 'pi pi-fw pi-chart-line',
                        routerLink: ['/pages/statistic'],
                    },
                    {
                        label: 'Log out',
                        icon: 'pi pi-fw pi-sign-in',
                        routerLink: ['/auth/login'],
                    },
                ],
            },
        ];
    }
}
