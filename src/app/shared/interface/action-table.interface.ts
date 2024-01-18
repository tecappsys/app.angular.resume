import { ACTION_TABLE_TYPE } from "../enums/action-table-type.enum";

export interface ActionTable{
    id?:number;
    description?:string;
    type?:ACTION_TABLE_TYPE;
    title?:string;
    disable?:boolean;
    hide?:boolean;
};
