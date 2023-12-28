import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { forkJoin } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import _ from 'lodash';
import { StaffService } from 'src/app/services/staff.service';

@Component({
    selector: 'app-staff',
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.scss'],
})
export class StaffComponent {
    listAccount: any[] = [];
    status = ['PENDING'];
    role = [
        {
            permissionId: 1,
            permissionName: 'Order',
            permits: [],
        },
        {
            permissionId: 2,
            permissionName: 'Menu',
            permits: [],
        },
        {
            permissionId: 3,
            permissionName: 'Table',
            permits: [],
        },
        {
            permissionId: 4,
            permissionName: 'Staff',
            permits: [],
        },
        {
            permissionId: 5,
            permissionName: 'Dashboard',
            permits: [],
        },
    ];
    gender = [
        {
            id: true,
            name: 'Male',
        },
        {
            id: false,
            name: 'Female',
        },
    ];
    displaySidebar: boolean = false;
    account;
    category;
    newCate = '';
    avatarFile: FileList;
    logoUrl: string;
    isLoading = false;
    addAccount: FormGroup;
    constructor(
        private dialogService: DialogService,
        private message: MessageService,
        private fileuploadService: FileUploadService,
        private builder: FormBuilder,
        private accountService: StaffService
    ) {}

    ngOnInit(): void {
        this.getData();
        this.addAccount = this.builder.group({
            accountId: this.builder.control(''),
            avatar: this.builder.control(
                'https://res.cloudinary.com/dwskvqnkc/image/upload/v1698909675/menu_minder_store/img_default_elml1l.jpg'
            ),
            name: this.builder.control('', Validators.required),
            email: this.builder.control('', Validators.required),
            password: this.builder.control('', Validators.required),
            // dateOfBirth: this.builder.control(null, Validators.required),
            gender: this.builder.control(true, Validators.required),
            phoneNumber: this.builder.control('', Validators.required),
            createdAt: this.builder.control(''),
            updatedAt: this.builder.control(''),
            permissionIds: this.builder.control(null),
        });
    }

    getData() {
        this.accountService.getListStaff().subscribe({
            next: (res) => {
                this.listAccount = res;
            },
        });
    }

    getDetail(id) {
        this.accountService.getDetail(id).subscribe({
            next: (res) => {
                this.account = res;
            },
        });
    }

    viewDetails(row: any): void {
        if (row) {
            this.account = _.cloneDeep(row);
            this.addAccount.patchValue(this.account);
        }
        this.displaySidebar = true;
        // this.addAccount.get('email').disable();
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

    saveEditedAccount() {
        this.isLoading = true;
        this.addAccount.get('avatar').setValue(this.logoUrl);
        if (this.account.accountId) {
            const data = this.addAccount.getRawValue();
            this.accountService.updateInfo(data).subscribe({
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
            this.accountService
                .addNewStaff(this.addAccount.getRawValue())
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

        this.account.image = this.fileuploadService.getdownloadURL();
        imgInput.src = URL.createObjectURL(this.avatarFile[0]);
    }

    lockAccount(acc) {
        this.accountService.deleteAccount(acc.email).subscribe({
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
