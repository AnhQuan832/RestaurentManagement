import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs';
import { API } from '../constant/enum';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class StaffService {
    constructor(
        private http: HttpClient,
        private storageService: StorageService
    ) {}

    getListStaff() {
        return this.http
            .get(API.ACCOUNT.GET_ALL, {
                headers: this.storageService.getHttpHeader(),
            })
            .pipe(
                map((data: any) => {
                    if (data.statusCode === 200) {
                        return data.data;
                    } else {
                        return [];
                    }
                }),
                catchError((err) => {
                    throw new Error(err);
                })
            );
    }

    addNewStaff(data) {
        return this.http.post(API.ACCOUNT.GET + '/create', data, {
            headers: this.storageService.getHttpHeader(),
        });
    }

    updateInfo(data) {
        return this.http.put(API.ACCOUNT.GET + `/${data.accountId}`, data, {
            headers: this.storageService.getHttpHeader(),
        });
    }

    getDetail(email) {
        return this.http
            .get(API.ACCOUNT.GET + `/${email}`, {
                headers: this.storageService.getHttpHeader(),
            })
            .pipe(
                map((data: any) => {
                    if (data.statusCode === 200) {
                        return data.data;
                    } else {
                        return [];
                    }
                }),
                catchError((err) => {
                    throw new Error(err);
                })
            );
    }

    deleteAccount(email) {
        return this.http
            .delete(API.ACCOUNT.DELETE + `/${email}`, {
                headers: this.storageService.getHttpHeader(),
            })
            .pipe(
                map((data: any) => {
                    if (data.statusCode === 200) {
                        return data.data;
                    } else {
                        return [];
                    }
                }),
                catchError((err) => {
                    throw new Error(err);
                })
            );
    }

    blockAccount(email) {
        return this.http
            .delete(API.ACCOUNT.BLOCK + `/${email}`, {
                headers: this.storageService.getHttpHeader(),
            })
            .pipe(
                map((data: any) => {
                    if (data.statusCode === 200) {
                        return data.data;
                    } else {
                        return [];
                    }
                }),
                catchError((err) => {
                    throw new Error(err);
                })
            );
    }
}
