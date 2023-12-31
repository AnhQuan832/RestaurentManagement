import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { StatisticComponent } from './statistic.component';

@NgModule({
    declarations: [StatisticComponent],
    imports: [
        CommonModule,
        StatisticRoutingModule,
        ChartModule,
        CalendarModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        TableModule,
    ],
})
export class StatisticModule {}
