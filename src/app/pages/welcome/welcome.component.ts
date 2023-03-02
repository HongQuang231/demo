import { Component, OnInit } from '@angular/core';

interface User {
  id: number,
  name: string,
  email: string,
}
export enum CheckModal {
  'Add' = 0,
  'Edit' = 1,
  'Delete' = 2,
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
  constructor() { }

  ngOnInit() {
  }
  listUsers: User[] = [
    {
      id: 1,
      name: 'John Brown',
      email: 'New York No. 1 Lake Park'
    },
    {
      id: 2,
      name: 'Jim Green',
      email: 'London No. 1 Lake Park'
    },
    {
      id: 3,
      name: 'Joe Black',
      email: 'Sidney No. 1 Lake Park'
    }
  ];
}
