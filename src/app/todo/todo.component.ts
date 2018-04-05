import { Component, OnInit } from '@angular/core';
import { Desk } from '../desk';
import { DeskService } from '../desk.service';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  desks: Desk[];

  lastDeskId: number;

  tasks: Task[];

  lastTaskId: number;

  constructor(private deskService: DeskService,
              private taskService: TaskService) { }

  ngOnInit() {
    this.getDesks();
    this.getTasks();
    this.lastDeskId = Math.max(...this.desks.map(desk => desk.id), 0);
    this.lastTaskId = Math.max(...this.tasks.map(desk => desk.id), 0);
  }

  getDesks(): void {
    this.desks = this.deskService.getDesks();
  }

  getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  addDesk(name: string): void {
    name = name.trim();
    if (!name) { return; }
    const id = ++this.lastDeskId;
    this.desks.push({ name, id } as Desk);
    this.deskService.updateDesks(this.desks);
  }

  addTask(action: string, deskId: number): void {
    action = action.trim();
    if (!action) { return; }
    const id = ++this.lastTaskId;
    const status = false;
    this.tasks.push({ id, action, status, deskId } as Task);
    this.taskService.updateTasks(this.tasks);
  }

  deleteDesk(id: number): void {
    this.desks = this.desks.filter(desk => desk.id !== id);
    this.tasks = this.tasks.filter(task => task.deskId !== id);
    this.deskService.updateDesks(this.desks);
    this.taskService.updateTasks(this.tasks);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.taskService.updateTasks(this.tasks);
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

  changeAction(action: string, id: number): void {
    action = action.trim();
    if (!action) { return; }
    this.tasks.forEach(task => {
      if (task.id === id) {
        task.action = action;
      }
    });
    this.taskService.updateTasks(this.tasks);
  }

  completeTask(id: number, status: boolean): void {
    if (status) { return; }
    this.tasks.forEach(task => {
      if (task.id === id) {
        task.status = true;
      }
    });
    this.taskService.updateTasks(this.tasks);
  }

  transferTask(id: number): void {
    const deskId: number = +(prompt('Enter desk Id')).trim();
    if (!deskId) { return; }
    if (!(this.desks.filter(desk => desk.id === deskId).length)) { return; }
    this.tasks.forEach(task => {
      if (task.id === id) {
        task.deskId = deskId;
      }
    });
    this.taskService.updateTasks(this.tasks);
  }
}
