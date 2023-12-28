import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { StorageService } from 'src/app/services/storage.service';
import { DataView } from 'primeng/dataview';
import { MenuService } from 'src/app/services/menu.service';
import { OrderService } from 'src/app/services/order.service';
import { forkJoin } from 'rxjs';
import { TableService } from 'src/app/services/table.service';
@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;
    statuses = [
        { label: 'Available', value: 'Available' },
        { label: 'Occupied', value: 'Occupied' },
        { label: 'Preparing', value: 'Preparing' },
    ];
    tables;

    listServing;
    listFoodOrder = [];
    listFood;
    category;
    selectedServing;
    product: any = {};
    servingDetail;
    totalPrice;
    selectedTables: any[] = [];

    submitted: boolean = false;

    rowsPerPageOptions = [5, 10, 20];

    ref: DynamicDialogRef;
    showServing: boolean = true;
    constructor(
        private router: Router,
        private dialogService: DialogService,
        private storageSerive: StorageService,
        private messageService: MessageService,
        private menuService: MenuService,
        private orderService: OrderService,
        private tableService: TableService
    ) {}

    ngOnInit() {
        this.getData();
    }

    getData() {
        forkJoin([
            this.menuService.getMenu(),
            this.menuService.getListCategory(),
            this.tableService.getListTable(),
            this.orderService.getListServing(),
        ]).subscribe({
            next: (res) => {
                this.listFood = res[0];
                this.category = res[1];
                this.tables = res[2];
                this.listServing = res[3];
                this.listServing.forEach(
                    (item) =>
                        (item.serving['tables'] = item.tables.map(
                            (item) => item.tableNumber
                        ))
                );
            },
        });
    }

    onRowSelect(data) {
        this.storageSerive.setItemLocal('currentProduct', data);
        this.router.navigate([
            `pages/product/product-detail/${data.productId}`,
        ]);
    }

    public showToast(message, type) {
        this.messageService.add({
            key: 'toast',
            severity: type,
            detail: message,
        });
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.tables = this.tables.filter(
            (val) => !this.selectedTables.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000,
        });
        this.selectedTables = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.tables = this.tables.filter((val) => val.id !== this.product.id);
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000,
        });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.tables.length; i++) {
            if (this.tables[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createOrder() {
        const user = this.storageSerive.getItemLocal('user');
        console.log(user);
        const createdBy = user.accountId;
        const diningTableIds = this.selectedTables.map((item) => item.tableId);
        this.orderService
            .createServing(createdBy, 4, new Date(), diningTableIds)
            .subscribe({
                next: (res: any) => {
                    this.messageService.add({
                        key: 'toast',
                        severity: 'success',
                        detail: 'Create success',
                    });
                },
                error: (err) => {
                    this.messageService.add({
                        key: 'toast',
                        severity: 'error',
                        detail: err.error.message,
                    });
                },
            });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value, 'contains');
    }

    getSeverity(status) {
        switch (status) {
            case 'PREPARING':
            case 'PROCESSING':
                return 'info';
            case 'OCCUPIED':
                return 'danger';
            case 'AVAILABLE':
                return 'success';
            default:
                return 'warning';
        }
    }

    onChangeTab($event) {
        console.log($event.index);
    }

    onAddDish(event) {
        console.log(event);
        this.messageService.add({
            key: 'toast',
            severity: 'success',
            detail: 'Added to bill',
        });
    }

    getCategoryName(id) {
        const cate = this.category.find((cate) => cate.categoryId === id);
        return cate ? cate.categoryName : '';
    }

    onServingSelect(ser) {
        this.selectedServing = ser;
        this.orderService.getServingDetail(ser.serving.servingId).subscribe({
            next: (res: any) => {
                console.log(res);
                this.servingDetail = res.data.servingResult.foodOrder;
                this.totalPrice = res.data.totalPrice;
                console.log(this.servingDetail);
            },
            error: (err) => {
                console.log(err.error);
            },
        });
    }

    orderFood(food) {
        console.log(food);
        const params = {
            foodId: food.foodId,
            servingId: this.selectedServing.serving.servingId,
            quantity: 1,
            note: '',
            price: food.price,
        };
        this.listFoodOrder.push(params);
        this.orderService
            .createOrderFood(
                this.selectedServing.serving.servingId,
                this.listFoodOrder
            )
            .subscribe({
                next: (res) => {
                    this.messageService.add({
                        key: 'toast',
                        severity: 'success',
                        detail: 'Add food',
                    });
                    this.listFoodOrder = [];
                },
                error: (err) => {
                    console.log(err.error);
                },
            });
    }
}
