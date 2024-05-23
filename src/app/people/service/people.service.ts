import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../people';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private readonly API_URL = 'https://randomuser.me/api/?inc=name,picture';

  constructor(private httpClient: HttpClient) {}

  fetchRandomPerson(): Observable<{ results: Person[] }> {
    return this.httpClient.get<{ results: Person[] }>(this.API_URL);
  }
}
