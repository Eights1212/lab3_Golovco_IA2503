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
 * Возвращает массив уникальных типов транзакций.
 * Для удаления повторяющихся значений используется Set.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {Array<string>} Массив уникальных типов транзакций.
 */
function getUniqueTransactionTypes(transactions) {
    const types = transactions.map(function (transaction) {
        return transaction.transaction_type;
    });

    return [...new Set(types)];
}

/**
 * Вычисляет общую сумму всех транзакций.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {number} Сумма всех транзакций.
 */
function calculateTotalAmount(transactions) {
    return transactions.reduce(function (sum, transaction) {
        return sum + transaction.transaction_amount;
    }, 0);
}

/**
 * Возвращает все транзакции указанного типа.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {string} type - Тип транзакции, который нужно найти ("debit" или "credit").
 * @returns {Array<Object>} Массив транзакций указанного типа.
 */
function getTransactionByType(transactions, type) {
    return transactions.filter(function (transaction) {
        return transaction.transaction_type === type;
    });
}

/**
 * Возвращает транзакции, дата которых находится в указанном диапазоне.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {string} startDate - Начальная дата диапазона в формате YYYY-MM-DD.
 * @param {string} endDate - Конечная дата диапазона в формате YYYY-MM-DD.
 * @returns {Array<Object>} Массив транзакций в заданном диапазоне дат.
 */
function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return transactions.filter(function (transaction) {
        const currentDate = new Date(transaction.transaction_date);
        return currentDate >= start && currentDate <= end;
    });
}

/**
 * Возвращает транзакции, выполненные у указанного продавца или сервиса.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {string} merchantName - Название магазина или сервиса.
 * @returns {Array<Object>} Массив транзакций данного магазина или сервиса.
 */
function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(function (transaction) {
        return transaction.merchant_name === merchantName;
    });
}

/**
 * Вычисляет среднее значение суммы транзакций.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {number} Средняя сумма транзакций. Если массив пустой, возвращается 0.
 */
function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) {
        return 0;
    }

    const total = calculateTotalAmount(transactions);
    return total / transactions.length;
}

/**
 * Возвращает транзакции, сумма которых находится в заданном диапазоне.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {number} minAmount - Минимальная сумма диапазона.
 * @param {number} maxAmount - Максимальная сумма диапазона.
 * @returns {Array<Object>} Массив транзакций с суммой в указанном диапазоне.
 */
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(function (transaction) {
        return transaction.transaction_amount >= minAmount &&
               transaction.transaction_amount <= maxAmount;
    });
}

/**
 * Вычисляет общую сумму всех дебетовых транзакций.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {number} Общая сумма дебетовых транзакций.
 */
function calculateTotalDebitAmount(transactions) {
    return transactions
        .filter(function (transaction) {
            return transaction.transaction_type === "debit";
        })
        .reduce(function (sum, transaction) {
            return sum + transaction.transaction_amount;
        }, 0);
}

/**
 * Определяет месяц, в котором было больше всего транзакций.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {string|null} Номер месяца, в котором было больше всего транзакций,
 * или null, если массив пустой.
 */
function findMostTransactionsMonth(transactions) {
    const monthsCount = {};

    transactions.forEach(function (transaction) {
        const date = new Date(transaction.transaction_date);
        const month = date.getMonth() + 1;

        if (!monthsCount[month]) {
            monthsCount[month] = 0;
        }

        monthsCount[month]++;
    });

    let maxMonth = null;
    let maxCount = 0;

    for (let month in monthsCount) {
        if (monthsCount[month] > maxCount) {
            maxCount = monthsCount[month];
            maxMonth = month;
        }
    }

    return maxMonth;
}

/**
 * Определяет месяц, в котором было больше всего дебетовых транзакций.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {string|null} Номер месяца, в котором было больше всего дебетовых транзакций,
 * или null, если дебетовых транзакций нет.
 */
function findMostDebitTransactionMonth(transactions) {
    const monthsCount = {};

    transactions.forEach(function (transaction) {
        if (transaction.transaction_type === "debit") {
            const date = new Date(transaction.transaction_date);
            const month = date.getMonth() + 1;

            if (!monthsCount[month]) {
                monthsCount[month] = 0;
            }

            monthsCount[month]++;
        }
    });

    let maxMonth = null;
    let maxCount = 0;

    for (let month in monthsCount) {
        if (monthsCount[month] > maxCount) {
            maxCount = monthsCount[month];
            maxMonth = month;
        }
    }

    return maxMonth;
}

/**
 * Определяет, каких транзакций больше: debit или credit.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {string} Возвращает "debit", если дебетовых больше,
 * "credit", если кредитовых больше,
 * или "equal", если количество одинаковое.
 */
function mostTransactionTypes(transactions) {
    let debitCount = 0;
    let creditCount = 0;

    transactions.forEach(function (transaction) {
        if (transaction.transaction_type === "debit") {
            debitCount++;
        } else if (transaction.transaction_type === "credit") {
            creditCount++;
        }
    });

    if (debitCount > creditCount) {
        return "debit";
    } else if (creditCount > debitCount) {
        return "credit";
    } else {
        return "equal";
    }
}

/**
 * Возвращает транзакции, совершенные до указанной даты.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {string} date - Дата в формате YYYY-MM-DD.
 * @returns {Array<Object>} Массив транзакций, совершенных до указанной даты.
 */
function getTransactionsBeforeDate(transactions, date) {
    const targetDate = new Date(date);

    return transactions.filter(function (transaction) {
        return new Date(transaction.transaction_date) < targetDate;
    });
}

/**
 * Ищет транзакцию по ее уникальному идентификатору.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @param {number} id - Идентификатор транзакции.
 * @returns {Object|undefined} Найденная транзакция или undefined, если транзакция не найдена.
 */
function findTransactionById(transactions, id) {
    return transactions.find(function (transaction) {
        return transaction.transaction_id === id;
    });
}

/**
 * Создает новый массив, содержащий только описания транзакций.
 *
 * @param {Array<Object>} transactions - Массив транзакций.
 * @returns {Array<string>} Массив описаний транзакций.
 */
function mapTransactionDescriptions(transactions) {
    return transactions.map(function (transaction) {
        return transaction.transaction_description;
    });
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
