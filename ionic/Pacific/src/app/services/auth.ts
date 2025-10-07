import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private currentUser: any = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const session = await this.storage.get('session');
    if (session) {
      this.isAuthenticated = true;
      this.currentUser = session;
    }
  }

  async register(user: any) {
    const users = (await this.storage.get('users')) || [];
    const exists = users.find((u: any) => u.email === user.email);
    if (exists) throw new Error('El correo ya está registrado');
    users.push(user);
    await this.storage.set('users', users);
    return true;
  }

  async login(email: string, password: string) {
    const users = (await this.storage.get('users')) || [];
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      this.isAuthenticated = true;
      this.currentUser = found;
      await this.storage.set('session', found);
      return true;
    }
    return false;
  }

  async logout() {
    this.isAuthenticated = false;
    this.currentUser = null;
    await this.storage.remove('session');
  }

  getUser() {
    return this.currentUser;
  }

  getAuthState() {
    return this.isAuthenticated;
  }
}
