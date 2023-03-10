import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { listUsers } from '../data';
import { SubUser, User } from '../interface';
import { CheckModal } from '../pages/welcome/welcome.component';
import { UserService } from '../service/user.service';
import { NotifierService } from 'angular-notifier';


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
  @Output() addUser = new EventEmitter<SubUser>();

  isVisible = false;
  isConfirmLoading = false;
  guestForm1!: FormGroup;
  guestForm2!: FormGroup;
  guestFormx!: FormGroup;

  constructor(private fb: UntypedFormBuilder, private user: UserService, private notifier: NotifierService) { }

  ngOnInit(): void {
    switch(this.checkModal) {
      case 0:
        this.guestForm1 = new FormGroup({
            email: new FormControl({ value: "" ,disabled: false}, [Validators.required, Validators.email]),
            password: new FormControl({ value: "" ,disabled: false}, [Validators.required, Validators.minLength(8)]),
        });
        return;
      case 1:
        this.guestForm2 = new FormGroup({
          email: new FormControl({ value: this.userx?.email, disabled: false }, [Validators.required, Validators.email]),
          password: new FormControl({ value: this.userx?.password, disabled: false }, [Validators.required, Validators.minLength(8)]),
        });
        return;
      case 3:
        this.guestFormx = new FormGroup({
          id: new FormControl({ value: String(this.userx?.id) , disabled: true}),
          email: new FormControl({ value: this.userx?.email, disabled: true }),
          password: new FormControl({ value: this.userx?.password, disabled: true }),
        });
        return;
      default: return;
    }
  }

  handleDelete() {
    this.deleteUser.emit(this.userx);
  }

  handleEdit(): Observable<any> {
    if (this.guestForm2.valid) {
      const user = {
        id: this.userx?.id,
        email: this.guestForm2.value.email,
        password: this.guestForm2.value.password,
      } as User
      this.editUser.emit(user);
      this.handleOk();
    }
    else {this.notifier.notify('error', 'you dont edit user');}
    return of(true);
  }

  handleAdd(): Observable<any> {
    if(this.guestForm1.valid) {
      console.log(this.guestForm1.value);
      this.addUser.emit(this.guestForm1.value);
      this.handleOk();
      this.guestForm1 = new FormGroup({
        email: new FormControl({ value: "" ,disabled: false}, [Validators.required, Validators.email]),
        password: new FormControl({ value: "" ,disabled: false}, [Validators.required, Validators.minLength(8)]),
      });
    }
    else {this.notifier.notify('error', 'you dont add user');}
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
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
