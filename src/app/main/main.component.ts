import { Component, HostBinding} from '@angular/core';
import { THEME_UI } from '../shared/enums/theme-ui.enum';
import { LOCAL_STORAGE_KEY } from '../shared/enums/local-storage-key.enum';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @HostBinding('class') className = ''; 

  public constructor(){
    let theme = window.localStorage.getItem(LOCAL_STORAGE_KEY.THEME_UI);
    if(theme){      
      this.className = theme;
    }else{
      this.onToggleControlSwitch(false);
    }
  }

  public onToggleControlSwitch(darkMode:boolean){
    this.className = darkMode ? THEME_UI.DARK : THEME_UI.LIGHT;
    window.localStorage.setItem(LOCAL_STORAGE_KEY.THEME_UI,this.className);
  }

}
