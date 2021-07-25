import { Component, OnInit } from '@angular/core';
import { PersonsService } from '../../services/persons.service';
import { Person } from '../../interfaces/person';
import { Rol } from '../../interfaces/rol';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  rols: Rol[];
  persons = null;
  id: any;
  formEditPerson: FormGroup;
  submit: any;
  
  constructor(private personsService: PersonsService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) { 
    this.initForm();
    this.submit = 0;
    this.rols = [];
    this.id = this.activatedRoute.snapshot.params['per_id'];
    this.personsService.getPerson(this.id).subscribe((response: Person[]) => {
      if(response.length>0){
        this.persons = {
          per_id: response[0].per_id,
          per_name: response[0].per_name,
          per_phone: response[0].per_phone,
          per_email: response[0].per_email,
          per_rol: response[0].per_rol,
          address: response[0].address,
          rol_nombre: response[0].rol_nombre,
          add_street: response[0].add_street,
          add_city: response[0].add_city,
          add_state: response[0].add_state,
          add_postal_code: response[0].add_postal_code,
          add_country: response[0].add_country
        };
        this.formEditPerson.patchValue(this.persons); 
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al consultar información...',
        })
        this.router.navigate(['/']);
      }
    },error => console.error(error));      
  }

  ngOnInit(): void {
    this.personsService.getRols().subscribe((response: Rol[]) => {
      this.rols = response;
    },error => console.error(error));    
  }

  goBack(): void {
    this.router.navigate(['/'])
  }

  EditPerson(): void {
    this.submit = 1;
    if(this.formEditPerson.status == 'VALID'){
      this.personsService.editPerson(this.formEditPerson.value, this.formEditPerson.value.per_id).subscribe((response: Person) => {
        Swal.fire('Se ha editado el registro correctamente!', '', 'success')
        this.router.navigate(['/'])
      },error => {
          Swal.fire('Error al Editar el registro', '', 'error');
        }
      );
    }else{
      Swal.fire('Debe completar todos los campos...', '', 'error');
    }
  }

  private initForm(): void {
    this.formEditPerson = this.fb.group({
      per_id: ['',[Validators.required]],
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
