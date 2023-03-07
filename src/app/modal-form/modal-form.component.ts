import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckModal } from '../pages/welcome/welcome.component';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() handleFunc!: Function;
  @Input() checkModal!: CheckModal;
  constructor() { }

  ngOnInit(): void {
  }

}
