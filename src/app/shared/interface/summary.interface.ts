export interface Summary{
    _id:string;
    richtext:string;
    summary:string;
    skill:string;
    category:string;
    coincidences?:string[];
    coincidences_count?:number
};
