import { ActionTable } from "./action-table.interface";

export interface EntityAction<T>{
    entity:T;
    action:ActionTable
};
