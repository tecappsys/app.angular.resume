import { KeyValue } from "./key-value.interface";
export interface SkillCategory extends KeyValue{
    _id?:string;
    skill:string;
    skillValue:string;
};