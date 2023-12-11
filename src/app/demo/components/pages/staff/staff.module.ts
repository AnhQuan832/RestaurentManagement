import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { StaffComponent } from './staff.component';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
    declarations: [StaffComponent],
    imports: [
        CommonModule,
        StaffRoutingModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        DialogModule,
        SidebarModule,
        ButtonModule,
        ToolbarModule,
        DropdownModule,
        ToastModule,
        InputNumberModule,
        OverlayPanelModule,
    ],
    providers: [MessageService, DialogService],
})
export class StaffModule {}
