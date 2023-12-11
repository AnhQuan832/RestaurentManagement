import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { forkJoin } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MenuService } from 'src/app/services/menu.service';
import _ from 'lodash';

@Component({
    selector: 'app-staff',
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.scss'],
})
export class StaffComponent {
    listDishes: any[] = [];
    status = ['PENDING'];
    displaySidebar: boolean = false;
    dish;
    category;
    newCate = '';
    avatarFile: FileList;
    logoUrl: string;
    isLoading = false;
    addDish: FormGroup;
    constructor(
        private dialogService: DialogService,
        private menuService: MenuService,
        private message: MessageService,
        private fileuploadService: FileUploadService,
        private builder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.getData();
        this.addDish = this.builder.group({
            foodId: this.builder.control(''),
            image: this.builder.control(
                'https://firebasestorage.googleapis.com/v0/b/advance-totem-350103.appspot.com/o/Avatar%2Fimage-holder-icon.png?alt=media&token=2bc0bac5-ea17-4dd9-8c9e-4813316da679'
            ),
            recipe: this.builder.control(''),
            name: this.builder.control('', Validators.required),
            price: this.builder.control('', Validators.required),
            categoryId: this.builder.control('', Validators.required),
            status: this.builder.control('PENDING', Validators.required),
        });
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
        if (row) {
            this.dish = _.cloneDeep(row);
            this.addDish.patchValue(this.dish);
        }

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

    saveEditedDish() {
        this.isLoading = true;

        this.addDish.get('image').setValue;
        if (this.dish.foodId)
            this.menuService.updateFood(this.dish).subscribe({
                next: (res) => {
                    this.isLoading = false;

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
                    this.isLoading = false;

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

    getCategoryName(id) {
        const cate = this.category.find((cate) => cate.categoryId === id);
        return cate ? cate.categoryName : '';
    }

    async selectedAvatar(event) {
        this.isLoading = true;
        this.avatarFile = event.target.files;
        const imgInput = <HTMLImageElement>document.getElementById('imgInput');
        await this.fileuploadService.pushFileToStorage(
            this.avatarFile[0],
            'Foods'
        );
        this.isLoading = false;

        this.dish.image = this.fileuploadService.getdownloadURL();
        imgInput.src = URL.createObjectURL(this.avatarFile[0]);
    }

    deleteFood(food) {
        this.menuService.deleteFood(food.foodId).subscribe({
            next: () => {
                this.message.add({
                    key: 'toast',
                    severity: 'success',
                    detail: 'Deleted',
                });
                this.getData();
            },
        });
    }
}
