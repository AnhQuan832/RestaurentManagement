import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from 'src/app/services/login.service';

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
        private router: Router
    ) {}
    ngOnInit(): void {
        sessionStorage.clear();
    }

    login() {
        this.router.navigate(['']);

        this.isSubmitted = true;
        if (this.email && this.password)
            this.loginService.login(this.email, this.password).subscribe({
                next: (res) => {
                    if (res) {
                        sessionStorage.setItem(
                            'jwtToken',
                            JSON.stringify(res.accessToken)
                        );
                        this.router.navigate(['']);
                    }
                },
                error: (err) => console.log(err),
            });
    }
}
