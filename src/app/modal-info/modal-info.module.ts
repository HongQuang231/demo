import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ModalInfoComponent } from './modal-info.component';
import { NzModalModule } from 'ng-zorro-antd/modal';


@NgModule({
  imports: [NzTableModule, CommonModule, NzButtonModule, NzGridModule, NzIconModule, NzInputModule, NzModalModule, FormsModule, ReactiveFormsModule],
  declarations: [ModalInfoComponent],
  exports: [ModalInfoComponent]
})
export class ModalInfoModule { }
