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
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NotifierModule } from 'angular-notifier';


@NgModule({
  imports: [WelcomeRoutingModule, NzTableModule, CommonModule, NzButtonModule, NzGridModule, NzIconModule, NzInputModule, ModalInfoModule, FormsModule, NzAlertModule, NotifierModule.withConfig({
    position: {
      horizontal: {
        position: 'right',
        distance: 12,
      },
      vertical: {
        position: 'top',
        distance: 12,
        gap: 10,
      },
    },
    theme: 'material',
    behaviour: {
      autoHide: 2000,
      onClick: false,
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4,
    },
    animations: {
      enabled: true,
      show: {
        preset: 'slide',
        speed: 300,
        easing: 'ease',
      },
      hide: {
        preset: 'fade',
        speed: 300,
        easing: 'ease',
        offset: 50,
      },
      shift: {
        speed: 300,
        easing: 'ease',
      },
      overlap: 150,
    },
  })],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
