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

  tasks: Task[];

  constructor(private deskService: DeskService,
              private taskService: TaskService) { }

  ngOnInit() {
    this.desks = this.deskService.desks;
    this.tasks = this.taskService.tasks;
  }

  addDesk(name: string): void {
    const desks: Desk[] = this.deskService.addDesk(name);
    if (desks) {
      this.desks = desks;
    }
  }

  addTask(action: string, deskId: number): void {
    const tasks: Task[] = this.taskService.addTask(action, deskId);
    if (tasks) {
      this.tasks = tasks;
    }
  }

  deleteDesk(id: number): void {
    this.desks = this.deskService.deleteDesk(id);
    this.tasks = this.taskService.deleteTask(id, true);
  }

  deleteTask(id: number): void {
    this.tasks = this.taskService.deleteTask(id);
  }

  renameDesk(id: number): void {
    const name: string = (prompt('Enter new name')).trim();
    const desks: Desk[] = this.deskService.renameDesk(id, name);
    if (desks) {
      this.desks = desks;
    }
  }

  changeTaskAction(action: string, id: number): void {
    const tasks: Task[] = this.taskService.changeTaskAction(action, id);
    if (tasks) {
      this.tasks = tasks;
    }
  }

  changeTaskStatus(id: number, status: boolean): void {
    this.tasks = this.taskService.changeTaskStatus(id, status);
  }

  transferTask(id: number): void {
    const deskId: number = +(prompt('Enter desk Id')).trim();
    if (!deskId) { return; }
    if (!(this.desks.filter(desk => desk.id === deskId).length)) { return; }
    const tasks: Task[] = this.taskService.transferTask(id, deskId);
    if (tasks) {
      this.tasks = tasks;
    }
  }
}
