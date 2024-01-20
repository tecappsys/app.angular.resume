import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToolbarSearchComponent } from './components/toolbar/components/toolbar-search/toolbar-search.component';
import { ToolbarTitleComponent } from './components/toolbar/components/toolbar-title/toolbar-title.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HomeComponent } from '../components/home/home.component';
import { RouteUrlService } from '../core/route-url.service';
import { SpinnerService } from '../core/spinner.service';
import { ResumeService } from '../core/resume.service';
import { SummaryComponent } from '../components/summary/summary.component';
import { GenericTableComponent } from '../shared/components/generic-table/generic-table.component';
import { DialogService } from '../core/dialog.servic';
import { SummaryDialogFormComponent } from '../components/summary/components/summary-dialog-form/summary-dialog-form.component';
import { GenericAccordionComponent } from '../components/generic-accordion/generic-accordion.component';
import { AccordionPanelJobComponent } from '../components/generic-accordion/accordion-panel-job/accordion-panel-job.component';
import { AccordionPanelSkillComponent } from '../components/generic-accordion/accordion-panel-skill/accordion-panel-skill.component';
import { AccordionPanelExperienceComponent } from '../components/generic-accordion/accordion-panel-experience/accordion-panel-experience.component';

@NgModule({
  declarations: [
    // BASE COMPONENTS
    MainComponent,
    NavbarComponent,
    ToolbarComponent,    
    ToolbarSearchComponent,
    ToolbarTitleComponent,
    SpinnerComponent, 

    // EXTRA COMPONENTS
    GenericTableComponent,
    HomeComponent,
    SummaryComponent,    
    SummaryDialogFormComponent,    
    GenericAccordionComponent,
    AccordionPanelJobComponent,
    AccordionPanelSkillComponent,    
    AccordionPanelExperienceComponent
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    SharedModule,
  ],
  exports:[
    MainComponent,
  ],
  providers:[    
    RouteUrlService,
    SpinnerService,
    DialogService, 
    ResumeService,
  ]
})

export class MainModule { }
