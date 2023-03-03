import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { listUsers } from '../data';
import { User } from '../interface';
import { CheckModal } from '../pages/welcome/welcome.component';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent implements OnInit {
  @Input() title?: string;
  @Input() checkModal?: CheckModal;
  @Input() userx?: User;
  @Input() validateForm!: UntypedFormGroup;
  @Output() deleteUser = new EventEmitter<User>();
  @Output() editUser = new EventEmitter<User>();
  @Output() addUser = new EventEmitter<User>();

  isVisible = false;
  isConfirmLoading = false;
  guestForm!: FormGroup;

  constructor(private fb: UntypedFormBuilder, private user: UserService) { }

  ngOnInit(): void {
    this.guestForm = new FormGroup({
      id: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  handleDelete() {
    this.deleteUser.emit(this.userx);
  }

  handleEdit(): Observable<any> {
    if (this.guestForm.valid) {
      this.editUser.emit(this.guestForm.value);
      this.handleOk();
    };
    return of(true);
  }

  handleAdd(): Observable<any> {
    if(this.guestForm.valid) {
      this.addUser.emit(this.guestForm.value);
      this.handleOk();
    }
    return of(true);
  }

  showModal(): void {
    this.isVisible = true;
    console.log(this.checkModal);
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
