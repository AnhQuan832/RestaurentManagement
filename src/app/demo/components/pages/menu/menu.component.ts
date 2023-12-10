import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { forkJoin } from 'rxjs';
import { MenuService } from 'src/app/services/menu.service';
import _ from 'lodash';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    providers: [DialogService, MessageService],
})
export class MenuComponent implements OnInit {
    @ViewChild('op') op: any;
    listDishes: any[] = [];

    searchText: string = '';
    displaySidebar: boolean = false;
    selectedDish: any;
    displayDialog: boolean = false;
    newDish: any = {};
    dt: any; // Thêm thuộc tính dt
    editingDish: any;
    dish;
    category;
    newCate = '';
    constructor(
        private dialogService: DialogService,
        private menuService: MenuService,
        private message: MessageService
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        forkJoin([
            this.menuService.getMenu(),
            this.menuService.getListCategory(),
        ]).subscribe({
            next: (res) => {
                this.listDishes = res[0];
                this.category = res[1];
            },
        });
    }

    getCategory() {
        this.menuService.getListCategory().subscribe({
            next: (res) => {
                this.listDishes = res[0];
                this.category = res[1];
            },
        });
    }

    getFoodDetail(id) {
        this.menuService.getFoodDetail(id).subscribe({
            next: (res) => {
                this.dish = res;
            },
        });
    }

    viewDetails(row: any): void {
        this.dish = _.cloneDeep(row);
        this.displaySidebar = true;
    }

    hideSidebar(): void {
        this.displaySidebar = false;
    }

    toggleSidebar(): void {
        this.displaySidebar = !this.displaySidebar;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
    deleteDish(row: any) {
        // Hiển thị hộp thoại xác nhận xóa
        if (confirm(`Are you sure you want to delete ${row.dishName}?`)) {
            // Thực hiện logic xóa món ăn khỏi danh sách
            const index = this.listDishes.indexOf(row);
            if (index !== -1) {
                this.listDishes.splice(index, 1);
            }
        }
    }
    cancelDish() {
        this.displayDialog = false; // Đóng form
    }

    saveEditedDish() {
        if (this.dish.foodId)
            this.menuService.updateFood(this.dish).subscribe({
                next: (res) => {
                    this.message.add({
                        key: 'toast',
                        severity: 'success',
                        detail: 'Updated',
                    });
                    this.displaySidebar = false;
                    this.getData();
                },
            });
        else
            this.menuService.createFood(this.dish).subscribe({
                next: (res) => {
                    this.message.add({
                        key: 'toast',
                        severity: 'success',
                        detail: 'Updated',
                    });
                    this.displaySidebar = false;
                    this.getData();
                },
            });
    }

    cancelEdit() {
        // Hủy bỏ sự chỉnh sửa và đặt lại giá trị của `editingDish` về null.
        this.editingDish = null;
    }

    getCategoryName(id) {
        const cate = this.category.find((cate) => cate.categoryId === id);
        return cate ? cate.categoryName : '';
    }

    addNewCate() {
        this.menuService
            .createCategory({ categoryName: this.newCate })
            .subscribe({
                next: (res) => {
                    this.getFoodDetail(this.dish.foodId);
                    this.getCategory();
                    this.op.hide();
                },
            });
    }
}
