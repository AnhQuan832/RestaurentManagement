import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
        { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
        { path: 'staff', loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule) },
        { path: 'statistic', loadChildren: () => import('./statistic/statistic.module').then(m => m.StatisticModule) },
        { path: 'table', loadChildren: () => import('./table/table.module').then(m => m.TableModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
