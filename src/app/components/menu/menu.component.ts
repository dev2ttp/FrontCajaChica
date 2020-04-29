import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  disabled = false;

  constructor() { }

  ngOnInit() {
  }

  onclickMenu(e: any, action: string) {
    // Lógica
  }

  signOut(e: any) {

  }
}
