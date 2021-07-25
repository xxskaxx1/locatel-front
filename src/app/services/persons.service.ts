import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import { Person } from '../interfaces/person';
import { Rol } from '../interfaces/rol';
import { Address } from '../interfaces/address';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  baseURL = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) { }


  getPersons(): Observable<Person[]>{
    return this.http.get<Person[]>(this.baseURL + '/persona');
  }

  getPerson(per_id: number): Observable<Person[]>{
    return this.http.get<Person[]>(this.baseURL + '/persona/' + per_id);
  }

  getRols(): Observable<Rol[]>{
    return this.http.get<Rol[]>(this.baseURL + '/getRol');
  }

  createPerson(person: Person): Observable<Person>{
    return this.http.post<Person>(this.baseURL + '/persona', person);
  }

  editPerson(person: Person[], per_id: any): Observable<Person>{
    let per = JSON.stringify({ person });
    return this.http.put<Person>(this.baseURL + '/persona/' + per_id, person);
  }

  deletePerson(per_id: number): Observable<Person[]>{
    return this.http.delete<Person[]>(this.baseURL + '/persona/' + per_id);
  }

}
