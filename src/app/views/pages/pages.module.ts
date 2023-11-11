import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';



import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { GalleriaModule } from 'primeng/galleria';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

import { environment } from 'src/environments/environment'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { OrderComponent } from './order/order.component';
import { MenuComponent } from './menu/menu.component';
import { StaffComponent } from './staff/staff.component';
import { TableComponent } from './table/table.component';
import { StatisticComponent } from './statistic/statistic.component';



@NgModule({
  declarations: [
    LoginComponent,
    Page404Component,
    Page500Component,
    OrderComponent,
    MenuComponent,
    StaffComponent,
    TableComponent,
    StatisticComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    DividerModule,
    DividerModule,
    PaginatorModule,
    DataViewModule,
    RadioButtonModule,
    BreadcrumbModule,
    DynamicDialogModule,
    TableModule,
    InputTextareaModule,
    GalleriaModule,
    AvatarModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    TagModule,
    ConfirmDialogModule,
    TooltipModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    DropdownModule,
    InputNumberModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ]
})
export class PagesModule { }


