import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NgxToastrService {

  constructor(private toastrService: ToastrService) { }

  success(message: string) {
    this.toastrService.success(message);
  }

  error(message: string) {
    this.toastrService.error(message);
  }

  info(message: string) {
    this.toastrService.info(message);
  }

  warn(message: string) {
    this.toastrService.warning(message);
  }
}
