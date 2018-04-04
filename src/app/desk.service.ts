import { Injectable } from '@angular/core';
import { Desk } from './desk';

@Injectable()
export class DeskService {

  constructor() { }

  getDesks(): Desk[] {
    if (!localStorage.getItem('deskObject')) {
      return [];
    }
    return JSON.parse(localStorage.getItem('deskObject'));
  }

  updateDesks(desks: Desk[]): void {
    localStorage.setItem('deskObject', JSON.stringify(desks));
  }
}
