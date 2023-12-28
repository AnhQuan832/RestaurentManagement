import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constant/enum';
import { catchError, map } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private http: HttpClient, private storageSrv: StorageService) {}

    getListServing() {
        return this.http.get(API.SERVING.GET_ALL).pipe(
            map((data: any) => {
                if (data.statusCode === 200) {
                    return data.data;
                } else {
                    return data.errorMessage;
                }
            }),
            catchError((err) => {
                throw new Error(err);
            })
        );
    }

    getServingDetail(id) {
        return this.http.get(API.SERVING.GET_DETAIL + `/${id}`, {
            headers: this.storageSrv.getHttpHeader(),
        });
    }
    createServing(CreatedBy, NumberOfCutomer, TimeIn, DiningTableIds) {
        return this.http.post(
            API.SERVING.CREATE,
            {
                CreatedBy,
                NumberOfCutomer,
                TimeIn,
                DiningTableIds,
            },
            { headers: this.storageSrv.getHttpHeader() }
        );
    }

    createOrderFood(servingId, food) {
        return this.http.post(
            API.SERVING.ORDER_FOOD + `/${servingId}/food-order`,
            food,
            { headers: this.storageSrv.getHttpHeader() }
        );
    }

    updateOrderFood(foodOrderId, status) {
        return this.http.put(API.ORDER.UPDATE + `/${foodOrderId}`, null, {
            params: { status },
            headers: this.storageSrv.getHttpHeader(),
        });
    }

    createBill(servingId) {
        return this.http.post(
            API.BILL.CREATE,
            { servingId },
            {
                headers: this.storageSrv.getHttpHeader(),
            }
        );
    }
}
