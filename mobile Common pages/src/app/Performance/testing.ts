import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from "@angular/material/select";
// import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
// import { PipeModule } from '../pipe/pipe.module';
// import { HeaderComponent } from '../header/header.component';
//   
// import { RentheaderComponent } from '../rentheader/rentheader.component';
// import { RentinnerheaderComponent } from '../rentinnerheader/rentinnerheader.component';
// import {FooterformComponent} from "../footerform/footerform.component";
// import {FloatContactComponent} from "../float-contact/float-contact.component";
// import { FixedfooterComponent } from "../fixedfooter/fixedfooter.component";
// import { AllIndiaLinksComponent } from '../all-india-links/all-india-links.component';
// import { FooterComponent2 } from '../footer2/footer2.component';


const routes: Routes = [];

@NgModule({
  declarations: [
    // HeaderComponent,
    // InnerheaderComponent,
    // RentheaderComponent,
    // RentinnerheaderComponent,
    // FooterformComponent,
    // FloatContactComponent,
    // FixedfooterComponent,
    // FooterComponent2
    // AllIndiaLinksComponent
  ],
  imports: [
    CommonModule,
    // PipeModule,
    RouterModule.forChild(routes),
    // MatAutocompleteModule,
    // AutoCompleteModule,
    // MatFormFieldModule,
    // MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    // MatSelectModule,
  ],
  exports: [
    // HeaderComponent,
    // InnerheaderComponent,
    RouterModule,
    // AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    // MatSelectModule,
    // RentheaderComponent,
    // RentinnerheaderComponent,
    // FooterformComponent,
    // FloatContactComponent,
    // FixedfooterComponent,
    // FooterComponent2
    // AllIndiaLinksComponent
  ]
})
export class Testing { }
