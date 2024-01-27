import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from '../components/home/home.component';
import { SummaryComponent } from '../components/summary/summary.component';
import { CvComponent } from '../components/cv/cv.component';
import { CvMultipleAddSummaryComponent } from '../components/cv/components/cv-multiple-add-summary/cv-multiple-add-summary.component';

const routes: Routes = [{
  path: '',
  component:MainComponent,
  children:[
    {
      path:'',
      pathMatch:'full',      
      component:HomeComponent,
      data:{
        entity:'Home'
      }
    },

    {
      path:'cv',
      pathMatch:'full',      
      component:CvComponent,
      data:{
        entity:'Resume',
        title:'CV'
      }
    },

    {
      path:'summary',
      pathMatch:'full',      
      component:SummaryComponent,
      data:{
        entity:'Resume',
        title:'Summary'
      }
    },

    {
      path:'multiple-add-summary',
      pathMatch:'full',      
      component:CvMultipleAddSummaryComponent,
      data:{
        entity:'Resume',
        title:'Add Summary',                
        urlBack:'/cv'
      }
    },
    
    { path: '**', pathMatch: 'full', redirectTo: '' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
