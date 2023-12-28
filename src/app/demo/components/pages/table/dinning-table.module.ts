import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@NgModule({
    declarations: [TableComponent],
    imports: [
        CommonModule,
        TableRoutingModule,
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
        TagModule,
    ],
    providers: [MessageService, DialogService],
})
export class DiningTableModule {}
