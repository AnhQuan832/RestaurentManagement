import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { StaffComponent } from './staff/staff.component';
import { TableComponent } from './table/table.component';
import { StatisticComponent } from './statistic/statistic.component';
import { OrderComponent } from './order/order.component';



const routes: Routes = [

  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'menu',
    component: MenuComponent,
    data: {
      title: 'Menu'
    }
  },
  {
    path: 'order',
    component: OrderComponent,
    data: {
      title: 'Order'
    }
  },
  {
    path: 'table',
    component: TableComponent,
    data: {
      title: 'Table'
    }
  },
  {
    path: 'statistic',
    component: StatisticComponent,
    data: {
      title: 'Statistic'
    }
  },
  {
    path: 'staff',
    component: StaffComponent,
    data: {
      title: 'Staff'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
