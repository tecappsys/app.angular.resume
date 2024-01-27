import { Summary } from "./summary.interface";

export interface Experience{
    _id:string;
    country:string;
    jobTitle:string;
    employer:string;
    startDate:string;
    endDate:string|null;
    summary:Summary[]
};