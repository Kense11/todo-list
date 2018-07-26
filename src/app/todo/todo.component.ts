import { Component, OnInit } from '@angular/core';
import { Desk } from '../desk';
import { DeskService } from '../desk.service';
import { Task } from '../task';
import { TaskService } from '../task.service';
import {t} from '@angular/core/src/render3';


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
    this.getData();
  }

  getData(): void {
    this.deskService.desks.subscribe(
      data => this.desks = data
    );
    this.taskService.tasks.subscribe(
      data => this.tasks = data
    );
  }

  createDesk(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.deskService.createDesk({ name } as Desk);
  }

  updateDesk(desk: Desk): void {
    const name: string = (prompt('Enter new name')).trim();
    if (!name) { return; }
    const newDesk: Desk = Object.assign({}, desk);
    newDesk.name = name;
    this.deskService.updateDesk(newDesk);
  }

  deleteDesk(id: string): void {
    this.deskService.deleteDesk(id);
    this.taskService.deleteTask(id, true);
  }

  createTask(action: string = '', deskId: string): void {
    action = action.trim();
    if (!action) { return; }
    const status = false;
    this.taskService.createTask({ action, status, deskId } as Task);
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id);
  }

  changeTaskStatus(task: Task): void {
    const newTask: Task = Object.assign({}, task);
    newTask.status = !newTask.status;
    this.taskService.updateTask(newTask);
  }

  changeTaskAction(newAction: string = '', task: Task): void {
    newAction = newAction.trim();
    if (!newAction) { return; }
    const newTask: Task = Object.assign({}, task);
    newTask.action = newAction;
    this.taskService.updateTask(newTask);
  }

  transferTask(task: Task): void {
    const deskId: string = (prompt('Enter desk Id') || '').trim();
    if (!deskId) { return; }
    if (!(this.desks.filter(desk => desk._id === deskId).length)) { return; }
    const newTask: Task = Object.assign({}, task);
    newTask.deskId = deskId;
    this.taskService.updateTask(newTask);
  }

}
