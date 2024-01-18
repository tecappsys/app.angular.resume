import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-toolbar-search',
  templateUrl: './toolbar-search.component.html',
  styleUrls: ['./toolbar-search.component.scss']
})
export class ToolbarSearchComponent implements OnInit {
  @Output() public search: EventEmitter<string> = new EventEmitter();
  public searchForm: UntypedFormGroup;
  
  public constructor( private fb: UntypedFormBuilder){}

  public ngOnInit(){
    this.createForms()
  }

  private createForms(){
    this.searchForm = this.fb.group({
      search:['']
    })
  }

  public onSearch(){
    const text = this.searchForm.get('search')?.value;
    if(text && text !== ''){
      this.search.emit(text);      
      this.searchForm.setValue({search:''})     
    }    
  }

}
