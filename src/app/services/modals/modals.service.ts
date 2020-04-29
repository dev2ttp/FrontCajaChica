import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  public modalRef: BsModalRef;
  config = {
    backdrop: false,
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService) { }

  openModal(component, options) {
    const config = { ...this.config, ...options };
    this.modalRef = this.modalService.show(component, config);
  }

  closeModal() {
    this.modalRef.hide();
  }
}
