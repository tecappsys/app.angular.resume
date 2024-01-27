import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActionTable } from '../../interface/action-table.interface';
import { Sanitize } from '../../pipes/sanitize.pipe';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent<T> {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() public valueChange: EventEmitter<any> = new EventEmitter();
  @Input() public tableDataSource:any;
  @Input() public columns: string[] = []; 
  @Input() public showPaginator: boolean= false; 
  @Input() public disabledCheckbox:any;
  public entityAction: any;
  public _displayedColumns:any={};
  private _matSortColumn:string;
  public currentActions:any[]=[];
  private _createActions:(row:any)=>any[];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public constructor(public sanitize:Sanitize) {}
  
  @Input() public set createActions(ca:(row:T) => ActionTable[]){
    if(this._createActions === undefined){
      this._createActions = ca;
    }
  }
  public get createActions(): (row:T)=>ActionTable[]{
    return this._createActions; 
  }

  @Input() public set matSortColumn(colum:string){
    this._matSortColumn = colum
  }

  public get matSortColumn(){
    return this._matSortColumn;
  }

  @Input() set displayedColumns(dc:string[] | any) {
    let keys: string[]=[];
    if(Array.isArray(dc)){
      keys = dc;
      keys.forEach((c:string)=>{this._displayedColumns[c]={}});
    }else if(dc && !Array.isArray(dc)){
      keys = Object.keys(dc);
      this._displayedColumns = dc;
    }
    this.columns = keys;
  }

  public get displayedColumns():string[] | any{
    return this._displayedColumns
  }

  public generateActions(row:T){  
    this.currentActions = this.createActions(row);
  }

  public actions(entity:any, action:any){
    this.entityAction = {
      entity:entity,
      action: action
    }
    this.valueChange.emit(this.entityAction)
  }

  public onDisabledCheckbox(row:any){
    let disabled = this.disabledCheckbox;
    if(this.disabledCheckbox){
      
    }
    return disabled
  }

  public onChangeCheckbox(event:any,entity:any){
    this.entityAction = {
      entity:entity,
      action: event.checked
    }
    this.valueChange.emit(this.entityAction)
  }

  public getLabel(row:any,col:string,displayColumns:any){
    let res : any = undefined;
    if(displayColumns[col]){
      if(displayColumns[col].display){
        res = displayColumns[col].display(row);
      } else{
        res = row[col]
      }
    }
    return this.isHtml(col,displayColumns) ? this.sanitize.transform(res) : res ;
  }

  public isImage(col:string,displayColumns:any){
    return (displayColumns[col] && displayColumns[col].image);
  }

  public isIFrame(col:string,displayColumns:any){
    return (displayColumns[col] && displayColumns[col].iframe);
  }

  public isHtml(col:string,displayColumns:any){
    return (displayColumns[col] && displayColumns[col].html);
  }

  public isLabel(col:string,displayColumns:any){
    return (displayColumns[col] && !displayColumns[col].image && !displayColumns[col].iframe && !displayColumns[col].html);
  }
}
