import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
  listUsers: User[] = [];
  searchText: any = '';
  validateForm!: UntypedFormGroup;
  constructor(private users: UserService, private fb: UntypedFormBuilder) { }

  ngOnInit() {
    this.listUsers = this.users.getListUsers();
    this.validateForm = this.fb.group({
      id: [null, [Validators.required], [Validators.email]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  handleDelete(user: User) {
    this.listUsers = this.listUsers.filter((item) => item.id !== user.id);
  }
  handleEdit(user: User) {
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
  };

  handleAdd(user: User) {
      const userx = {
        ...user,
        id: Number(user.id)
      }
      localStorage.setItem('user', JSON.stringify(user));
      this.listUsers = this.users.pushUser(userx);
      return this.listUsers;
  };

  searchByText() {
    if(this.searchText) {
      const newList = this.listUsers.map((item) => item.email.includes(this.searchText) ? item : null) as unknown as User[];
      this.listUsers = newList.filter((item) => item !== null);
      return this.listUsers;
    }
    return this.listUsers = this.users.getListUsers();
  }
}
