import { Injectable } from "@angular/core";
import { LOCAL_STORAGE_KEY } from "../shared/enums/local-storage-key.enum";
import { Observable, of } from "rxjs";

@Injectable()
export class LocalStorageService {

  /**
   *
   * @param key
   * @param value
   * @returns {any}
   */
  public setItem(key:LOCAL_STORAGE_KEY, value:any){
    return localStorage.setItem(key, JSON.stringify(value))
  }

  /**
   *
   * @param key
   * @returns {any}
   */
  public getItem<T>(key:LOCAL_STORAGE_KEY){
    let item = localStorage.getItem(key);
    if(item){
       item = JSON.parse( item )
    }
    return of(item) as Observable<T>;
  }

  /**
   *
   * @param key
   * @returns {any}
   */
  public removeItem(key:LOCAL_STORAGE_KEY){
    return localStorage.removeItem(key)
  }

}