import moment from 'moment';
import 'moment-duration-format';
import 'moment-timezone'
import { DATE_FORMAT } from "../enums/date-format.enum";

export class DateUtils{

    public static formatTime(date:number): string{
        const duration = moment.duration(Number(date), 'seconds');
        return moment.utc(duration.asSeconds()).format(DATE_FORMAT.TIME);
    }

    public static now(){
        return moment().format(DATE_FORMAT.ISO08601)
    }

    public static getDiff(fromDate:string, toDate?:string):number{
        const currentDate = toDate ? moment(toDate) : moment();
        const timeLapse = currentDate.diff(fromDate,'seconds');
        return timeLapse
    }
}