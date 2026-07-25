import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from "@angular/material/select";
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { PipeModule } from '../pipe/pipe.module';
import { HeaderComponent } from '../header/header.component';
// import { RentheaderComponent } from '../rentheader/rentheader.component';
import { RentinnerheaderComponent } from '../rentinnerheader/rentinnerheader.component';
import { SearchDropdownBank } from '../search-dropdown-bank/search-dropdown-bank.component';
import { SearchDropdownBranchComponent } from '../search-dropdown-branch/search-dropdown-branch.component';
import { SearchDropdownCityComponent } from '../search-dropdown-city/search-dropdown-city.component';
import { SearchDropdownStateComponent } from '../search-dropdown-state/search-dropdown-state.component';
import { SearchDropdownPinBranchComponent } from '../search-dropdown-pin-branch/search-dropdown-pin-branch.component';
import { SearchDropdownPinCityComponent } from '../search-dropdown-pin-city/search-dropdown-pin-city.component';
import { SearchDropdownTalukComponent } from '../search-dropdown-taluk/search-dropdown-taluk.component';
import { SearchDropdownComponent } from '../search-dropdown/search-dropdown.component';
// import { InnerheaderComponent } from '../innerheader/innerheader.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    HeaderComponent,
    // RentheaderComponent,
    RentinnerheaderComponent,
    SearchDropdownBank,
    SearchDropdownBranchComponent,
    SearchDropdownCityComponent,
    SearchDropdownStateComponent,

    SearchDropdownComponent,
    SearchDropdownPinBranchComponent,
    SearchDropdownPinCityComponent,
    SearchDropdownTalukComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    RouterModule.forChild(routes),
    MatAutocompleteModule,
    AutoCompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    
  ],
  exports: [
    HeaderComponent,
    RouterModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    // RentheaderComponent,
    RentinnerheaderComponent,
    SearchDropdownBank,
    SearchDropdownBranchComponent,
    SearchDropdownCityComponent,
    SearchDropdownStateComponent,
    SearchDropdownComponent,
    SearchDropdownPinBranchComponent,
    SearchDropdownPinCityComponent,
    SearchDropdownTalukComponent
    
  ]
})
export class SharedModule { }
