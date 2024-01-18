import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class SpinnerService{
    public show$: Subject<boolean> = new Subject();
   
    public constructor(){}

    public set show(show:boolean){
        this.show$.next(show)
    }

    public showSpinner(){
        this.show=true;
    }

    public hideSpinner(){
        setTimeout(() => {
            this.show=false;  
        }, 500);
        
    }
}