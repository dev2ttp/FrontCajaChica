import { Component, OnInit } from '@angular/core';
import { NgxToastrService } from '../../services/ngx-toastr/ngx-toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  disabled = false;

  constructor(
    private ngxToastrService: NgxToastrService
  ) { }

  ngOnInit() {
  }

  async getAuthorization(event: any) {
    event.preventDefault();
    this.disabled = true;
    try {
      // Lógica
    } catch (error) {
      this.disabled = false;
      this.ngxToastrService.error('Error de acceso al login de clave única');
    }
  }
}
