import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs';
import { API } from '../constant/enum';

@Injectable({
    providedIn: 'root',
})
export class StaffService {
    constructor(private http: HttpClient) {}

    getListStaff() {
        return this.http.get(API.ACCOUNT.GET).pipe(
            map((data: any) => {
                if (data.statusCode === 200) {
                    return data.data;
                } else {
                    throw new Error(data.meta);
                }
            }),
            catchError((err) => {
                throw new Error(err);
            })
        );
    }

    addNewStaff(data) {
        return this.http.post(API.ACCOUNT.GET, data).pipe(
            map((data: any) => {
                if (data.statusCode === 200) {
                    return data.data;
                } else {
                    throw new Error(data.errorMessage);
                }
            }),
            catchError((err) => {
                throw new Error(err);
            })
        );
    }

    updateInfo(data) {
        return this.http.put(API.ACCOUNT.GET + `/${data.email}`, data).pipe(
            map((data: any) => {
                if (data.statusCode === 200) {
                    return data.data;
                } else {
                    throw new Error(data.errorMessage);
                }
            }),
            catchError((err) => {
                throw new Error(err);
            })
        );
    }

    getDetail(email) {
        return this.http.get(API.ACCOUNT.GET + `/${email}`).pipe(
            map((data: any) => {
                if (data.statusCode === 200) {
                    return data.data;
                } else {
                    throw new Error(data.errorMessage);
                }
            }),
            catchError((err) => {
                throw new Error(err);
            })
        );
    }

    deleteAccount(email) {
        return this.http.delete(API.ACCOUNT.GET + `/${email}`).pipe(
            map((data: any) => {
                if (data.statusCode === 200) {
                    return data.data;
                } else {
                    throw new Error(data.errorMessage);
                }
            }),
            catchError((err) => {
                throw new Error(err);
            })
        );
    }
}
