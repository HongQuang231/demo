import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, AsyncValidator } from '@angular/forms';
import { listUsers } from 'src/app/data';
import { User } from 'src/app/interface';
import { UserService } from 'src/app/service/user.service';
import { NotifierService } from 'angular-notifier';

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
  listUsers: User[] = this.users.getListUsers();
  searchText: any = '';
  show?: boolean;
  validateForm!: UntypedFormGroup;
  constructor(private users: UserService, private fb: UntypedFormBuilder, private notify: NotifierService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      id: [null, [Validators.required], [Validators.email],],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  handleDelete(user: User) {
    this.listUsers = this.listUsers.filter((item) => item.id !== user.id);
    localStorage.setItem('user', JSON.stringify(this.listUsers));
    this.notify.notify('success', 'You are awesome delete user')
  }

  handleEdit(user: User) {
    try {
      this.listUsers = this.listUsers.map((item) => {
        if (item.id == Number(user.id)) {
          return {
            ...item,
            email: user.email,
            password: user.password
          }
        }
        return item;
      });
      localStorage.setItem('user', JSON.stringify(this.listUsers));
      this.notify.notify('success', 'You are awesome edit user');
    }
    catch {
      this.notify.notify('error', 'You dont edit user');
    }
  };

  handleAdd(user: User) {
      const userx = {
        ...user,
        id: Number(user.id)
      }
      this.listUsers.push(userx);
      localStorage.setItem('user', JSON.stringify(this.listUsers));
      this.notify.notify('success', 'You are awesome add user')
      return this.listUsers =JSON.parse(localStorage.getItem('user')!);
  };

  searchByText() {
    if(JSON.parse(localStorage.getItem('user')!)) {
      this.listUsers = JSON.parse(localStorage.getItem('user')!);
    }
    if(this.searchText.trim()) {
      const newList = this.listUsers.map((item) => item.email.toLowerCase().includes(this.searchText.trim().toLowerCase()) ? item : null) as unknown as User[];
      this.listUsers = newList.filter((item) => item !== null);
      return this.listUsers;
    }
    return this.listUsers = this.users.getListUsers();
  }
}
