import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRouteSnapshot, ActivationEnd, Router } from '@angular/router';
import { RouteUrlService } from '@src/app/core/route-url.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
 
  public entity:string;
  public title:string;
  public showBackView:boolean;
  public urlBackView:string;
  private snapshot: ActivatedRouteSnapshot;
  private URL_SEARCH:string = '/search/';

  constructor( private router:Router, private routeUrlService: RouteUrlService ) { 
    this.router.events.subscribe( (event) =>{
      if(event instanceof ActivationEnd){
        this.snapshot = event.snapshot;
        this.initData(this.snapshot)
      }
    })

    this.routeUrlService.title$.subscribe((title)=>{
      this.title=title;
    })
  }

  public initData(snapshot:ActivatedRouteSnapshot){
    const data = snapshot.data;
    const entity = data['entity'];
    const title = data['title'];
    if(entity || title){
      this.entity = entity;
      this.title = this.getTitle(title);
      this.urlBackView = this.getUrlBack(snapshot);
      this.showBackView = this.urlBackView ? true : false;
    }
  }

  public onBackView(){
    this.router.navigate([this.urlBackView])
  }

  private getUrlBack(snapshot:ActivatedRouteSnapshot):string{
    return snapshot.data['urlBack'];
  }

  private getTitle(entity:string){
    let title = entity
    const params: string[] = Object.keys(this.snapshot.params);
    if(params.length > 0){
      params.forEach((key)=>{        
        title = this.snapshot.params[key]
      })
    }
    return title  
  }

  public onSearch(search:string){
    if(typeof search === 'string'){
      this.router.navigate( [`${this.URL_SEARCH}${search}`] );
    }     
  }
}
