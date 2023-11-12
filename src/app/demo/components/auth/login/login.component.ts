import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    email!: string;
    protected isSubmitted: boolean = false;
    protected msgError: string;
    constructor(public layoutService: LayoutService, private loginService: LoginService, private router: Router) { }

    login() {
        this.router.navigate(['']);

        // this.isSubmitted = true;
        // if (this.email && this.password)
        //     this.loginService.login(this.email, this.password).subscribe({
        //         next: (res) => {
        //             console.log(res)
        //             if (res && res.userRoles[0].roleName === 'ROLE_ADMIN' || res.userRoles[1].roleName === 'ROLE_ADMIN') {
        //                 sessionStorage.setItem("userRoles", 'ROLE_ADMIN');
        //                 sessionStorage.setItem("jwtToken", JSON.stringify(res.jwtToken));
        //                 this.router.navigate(['']);
        //             }
        //         },
        //         error: (err) => console.log(err),
        //     })
    }

}
