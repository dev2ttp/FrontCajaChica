import { Component, OnInit } from '@angular/core';
import { IAuth } from '../../interfaces/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth: IAuth = { user: '', password: '' };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(data: IAuth) {
    console.log(data);
    // Lógica
  }

}
