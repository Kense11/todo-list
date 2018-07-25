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
    this.getData();
  }

  log() {
    console.log(this.tasks);
    console.log(this.desks);
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

  updateDesk(id: string): void {
    const name: string = (prompt('Enter new name')).trim();
    if (!name) { return; }
    this.deskService.updateDesk(id, { name } as Desk);
  }

  deleteDesk(id: string): void {
    this.deskService.deleteDesk(id);
    this.taskService.deleteTask(id, true);
  }

  createTask(action: string, deskId: string): void {
    action = action.trim();
    if (!action) { return; }
    const status = false;
    this.taskService.createTask({ action, status, deskId } as Task);
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id);
  }



  // changeTaskAction(action: string, id: number): void {
  //   const tasks: Task[] = this.taskService.changeTaskAction(action, id);
  //   if (tasks) {
  //     this.tasks = tasks;
  //   }
  // }
  //
  // changeTaskStatus(id: number, status: boolean): void {
  //   this.tasks = this.taskService.changeTaskStatus(id, status);
  // }
  //
  // transferTask(id: number): void {
  //   const deskId: number = +(prompt('Enter desk Id')).trim();
  //   if (!deskId) { return; }
  //   if (!(this.desks.filter(desk => desk._id === deskId).length)) { return; }
  //   const tasks: Task[] = this.taskService.transferTask(id, deskId);
  //   if (tasks) {
  //     this.tasks = tasks;
  //   }
  // }
}
