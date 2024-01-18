import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar-title',
  templateUrl: './toolbar-title.component.html',
  styleUrls: ['./toolbar-title.component.scss']
})
export class ToolbarTitleComponent {
  @Output() public backView: EventEmitter<void> = new EventEmitter();
  @Input() public entity:string;
  @Input() public title:string;
  @Input() public showBackView:boolean;

  public contructor(){}

  public onBackView(){
    this.backView.emit();
  }
}