import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, AsyncValidator } from '@angular/forms';
import { listUsers } from 'src/app/data';
import { User } from 'src/app/interface';
import { UserService } from 'src/app/service/user.service';

export enum CheckModal {
  'Add' = 0,
  'Edit' = 1,
  'Delete' = 2,
  'NoEdit' = 3,
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  title?: string = "Add User";
  title1?: string = "Edit";
  title2?: string = "Delete";
  title3?: string = "Show";
  listUsers: User[] = listUsers;
  searchText: any = '';
  validateForm!: UntypedFormGroup;
  constructor(private users: UserService, private fb: UntypedFormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      id: [null, [Validators.required], [Validators.email],],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  handleDelete(user: User) {
    this.listUsers = JSON.parse(localStorage.getItem('user')!) && this.listUsers.filter((item) => item.id !== user.id);
    localStorage.setItem('user', JSON.stringify(this.listUsers));
  }

  handleEdit(user: User) {
    const newList = this.listUsers.map((item) => {
      if (item.id == Number(user.id)) {
        return {
          ...item,
          email: user.email,
          password: user.password
        }
      }
      return item;
    });
    localStorage.setItem('user', JSON.stringify(newList));
    this.listUsers = JSON.parse(localStorage.getItem('user')!);
  };

  handleAdd(user: User) {
      const userx = {
        ...user,
        id: Number(user.id)
      }
      this.listUsers.push(userx);
      localStorage.setItem('user', JSON.stringify(this.listUsers));
      return this.listUsers =JSON.parse(localStorage.getItem('user')!);
  };

  searchByText() {
    if(this.searchText) {
      const newList = this.listUsers.map((item) => item.email.toLowerCase().includes(this.searchText.toLowerCase()) ? item : null) as unknown as User[];
      this.listUsers = newList.filter((item) => item !== null);
      localStorage.setItem('user', JSON.stringify(this.listUsers));
      return this.listUsers =JSON.parse(localStorage.getItem('user')!);
    }
    return this.listUsers = listUsers;
  }
}
