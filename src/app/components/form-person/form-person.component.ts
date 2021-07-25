import { Component, OnInit } from '@angular/core';
import { Person } from '../../interfaces/person';
import { Rol } from '../../interfaces/rol';
import { PersonsService } from '../../services/persons.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css']
})
export class FormPersonComponent implements OnInit {
  rols: Rol[];
  persons: Person = null;
  formNewPerson: FormGroup;
  submit: any;

  constructor(private personsService: PersonsService, private router: Router, private fb: FormBuilder) {
    this.rols = [];
    this.initForm();
    this.submit = 0;
  }

  ngOnInit(): void {
    this.personsService.getRols().subscribe((response: Rol[]) => {
      this.rols = response;
    },error => console.error(error));
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  SavePerson(): void {
    this.submit = 1;
    if(this.formNewPerson.status == 'VALID'){
      this.personsService.createPerson(this.formNewPerson.value).subscribe((response: Person) => {
        Swal.fire('Se ha creado el registro correctamente!', '', 'success');
        this.router.navigate(['/']);
      },error => {
          Swal.fire('Error al Crear el registro', '', 'error');
        }
      );
    }else{
      Swal.fire('Debe completar todos los campos...', '', 'error');
    }
  }

  private initForm(): void {
    this.formNewPerson = this.fb.group({
      per_name: ['',[Validators.required, Validators.maxLength(255)]],
      per_phone: ['',[Validators.required, Validators.max(999999999999999)]],
      per_email: ['',[Validators.required,Validators.email, Validators.maxLength(100)]],
      per_rol: ['',[Validators.required]],
      add_street: ['',[Validators.required, Validators.maxLength(150)]],
      add_city: ['',[Validators.required, Validators.maxLength(150)]],
      add_state: ['',[Validators.required, Validators.maxLength(150)]],
      add_postal_code: ['',[Validators.required, Validators.max(999999999)]],
      add_country: ['',[Validators.required, Validators.maxLength(150)]]
    })
  }
  
}
