import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { FileUploadService } from 'src/app/services/file-upload.service';
import _ from 'lodash';
import { TableService } from 'src/app/services/table.service';
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent {
    listTable: any[] = [];
    status = ['PENDING', 'AVAILABLE', 'PERSERVING'];
    role = ['Table', 'Admin'];

    displaySidebar: boolean = false;
    table;
    category;
    newCate = '';
    avatarFile: FileList;
    logoUrl: string;
    isLoading = false;
    addTable: FormGroup;
    constructor(
        private dialogService: DialogService,
        private message: MessageService,
        private fileuploadService: FileUploadService,
        private builder: FormBuilder,
        private tableService: TableService
    ) {}

    ngOnInit(): void {
        this.getData();
        this.addTable = this.builder.group({
            tableId: this.builder.control(''),
            tableNumber: this.builder.control('', Validators.required),
            capacity: this.builder.control('', Validators.required),
            status: this.builder.control('', Validators.required),
        });
    }

    getData() {
        this.tableService.getListTable().subscribe({
            next: (res) => {
                this.listTable = res;
            },
        });
    }

    getDetail(id) {
        this.tableService.getDetail(id).subscribe({
            next: (res) => {
                this.table = res;
            },
        });
    }

    viewDetails(row: any): void {
        if (row) {
            this.table = _.cloneDeep(row);
            this.addTable.patchValue(this.table);
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

    saveEditedTable() {
        this.isLoading = true;
        if (this.table.tableId) {
            this.tableService.updateInfo(this.addTable.value).subscribe({
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
                error: (msg) => {
                    this.isLoading = false;
                    this.message.add({
                        key: 'toast',
                        severity: 'error',
                        detail: msg,
                    });
                },
            });
        } else
            this.tableService
                .addNewTable(this.addTable.getRawValue())
                .subscribe({
                    next: (res) => {
                        this.isLoading = false;
                        this.message.add({
                            key: 'toast',
                            severity: 'success',
                            detail: 'Success',
                        });
                        this.displaySidebar = false;
                        this.getData();
                    },
                    error: (msg) => {
                        this.isLoading = false;
                        this.isLoading = false;
                        this.message.add({
                            key: 'toast',
                            severity: 'error',
                            detail: msg,
                        });
                    },
                });
    }

    async selectedAvatar(event) {
        this.isLoading = true;
        this.avatarFile = event.target.files;
        const imgInput = <HTMLImageElement>document.getElementById('imgInput');
        await this.fileuploadService.pushFileToStorage(
            this.avatarFile[0],
            'Avatars'
        );
        this.isLoading = false;

        this.table.image = this.fileuploadService.getdownloadURL();
        imgInput.src = URL.createObjectURL(this.avatarFile[0]);
    }

    lockTable(acc) {
        this.tableService.deleteTable(acc.email).subscribe({
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
