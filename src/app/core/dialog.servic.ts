import { Injectable, NgZone } from "@angular/core";
import {
    MatDialog
  } from '@angular/material/dialog';
import { Dialog } from "../shared/class/dialog";

@Injectable()
export class DialogService{  
    public constructor(public dialog:MatDialog, private ngZone: NgZone){}

    public openDialog( template:any,data?:Dialog<any>,config?:any){
        if(!template){
            throw new Error('template is required to show a dialog.')
        }

        config = {
            autoFocus:false,
            restoreFocus:false,
            ...config,
            data:data
        }

        return this.ngZone.run(()=>{
            return this.dialog.open(template,config)
        })
    }
}