export class SortUtils{

    public static sortByProp(array:any[],prop:string,order=true){
        return array.sort((a:any,b:any)=>{
            const aValue = SortUtils.getObjectValue(a,prop) as string;
            const bValue = SortUtils.getObjectValue(b,prop) as string;
            if(order){
                return aValue?.localeCompare(bValue);
            }
            return bValue?.localeCompare(aValue)
        })
    }

    public static getObjectValue(item:any, key:string){
        if(key){
            const keys = key.split('.');
            const getValueRecursive = (
                col:any,
                k:string[],
                i:number = 0
            ):string =>{
                if(k.length -1 >= i){
                    return getValueRecursive(col[k[i]],k,++i);
                }else{
                    return col
                }
            };
            return getValueRecursive(item,keys)
        }else{
            return null
        }
    }
}