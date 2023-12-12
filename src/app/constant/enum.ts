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
