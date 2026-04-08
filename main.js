// main.js

/**
 * @typedef {Object} Transaction
 * @property {number} transaction_id - ID транзакции
 * @property {string} transaction_date - дата
 * @property {number} transaction_amount - сумма
 * @property {string} transaction_type - тип (debit/credit)
 * @property {string} transaction_description - описание
 * @property {string} merchant_name - магазин
 * @property {string} card_type - тип карты
 */

/** @type {Transaction[]} */
const transactions = [
    {
        transaction_id: 31,
        transaction_date: "2021-06-10",
        transaction_amount: 300,
        transaction_type: "credit",
        transaction_description: "Salary",
        merchant_name: "OfficeCorp",
        card_type: "debit"
    },
    {
        transaction_id: 32,
        transaction_date: "2021-06-11",
        transaction_amount: 70,
        transaction_type: "debit",
        transaction_description: "Food",
        merchant_name: "SuperMarket",
        card_type: "credit"
    },
    {
        transaction_id: 33,
        transaction_date: "2021-06-15",
        transaction_amount: 150,
        transaction_type: "debit",
        transaction_description: "Shoes",
        merchant_name: "ShoeStore",
        card_type: "debit"
    }
];

/**
 * Получить уникальные типы
 */
function getUniqueTypes(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i].transaction_type) === -1) {
            result.push(arr[i].transaction_type);
        }
    }

    return result;
}

/**
 * Общая сумма
 */
function getTotalAmount(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i].transaction_amount;
    }

    return sum;
}

/**
 * Фильтр по типу
 */
function getByType(arr, type) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].transaction_type === type) {
            result.push(arr[i]);
        }
    }

    return result;
}

/**
 * Фильтр по датам
 */
function getByDateRange(arr, start, end) {
    let result = [];

    let s = new Date(start);
    let e = new Date(end);

    for (let i = 0; i < arr.length; i++) {
        let d = new Date(arr[i].transaction_date);
        if (d >= s && d <= e) {
            result.push(arr[i]);
        }
    }
    return result;
}

/**
 * Поиск по магазину
 */
function getByMerchant(arr, name) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].merchant_name === name) {
            result.push(arr[i]);
        }
    }

    return result;
}

/**
 * Среднее значение
 */
function getAverage(arr) {
    if (arr.length === 0) return 0;

    return getTotalAmount(arr) / arr.length;
}

/**
 * Фильтр по сумме
 */
function getByAmount(arr, min, max) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].transaction_amount >= min && arr[i].transaction_amount <= max) {
            result.push(arr[i]);
        }
    }

    return result;
}

/**
 * Сумма debit
 */
function getDebitSum(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].transaction_type === "debit") {
            sum += arr[i].transaction_amount;
        }
    }

    return sum;
}

/**
 * Месяц максимум
 */
function getMaxMonth(arr) {
    let months = {};

    for (let i = 0; i < arr.length; i++) {
        let m = new Date(arr[i].transaction_date).getMonth() + 1;
        if (!months[m]) months[m] = 0;
        months[m]++;
    }

    let max = 0;
    let res = null;

    for (let key in months) {
        if (months[key] > max) {
            max = months[key];
            res = key;
        }
    }
    return res;
}

/**
 * Месяц максимум debit
 */
function getMaxDebitMonth(arr) {
    let months = {};

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].transaction_type === "debit") {
            let m = new Date(arr[i].transaction_date).getMonth() + 1;
            if (!months[m]) months[m] = 0;
            months[m]++;
        }
    }

    let max = 0;
    let res = null;

    for (let key in months) {
        if (months[key] > max) {
            max = months[key];
            res = key;
        }
    }

    return res;
}

/**
 * Сравнение типов
 */
function compareTypes(arr) {
    let d = 0, c = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].transaction_type === "debit") d++;
        else if (arr[i].transaction_type === "credit") c++;
    }

    if (d > c) return "debit";
    if (c > d) return "credit";

    return "equal";
}

/**
 * До даты
 */
function beforeDate(arr, date) {
    let result = [];
    let d = new Date(date);

    for (let i = 0; i < arr.length; i++) {
        if (new Date(arr[i].transaction_date) < d) {
            result.push(arr[i]);
        }
    }

    return result;
}

/**
 * Поиск по id
 */
function getById(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].transaction_id === id) {
            return arr[i];
        }
    }
}

/**
 * Описания
 */
function getDescriptions(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i].transaction_description);
    }

    return result;
}


// вывод

console.log(getUniqueTypes(transactions));
console.log(getTotalAmount(transactions));
console.log(getByType(transactions, "debit"));
console.log(getByDateRange(transactions, "2021-06-01", "2021-06-20"));
console.log(getByMerchant(transactions, "ShoeStore"));
console.log(getAverage(transactions));
console.log(getByAmount(transactions, 50, 200));
console.log(getDebitSum(transactions));
console.log(getMaxMonth(transactions));
console.log(getMaxDebitMonth(transactions));
console.log(compareTypes(transactions));
console.log(beforeDate(transactions, "2021-06-12"));
console.log(getById(transactions, 31));
console.log(getDescriptions(transactions));
