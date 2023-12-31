import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
    providers: [MessageService],
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];

    password!: string;
    email!: string;
    protected isSubmitted: boolean = false;
    protected msgError: string;
    constructor(
        public layoutService: LayoutService,
        private loginService: LoginService,
        private router: Router,
        private storageService: StorageService,
        private msg: MessageService
    ) {}
    ngOnInit(): void {
        localStorage.clear();
    }

    login() {
        this.isSubmitted = true;
        if (this.email && this.password)
            this.loginService.login(this.email, this.password).subscribe({
                next: (res: any) => {
                    console.log(res);
                    if (res.statusCode == 200) {
                        this.storageService.setItemLocal('user', res.data);
                        this.storageService.setTimeResetTokenCookie(
                            'jwtToken',
                            res.data.accessToken
                        );
                        this.router.navigate(['']);
                    } else {
                        this.msg.add({
                            key: 'toast',
                            severity: 'error',
                            detail: 'Wrong data',
                        });
                    }
                },
                error: (err) => {
                    this.msg.add({
                        key: 'toast',
                        severity: 'error',
                        detail: 'Information not match',
                    });
                },
            });
    }
}
