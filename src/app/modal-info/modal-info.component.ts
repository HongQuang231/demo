import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: UntypedFormBuilder, private user: UserService) { }

  ngOnInit(): void {
  }

  handleDelete() {
    this.deleteUser.emit(this.userx);
  }

  handleEdit() {
    if (this.validateForm.valid) {
      this.editUser.emit(this.validateForm.value);
      this.handleOk();
    };
  }

  handleAdd() {
    if(this.validateForm.valid) {
      this.addUser.emit(this.validateForm.value);
      this.handleOk();
    }
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
