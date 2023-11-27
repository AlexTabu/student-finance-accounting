import Decimal from 'decimal.js';

export const convertUahToUsd = (value) => {
    return new Decimal(value).times(0.028).toNumber();
}
