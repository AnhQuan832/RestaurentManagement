// export const API_URL = 'http://localhost:8080/api/v1';
const API_URL = 'https://localhost:7004/api/';

export const API = {
    AUTHENTICATE: {
        LOGIN: API_URL + 'auth/login',
    },
    CATEGORY: {
        GET_CATEGORY: API_URL + 'categories',
        CREATE_CATEGORY: API_URL + 'categories/create',
    },
    TABLE: {
        GET_TABLE: API_URL + 'dining-tables',
        CREATE_TABLE: API_URL + 'dining-tables/create',
    },
    FOOD: {
        GET_FOOD: API_URL + 'foods',
        GET_FOOD_ADMIN: API_URL + 'foods/admin',
        GET_FOOD_CUSTOMER: API_URL + 'foods/customer',
        GET_FOOD_GROUP: API_URL + 'foods/group-by-category',
    },
    ACCOUNT: {
        GET: API_URL + 'accounts',
        GET_ALL: API_URL + 'accounts/all',
        PERMITS: API_URL + 'accounts/permits',
        BLOCK: API_URL + 'accounts/block',
        DELETE: API_URL + 'accounts/delete',
        CURRENT: API_URL + 'me/my-account',
        UPDATE_CURRENT: API_URL + 'me/update',
        UPDATE__CURRENT_PASSWORD: API_URL + 'me/update-password',
    },
    SERVING: {
        GET_ALL: API_URL + 'serving/unpaid',
        GET_DETAIL: API_URL + 'serving/detail',
        CREATE: API_URL + 'serving/create',
        ORDER_FOOD: API_URL + 'serving',
    },
    PERMISSION: {
        GET_ALL: API_URL + 'permissions',
    },
    ORDER: {
        GET_ALL: API_URL + 'food-order',
        UPDATE: API_URL + 'food-order/update-status',
    },
    BILL: {
        CREATE: API_URL + 'bills/create',
    },
    RESERVATION: {
        GET: API_URL + 'reservations',
        GET_ALL: API_URL + 'reservations/all',
        CREATE: API_URL + 'reservations/create',
        UPDATE: API_URL + 'reservations/update',
        DELETE: API_URL + 'reservations/delete',
    },
};

export const ATTRIBUTED = {
    SIZE: {
        id: 'SIZE',
        name: 'Size',
    },
    COLOR: {
        id: 'COLOR',
        name: 'Color',
    },
};

export const TABLE_STATUS = {
    AVALABLE: 'AVAILABLE',
    OCCUPIED: 'OCCUPIED',
    PREPARING: 'PREPARING',
};

export const FOOD_ORDER_STATUS = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    SERVED: 'SERVED',
};

export const FOOD_STATUS = {
    AVALABLE: 'AVAILABLE',
    PENDING: 'PENDING',
    HIDDEN: 'HIDDEN',
};
