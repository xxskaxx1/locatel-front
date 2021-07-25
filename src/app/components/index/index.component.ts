import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Person } from '../../interfaces/person';
import { PersonsService } from '../../services/persons.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  persons: Person[];
  id: any;

  constructor(private personsService: PersonsService, private router: Router, ) { 
    this.persons = [];
  }

  ngOnInit(): void {
    this.GetPersons();
  }

  
  GetPersons(): void{
    this.personsService.getPersons().subscribe((response: Person[]) => {
      this.persons = response;
    },error => {
      Swal.fire('Error, comuniquese con el administrador del sistema', '', 'error');
    });
  }

  GoDetail(item: any): void{
    this.router.navigate(['/DetailsPerson/' + item])
  }

  GoEdit(item: any): void{
    this.router.navigate(['/EditNew/' + item])
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
          this.GetPersons();
          Swal.fire('Se ha eliminado el registro!', '', 'success');          
      },error => {
        Swal.fire('Error al Eliminar el registro', '', 'error');
      }
      );
      }
    });
  }
  
}
