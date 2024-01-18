import { Component, OnInit } from '@angular/core';
import { DialogService } from '@src/app/core/dialog.servic';
import { SpinnerService } from '@src/app/core/spinner.service';
import { Summaries } from '@src/app/shared/interface/summaries.interface';
import { Summary } from '@src/app/shared/interface/summary.interface';
import { SummaryDialogFormComponent } from './components/summary-dialog-form/summary-dialog-form.component';
import { ResumeService } from '@src/app/core/resume.service';
import { ACTION_TABLE_TYPE } from '@src/app/shared/enums/action-table-type.enum';
import { ActionTable } from '@src/app/shared/interface/action-table.interface';
import { EntityAction } from '@src/app/shared/interface/entity-action.interface';
import { Dialog } from '@src/app/shared/class/dialog';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  public displayedColumns:any ={
    summary:{
      title:'Summary',
      html:true,
      display: (element:Summary) =>{return element.summary.replaceAll('<',`<span class='marka'>[`).replaceAll('>',`]</span>`)}
    },
    skill:{
      title:'Skill',
      display: (element:Summary) =>element.skill
    },
    category:{
      title:'Category',
      display: (element:Summary) =>element.category
    },
    actions:{}
  }

  public matSortColumn:string = 'summary';

  public summaries:Summary[]=[];

  public createActions = (row:Summary):ActionTable[]=>{
    const actionsTable:ActionTable[] = [
      {
        type:ACTION_TABLE_TYPE.EDIT_ACTION,
        title:'Edit'
      },
      {
        type:ACTION_TABLE_TYPE.DELETE_ACTION,
        title:'Delet'
      }
    ]
    return actionsTable
  }


  public constructor(
    private spinnerService:SpinnerService,
    private dialogService:DialogService,
    private resumeService:ResumeService
  ){
    this.spinnerService.showSpinner();
  }

  public ngOnInit() {
    this.getSummaries()
  } 

  public getSummaries(){
    this.resumeService.getSummaries().subscribe( (response:Summaries) =>{
      if(response){
        this.summaries = response.summaries;
      }      
      this.spinnerService.hideSpinner();
    })
  }

  public saveSummary(){
    const dialogRef = this.dialogService.openDialog(SummaryDialogFormComponent)
    dialogRef.afterClosed().subscribe(()=>{
      this.getSummaries()
    })
  }

  public editSummary(summary:Summary){
    const diaogData:Dialog<Summary> = new Dialog<Summary>(summary);
    const dialogRef = this.dialogService.openDialog(SummaryDialogFormComponent,diaogData)
    dialogRef.afterClosed().subscribe(()=>{
      this.getSummaries()
    })
  }

  public onValueChange(change:EntityAction<Summary>){
    switch (change.action.type) {
      case ACTION_TABLE_TYPE.EDIT_ACTION:
        this.editSummary(change.entity);
        break;
      case ACTION_TABLE_TYPE.EDIT_ACTION:
        
        break;
    
      default:
        break;
    }
  }

}
