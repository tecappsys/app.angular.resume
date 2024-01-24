import moment from 'moment';
import 'moment-duration-format';
import 'moment-timezone'
import { DATE_FORMAT } from "../enums/date-format.enum";

export class DateUtils{

    public static formatDate(date:string,format?:DATE_FORMAT): string{
        return moment(date, DATE_FORMAT.ISO08601).format(format ? format : DATE_FORMAT.SHORT_DATE)
    }

    public static formatTime(date:number): string{
        const duration = moment.duration(Number(date), 'seconds');
        return moment.utc(duration.asSeconds()).format(DATE_FORMAT.TIME);
    }

    public static now(){
        return moment().format(DATE_FORMAT.ISO08601)
    }

    public static nowMoment(text:string){
        return moment(text);
    }

    public static getDiff(fromDate:string, toDate?:string):number{
        const currentDate = toDate ? moment(toDate) : moment();
        const timeLapse = currentDate.diff(fromDate,'seconds');
        return timeLapse
    }

    public static getMont(date:string){
        return moment(date).get('month')
    }

    public static getYear(date:string){
        return moment(date).get('year')
    }
}