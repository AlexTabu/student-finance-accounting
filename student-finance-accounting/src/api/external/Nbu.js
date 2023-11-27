import axios from 'axios';
import { getTodaysDateFormatted } from "../../helpers/Formatters";

export const getTodayExchangeRate = async (valcode) => {
    try {
        const response = await axios.get(
            `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${valcode}&date=${getTodaysDateFormatted()}&json`
        );

        return response.data[0].rate;
    } catch (error) {
        console.error('Error fetching data from the API:', error.message);
    }
}
