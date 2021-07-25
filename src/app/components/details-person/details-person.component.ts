import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonsService } from 'src/app/services/persons.service';
import Swal from 'sweetalert2';
import { Person } from '../../interfaces/person';

@Component({
  selector: 'app-details-person',
  templateUrl: './details-person.component.html',
  styleUrls: ['./details-person.component.css']
})
export class DetailsPersonComponent implements OnInit {
  id: any;
  person: { per_id: number; per_name: string; per_phone: string; per_email: string; per_rol: number; address: string; rol_nombre: string; add_street: string; add_city: string; add_state: string; add_postal_code: number; add_country: string; };

  constructor(private personsService: PersonsService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.params['per_id'];
    this.personsService.getPerson(this.id).subscribe((response: Person[]) => {
      if(response.length>0){
        this.person = {
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
  }

  goBack(): void {
    this.router.navigate(['/'])
  }

  GoEdit(item: any): void{
    this.router.navigate(['/EditNew/' + item]);
  }

  GoDelete(item: any): void{
    Swal.fire({
      title: 'Seguro que desea eliminar esta persona?',
      showDenyButton: true,
      denyButtonText: `Si, eliminar`,
      confirmButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isDenied) {
        this.personsService.deletePerson(item).subscribe((response: Person[]) => {
          Swal.fire('Se ha eliminado el registro!', '', 'success');
          this.router.navigate(['/']);
      },error => {
        Swal.fire('Error al Eliminar el registro', '', 'error');
      }
      );
      }
    });
  }

}
