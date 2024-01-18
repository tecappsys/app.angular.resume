import { Component } from '@angular/core';
import { SpinnerService } from '@src/app/core/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  public show:boolean;
  public showAnimation:boolean;
  constructor( private spinnerService: SpinnerService ) { 
    this.spinnerService.show$.subscribe((show)=>{
      if(show){
        this.show=show;
        this.showAnimation=show;
      }else{
        this.showAnimation=show;
        setTimeout(() => {
          this.show=show;
        }, 800);        
      }
      
    })
  }
}
