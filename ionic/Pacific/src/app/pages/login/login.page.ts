import { Component } from '@angular/core';
import { DbService } from 'src/app/services/db';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private db: DbService, private router: Router) {}

  async login() {
    const user = await this.db.getUsuarioPorEmail(this.email);
    if (user && user.password === this.password) {
      alert(`Bienvenido ${user.nombre}`);
      this.router.navigate(['/catalogo']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}