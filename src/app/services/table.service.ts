import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs';
import { API } from '../constant/enum';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class TableService {
    constructor(private http: HttpClient, private strSrv: StorageService) {}

    getListTable() {
        return this.http.get(API.TABLE.GET_TABLE).pipe(
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

    addNewTable(data) {
        delete data.tableId;
        delete data.status;
        const params = {
            createdBy: this.strSrv.getItemLocal('user').accountId,
            ...data,
        };
        return this.http
            .post(API.TABLE.CREATE_TABLE, params, {
                headers: this.strSrv.getHttpHeader(),
            })
            .pipe(
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
        return this.http
            .put(API.TABLE.GET_TABLE + `/${data.tableId}`, data)
            .pipe(
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

    getDetail(tableId) {
        return this.http.get(API.TABLE.GET_TABLE + `/${tableId}`).pipe(
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

    deleteTable(tableId) {
        return this.http.delete(API.TABLE.GET_TABLE + `/${tableId}`).pipe(
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
