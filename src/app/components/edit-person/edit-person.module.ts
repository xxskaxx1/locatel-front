import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPersonComponent } from './edit-person.component';


@NgModule({
  declarations: [EditPersonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EditPersonModule { }
