import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface';
import { listUsers } from '../data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getListUsers(): User[] {
    localStorage.setItem('user', JSON.stringify(listUsers));
    return listUsers;
  }
  pushUser(user: User): User[] {
    listUsers.push(user);
    return listUsers;
  }
}
