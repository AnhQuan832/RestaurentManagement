import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { er } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    providers: [MessageService],
})
export class ChangePasswordComponent {
    password;
    reEnterPassword;

    protected isSubmitted: boolean = false;
    protected msgError: string;
    constructor(
        public layoutService: LayoutService,
        private loginService: LoginService,
        private router: Router,
        private storageService: StorageService,
        private msg: MessageService
    ) {}

    changePassword() {
        this.loginService
            .changePass({
                password: this.password,
                newPassword: this.reEnterPassword,
            })
            .subscribe({
                next: (res) => {
                    this.msg.add({
                        key: 'toast',
                        severity: 'success',
                        detail: 'Password has been updated. Please login again',
                    });

                    setTimeout(() => {
                        this.router.navigate(['/auth/login']);
                    }, 1500);
                },
                error: (err) => {
                    this.msg.add({
                        key: 'toast',
                        severity: 'error',
                        detail: err.error.message,
                    });
                },
            });
    }
}
