import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../../services/db';
import { AuthService } from '../../services/auth';

@Component({
  standalone: false,
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
  habitacionId!: number;
  habitacion: any;
  fechaInicio!: string;
  fechaFin!: string;
  total: number = 0;
  anticipo: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: DbService,
    private auth: AuthService 
  ) {}

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.habitacionId = idParam ? +idParam : 0;

    const habitaciones = await this.db.getHabitaciones();
    this.habitacion = habitaciones.find((h: any) => h.id === this.habitacionId);
  }

  calcular() {
    if (this.fechaInicio && this.fechaFin) {
      const inicio = new Date(this.fechaInicio);
      const fin = new Date(this.fechaFin);
      const dias = (fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24);
      if (dias > 0) {
        this.total = dias * this.habitacion.precio;
        this.anticipo = this.total * 0.3;
      } else {
        this.total = 0;
        this.anticipo = 0;
      }
    }
  }

  async confirmar() {
    const usuario = this.auth.getUser();
    const reserva = {
      cliente: usuario?.nombre || usuario?.email || 'Desconocido',
      habitacionId: this.habitacionId,
      fecha_inicio: this.fechaInicio,
      fecha_fin: this.fechaFin,
      pagado: false
    };
    await this.db.addReserva(reserva);
    this.router.navigate(['/mis-reservas']);
  }
}
