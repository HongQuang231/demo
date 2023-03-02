import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { CommonModule } from '@angular/common';

import { WelcomeComponent } from './welcome.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ModalInfoModule } from 'src/app/modal-info/modal-info.module';


@NgModule({
  imports: [WelcomeRoutingModule, NzTableModule, CommonModule, NzButtonModule, NzGridModule, NzIconModule, NzInputModule, ModalInfoModule, FormsModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
