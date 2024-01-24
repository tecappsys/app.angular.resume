import { KeyValue } from "./key-value.interface";
import { Summary } from "./summary.interface";
export interface Skill extends KeyValue{
    _id?:string;
    summary?:Summary[]
};