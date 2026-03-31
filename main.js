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
        transaction_id: 31, // id
        transaction_date: "2021-06-10", // дата
        transaction_amount: 300, // сумма
        transaction_type: "credit", // тип
        transaction_description: "Salary", // описание
        merchant_name: "OfficeCorp", // магазин
        card_type: "debit" // карта
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
    var result = []; // массив для результата

    for (var i = 0; i < arr.length; i++) { // проходим по массиву

        if (result.indexOf(arr[i].transaction_type) === -1) { // если такого типа ещё нет
            result.push(arr[i].transaction_type); // добавляем
        }
    }

    return result; // возвращаем результат
}

/**
 * Общая сумма
 */
function getTotalAmount(arr) {
    var sum = 0; // переменная суммы

    for (var i = 0; i < arr.length; i++) { // цикл по массиву
        sum += arr[i].transaction_amount; // прибавляем сумму
    }

    return sum; // возвращаем итог
}

/**
 * Фильтр по типу
 */
function getByType(arr, type) {
    var result = []; // новый массив

    for (var i = 0; i < arr.length; i++) {

        if (arr[i].transaction_type === type) { // если тип совпадает
            result.push(arr[i]); // добавляем
        }
    }

    return result;
}

/**
 * Фильтр по датам
 */
function getByDateRange(arr, start, end) {
    var result = [];

    var s = new Date(start); // начальная дата
    var e = new Date(end);   // конечная дата

    for (var i = 0; i < arr.length; i++) {
        var d = new Date(arr[i].transaction_date); // дата транзакции
        if (d >= s && d <= e) { // проверка диапазона
            result.push(arr[i]);
        }
    }
    return result;
}

/**
 * Поиск по магазину
 */
function getByMerchant(arr, name) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {

        if (arr[i].merchant_name === name) { // сравниваем название
            result.push(arr[i]);
        }
    }

    return result;
}

/**
 * Среднее значение
 */
function getAverage(arr) {
    if (arr.length === 0) return 0; // если пусто

    return getTotalAmount(arr) / arr.length; // формула среднего
}

/**
 * Фильтр по сумме
 */
function getByAmount(arr, min, max) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {

        if (arr[i].transaction_amount >= min && arr[i].transaction_amount <= max) { // диапазон
            result.push(arr[i]);
        }
    }

    return result;
}

/**
 * Сумма debit
 */
function getDebitSum(arr) {
    var sum = 0;

    for (var i = 0; i < arr.length; i++) {

        if (arr[i].transaction_type === "debit") { // только debit
            sum += arr[i].transaction_amount;
        }
    }

    return sum;
}

/**
 * Месяц максимум
 */
function getMaxMonth(arr) {
    var months = {}; // объект счётчика

    for (var i = 0; i < arr.length; i++) {
        var m = new Date(arr[i].transaction_date).getMonth() + 1; // получаем месяц
        if (!months[m]) months[m] = 0; // если нет — создаём
        months[m]++; // увеличиваем
    }

    var max = 0;
    var res = null;

    for (var key in months) {
        if (months[key] > max) { // ищем максимум
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
    var months = {};

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].transaction_type === "debit") { // только debit
            var m = new Date(arr[i].transaction_date).getMonth() + 1;
            if (!months[m]) months[m] = 0;
            months[m]++;
        }
    }

    var max = 0;
    var res = null;

    for (var key in months) {

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
    var d = 0, c = 0; // счётчики

    for (var i = 0; i < arr.length; i++) {

        if (arr[i].transaction_type === "debit") d++; // считаем debit
        else if (arr[i].transaction_type === "credit") c++; // считаем credit
    }

    if (d > c) return "debit";
    if (c > d) return "credit";

    return "equal";
}

/**
 * До даты
 */
function beforeDate(arr, date) {
    var result = [];
    var d = new Date(date); // целевая дата

    for (var i = 0; i < arr.length; i++) {

        if (new Date(arr[i].transaction_date) < d) { // если раньше
            result.push(arr[i]);
        }
    }

    return result;
}

/**
 * Поиск по id
 */
function getById(arr, id) {

    for (var i = 0; i < arr.length; i++) {

        if (arr[i].transaction_id === id) { // сравнение id
            return arr[i]; // возвращаем объект
        }
    }
}

/**
 * Описания
 */
function getDescriptions(arr) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
        result.push(arr[i].transaction_description); // добавляем описание
    }

    return result;
}


// вывод

console.log(getUniqueTypes(transactions)); // уникальные типы
console.log(getTotalAmount(transactions)); // сумма
console.log(getByType(transactions, "debit")); // фильтр
console.log(getByDateRange(transactions, "2021-06-01", "2021-06-20")); // даты
console.log(getByMerchant(transactions, "ShoeStore")); // магазин
console.log(getAverage(transactions)); // среднее
console.log(getByAmount(transactions, 50, 200)); // диапазон
console.log(getDebitSum(transactions)); // сумма debit
console.log(getMaxMonth(transactions)); // месяц
console.log(getMaxDebitMonth(transactions)); // месяц debit
console.log(compareTypes(transactions)); // сравнение
console.log(beforeDate(transactions, "2021-06-12")); // до даты
console.log(getById(transactions, 31)); // поиск
console.log(getDescriptions(transactions)); // описания
