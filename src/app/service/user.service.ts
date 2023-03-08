import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface';
import { listUsers } from '../data';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  listUser?: User[];
  URL: string = 'api/'
  getListUsers(): User[] {
    if(localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user')!);
    }
    localStorage.setItem('user', JSON.stringify(listUsers));
    return listUsers;
  }

  // getList(): User[] {
  //   this.http.get<User[]>(this.URL);
  // }
  }
