import { Component, OnInit } from '@angular/core';
import { Desk } from '../desk';
import { DeskService } from '../desk.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  desks: Desk[];

  lastId: number;

  constructor(private deskService: DeskService) { }

  ngOnInit() {
    this.getDesks();
    this.lastId = Math.max(...this.desks.map(desk => desk.id), 0);
  }

  getDesks(): void {
    this.desks = this.deskService.getDesks();
  }

  addDesk(name: string): void {
    name = name.trim();
    if (!name) { return; }
    const id = ++this.lastId;
    this.desks.push({ name, id } as Desk);
    this.deskService.updateDesks(this.desks);
  }

  deleteDesk(id: number): void {
    this.desks = this.desks.filter(desk => desk.id !== id);
    this.deskService.updateDesks(this.desks);
  }

  renameDesk(id: number): void {
    const name: string = (prompt('Enter new name')).trim();
    if (!name) { return; }
    this.desks.forEach(desk => {
      if (desk.id === id) {
        desk.name = name;
      }
    });
    this.deskService.updateDesks(this.desks);
  }
}
