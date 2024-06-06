import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | any;

  constructor(private router: Router){}

  ngOnInit() {
    this.items = [
      {
        items: [
          {
            label: 'Ingresar',
            icon: 'pi pi-sign-in',
            command: () => {
              this.router.navigate(['/login']);
            }
          },
          {
            label: 'Registrar',
            icon: 'pi pi-user-plus',
            command: () => {
              this.router.navigate(['/register']);
            }
          },
        ],
      },
    ];
  }
}
