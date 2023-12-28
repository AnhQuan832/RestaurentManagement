import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { StorageService } from '../services/storage.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    permission = [];
    constructor(
        public layoutService: LayoutService,
        private strSrv: StorageService
    ) {
        const user = this.strSrv.getItemLocal('user');
        this.permission = user?.permissions.map((item) => item.permissionName);
    }

    ngOnInit() {
        this.model = [
            {
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                        // hide: false,
                    },
                    {
                        label: 'Order',
                        icon: 'pi pi-fw pi-shopping-cart',
                        routerLink: ['/pages/order'],
                        // hide: true,
                    },
                    {
                        label: 'Menu',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/pages/menu'],
                        // hide: true,
                    },
                    {
                        label: 'Table',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['/pages/table'],
                        // hide: true,
                    },
                    {
                        label: 'Staff',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/pages/staff'],
                        // hide: true,
                    },
                    {
                        label: 'Statistic',
                        icon: 'pi pi-fw pi-chart-line',
                        routerLink: ['/pages/statistic'],
                        // hide: true,
                    },
                    {
                        label: 'Log out',
                        icon: 'pi pi-fw pi-sign-in',
                        routerLink: ['/auth/login'],
                        // hide: true,
                    },
                ],
            },
        ];

        const menu = [];
        this.model[0].items.forEach((item) => {
            if (this.permission?.includes(item.label)) menu.push(item);
        });
        menu.push({
            label: 'Log out',
            icon: 'pi pi-fw pi-sign-in',
            routerLink: ['/auth/login'],
        });
        this.model[0].items = menu;
    }
}
