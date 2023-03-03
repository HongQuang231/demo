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
  guestForm1!: FormGroup;
  guestForm2!: FormGroup;
  guestFormx!: FormGroup;

  constructor(private fb: UntypedFormBuilder, private user: UserService) { }

  ngOnInit(): void {
    this.guestForm1 = new FormGroup({
      id: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });

    this.guestForm2 = new FormGroup({
      id: new FormControl({ value: String(this.userx?.id) , disabled: false}),
      email: new FormControl({ value: this.userx?.email, disabled: false }),
      password: new FormControl({ value: this.userx?.password, disabled: false }),
    });

    this.guestFormx = new FormGroup({
      id: new FormControl({ value: String(this.userx?.id) , disabled: true}),
      email: new FormControl({ value: this.userx?.email, disabled: true }),
      password: new FormControl({ value: this.userx?.password, disabled: true }),
    });
  }

  handleDelete() {
    this.deleteUser.emit(this.userx);
  }

  handleEdit(): Observable<any> {
    if (this.guestForm2.valid) {
      this.editUser.emit(this.guestForm2.value);
      this.handleOk();
    };
    return of(true);
  }

  handleAdd(): Observable<any> {
    if(this.guestForm1.valid) {
      this.addUser.emit(this.guestForm1.value);
      this.handleOk();
      this.guestForm1 = new FormGroup({
        id: new FormControl({ value: "" ,disabled: false}),
        email: new FormControl({ value: "" ,disabled: false}),
        password: new FormControl({ value: "" ,disabled: false}),
      });
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
