import Decimal from 'decimal.js';
import { getTodayExchangeRate } from '../api/external/Nbu';

export const convertUah = async (value, valCode) => {
    const numerator = new Decimal('1');
    const todayExchangeRate = await getTodayExchangeRate(valCode);
    const denominator = new Decimal((todayExchangeRate).toString());
    
    const result = numerator.dividedBy(denominator);

    const convertedResult = Decimal(value).times(result).toNumber().toFixed(1);
    return parseFloat(convertedResult);
}
