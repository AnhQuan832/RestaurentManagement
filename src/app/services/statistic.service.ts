import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { API } from '../constant/enum';
import { map, catchError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StatisticService {
    constructor(
        private http: HttpClient,
        private storageService: StorageService
    ) {}

    getGeneral(params) {
        return this.http
            .get(API.STATISTIC.GENERAL, {
                params: params,
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

    getRevenue(params) {
        return this.http
            .get(API.STATISTIC.REVENUE, {
                params: params,
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
