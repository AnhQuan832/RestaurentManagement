import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constant/enum';
import { catchError, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    constructor(private http: HttpClient) {}

    getMenu() {
        return this.http.get(API.FOOD.GET_FOOD_ADMIN).pipe(
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

    createCategory(data) {
        return this.http.post(API.CATEGORY.CREATE_CATEGORY, data).pipe(
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

    updateCategory(data) {
        return this.http
            .put(API.CATEGORY.CREATE_CATEGORY + `/${data.categoryId}`, data)
            .pipe(
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

    getListCategory() {
        return this.http.get(API.CATEGORY.GET_CATEGORY).pipe(
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

    getFoodDetail(id) {
        return this.http.get(API.FOOD.GET_FOOD + `/${id}`).pipe(
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

    createFood(data) {
        return this.http.post(API.FOOD.GET_FOOD, data).pipe(
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
    updateFood(data) {
        return this.http.put(API.FOOD.GET_FOOD + `/${data.foodId}`, data).pipe(
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

    deleteFood(id) {
        return this.http.delete(API.FOOD.GET_FOOD + `/${id}`).pipe(
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
}
