import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class RouteUrlService{
    public title$: Subject<string> = new Subject();
    public show$: Subject<boolean> = new Subject();
   
    public constructor(){}
    
    public set title(title:string){
        this.title$.next(title)
    }

    public set show(show:boolean){
        this.show$.next(show)
    }
}