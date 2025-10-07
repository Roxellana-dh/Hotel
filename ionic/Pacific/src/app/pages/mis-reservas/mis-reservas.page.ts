import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db';

@Component({
  standalone: false,
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.page.html',
  styleUrls: ['./mis-reservas.page.scss'],
})
export class MisReservasPage implements OnInit {
  reservas: any[] = [];

  constructor(private db: DbService) {}

  async ngOnInit() {
    this.reservas = await this.db.getReservas();
  }

  getTotal(reserva: any): number {
    if (!reserva.fecha_inicio || !reserva.fecha_fin || !reserva.precio) return 0;
    const inicio = new Date(reserva.fecha_inicio);
    const fin = new Date(reserva.fecha_fin);
    const dias = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24);
    return dias > 0 ? dias * reserva.precio : 0;
  }

  getAnticipo(reserva: any): number {
    return this.getTotal(reserva) * 0.3;
  }
}
