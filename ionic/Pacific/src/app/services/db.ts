import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    console.log('✅ Almacenamiento inicializado (modo navegador)');
  }

  // 👤 CRUD Usuarios
  async addUsuario(usuario: any) {
    const usuarios = (await this._storage?.get('usuarios')) || [];
    usuarios.push(usuario);
    await this._storage?.set('usuarios', usuarios);
    console.log('Usuario agregado:', usuario);
  }

  async getUsuarios() {
    return (await this._storage?.get('usuarios')) || [];
  }

  async getUsuarioPorEmail(email: string) {
    const usuarios = (await this._storage?.get('usuarios')) || [];
    return usuarios.find((u: any) => u.email === email);
  }

  // 🏨 CRUD Habitaciones
  async addHabitacion(habitacion: any) {
    const habitaciones = (await this._storage?.get('habitaciones')) || [];
    habitaciones.push(habitacion);
    await this._storage?.set('habitaciones', habitaciones);
  }

  async getHabitaciones() {
    return (await this._storage?.get('habitaciones')) || [];
  }

  async poblarHabitacionesDemo() {
    const existentes = await this.getHabitaciones();
    if (!existentes || existentes.length === 0) {
      await this._storage?.set('habitaciones', [
        { id: 1, numero: 101, categoria: 'Suite', descripcion: 'Vista al mar', precio: 120 },
        { id: 2, numero: 102, categoria: 'Doble', descripcion: 'Vista a la ciudad', precio: 80 }
      ]);
    }
  }

  // 📅 CRUD Reservas
  async addReserva(reserva: any) {
    const reservas = (await this._storage?.get('reservas')) || [];
    reservas.push(reserva);
    await this._storage?.set('reservas', reservas);
  }

  async getReservas() {
    return (await this._storage?.get('reservas')) || [];
  }

  async clearAll() {
    await this._storage?.clear();
  }
}
