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
    if(localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user')!);
    }
    localStorage.setItem('user', JSON.stringify(listUsers));
    return listUsers;
  }

  searchByText(searchText: string, listUsers: User[]) {
    if(JSON.parse(localStorage.getItem('user')!)) {
      listUsers = JSON.parse(localStorage.getItem('user')!);
    }
    if(searchText.trim()) {
      const newList = listUsers.map((item) => item.email.toLowerCase().includes(searchText.trim().toLowerCase()) ? item : null) as unknown as User[];
      listUsers = newList.filter((item) => item !== null);
      return listUsers;
    }
    return listUsers = this.getListUsers();
  }
  }
