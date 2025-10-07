import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db';

@Component({
  standalone: false,
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {
  habitaciones: any[] = [];

  constructor(private db: DbService) {}

  async ngOnInit() {
    await this.db.poblarHabitacionesDemo();
    this.habitaciones = await this.db.getHabitaciones();
  }
}
