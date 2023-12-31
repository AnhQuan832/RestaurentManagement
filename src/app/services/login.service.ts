import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../constant/enum';
import { catchError, map } from 'rxjs';
import { StorageService } from './storage.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private http: HttpClient, private strSrv: StorageService) {}

    login(userEmail, userPassword) {
        return this.http.post(API.AUTHENTICATE.LOGIN, {
            email: userEmail,
            password: userPassword,
        });
    }

    setRoles(userRoles: []) {
        sessionStorage.setItem('userRoles', JSON.stringify(userRoles));
    }
    getRoles() {
        return sessionStorage.getItem('userRoles');
    }

    setToken(jwtToken: string) {
        console.log('set token gg ');
        sessionStorage.setItem('jwtToken', jwtToken);
    }

    getToken(): string {
        return sessionStorage.getItem('jwtToken');
    }
    roleMatch(allowedRoles: any): boolean {
        const userRoles = this.getRoles();
        console.log(userRoles);
        if (userRoles != null && userRoles)
            if (userRoles.includes(allowedRoles[0])) return true;
        return false;
    }

    changePass(data) {
        return this.http.put(
            API.AUTHENTICATE.CHANGE_PASS,
            {
                password: data.password,
                newPassword: data.newPassword,
            },
            { headers: this.strSrv.getHttpHeader() }
        );
    }
}
