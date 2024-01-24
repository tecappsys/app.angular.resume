import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// MATERIAL UI
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NoimagePipe } from './pipes/noimage.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Sanitize } from './pipes/sanitize.pipe';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  providers: [ 
    Sanitize
  ],
  declarations: [
    SharedComponent,
    NoimagePipe,
    DomseguroPipe,
    Sanitize,
  ],
  imports: [   
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Material UI - Modules
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatTableModule, 
    MatSortModule,
    MatDialogModule,
    MatMenuModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,

    // Others - Modules
    CKEditorModule,
  ],
  exports:[   
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,   

    // Material UI - Modules
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatMenuModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    
    // Others - Modules
    CKEditorModule,
    SharedComponent,   
    NoimagePipe,
    DomseguroPipe,
  ]
})
export class SharedModule { }
