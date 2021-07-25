import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { Routes, RouterModule } from '@angular/router';
import { FormPersonComponent } from './components/form-person/form-person.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { DetailsPersonComponent } from './components/details-person/details-person.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'Persons', component: IndexComponent },
  { path: 'FormNew', component: FormPersonComponent },
  { path: 'EditNew/:per_id', component: EditPersonComponent },
  { path: 'DetailsPerson/:per_id', component: DetailsPersonComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FormPersonComponent,
    EditPersonComponent,
    DetailsPersonComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    IndexComponent,
    FormPersonComponent,
    EditPersonComponent
  ]
})
export class AppModule { }
