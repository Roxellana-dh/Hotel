import { Component } from '@angular/core';
import { DbService } from 'src/app/services/db';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre = '';
  email = '';
  password = '';

  constructor(private db: DbService, private router: Router) {}

  async registrar() {
    await this.db.addUsuario({
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rol: 'cliente'
    });
    alert('Usuario registrado correctamente');
    this.router.navigate(['/login']);
  }
}