import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { TableModule } from 'primeng/table';
import { MenuComponent } from './menu.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    TableModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    SidebarModule,
    ButtonModule,
    
  ]

})
export class MenuModule { }
