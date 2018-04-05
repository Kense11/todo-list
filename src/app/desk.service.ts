import { Injectable } from '@angular/core';
import { Desk } from './desk';

@Injectable()
export class DeskService {

  desks: Desk[];

  lastDeskId: number;

  constructor() {
    this.getDesks();
  }

  getDesks(): void {
    const desksFromStorage: string = localStorage.getItem('deskObject');
    this.desks = (desksFromStorage) ?
      JSON.parse(desksFromStorage) :
      [];
    this.lastDeskId = Math.max(...this.desks.map(desk => desk.id), 0);
  }

  updateDesks(): void {
    localStorage.setItem('deskObject', JSON.stringify(this.desks));
  }

  addDesk(name: string): Desk[] {
    name = name.trim();
    if (!name) { return; }
    const id: number = ++this.lastDeskId;
    this.desks.push({ name, id } as Desk);
    this.updateDesks();
    return this.desks;
  }

  deleteDesk(id: number): Desk[] {
    this.desks = this.desks.filter(desk => desk.id !== id);
    this.updateDesks();
    return this.desks;
  }

  renameDesk(id: number, name: string): Desk[] {
    if (!name) { return; }
    this.desks.forEach(desk => {
      if (desk.id === id) {
        desk.name = name;
      }
    });
    this.updateDesks();
    return this.desks;
  }
}
