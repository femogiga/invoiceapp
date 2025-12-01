
import { addDays } from 'date-fns';

export const paymentDueDateCalculator = (dateString:string, term:string) => {
    const date = new Date(dateString)
    const result = addDays(date, parseInt(term))
    return result.toDateString()
}
