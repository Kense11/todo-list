import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable()
export class TaskService {

  tasks: Task[];

  lastTaskId: number;

  constructor() {
    this.getTasks();
  }

  getTasks(): void {
    const tasksFromStorage: string = localStorage.getItem('taskObject');
    this.tasks = (tasksFromStorage) ?
      JSON.parse(tasksFromStorage) :
      [];
    this.lastTaskId = Math.max(...this.tasks.map(desk => desk.id), 0);
  }

  updateTasks(): void {
    localStorage.setItem('taskObject', JSON.stringify(this.tasks));
  }

  addTask(action: string, deskId: number): Task[] {
    action = action.trim();
    if (!action) { return; }
    const id: number = ++this.lastTaskId;
    const status = false;
    this.tasks.push({ id, action, status, deskId } as Task);
    this.updateTasks();
    return this.tasks;
  }

  deleteTask(id: number, isDeskId?: boolean): Task[] {
    this.tasks = this.tasks.filter(task => ((isDeskId) ? task.deskId : task.id) !== id);
    this.updateTasks();
    return this.tasks;
  }

  changeTaskAction(action: string, id: number): Task[] {
    action = action.trim();
    if (!action) { return; }
    this.tasks.forEach(task => {
      if (task.id === id) {
        task.action = action;
      }
    });
    this.updateTasks();
    return this.tasks;
  }

  changeTaskStatus(id: number, status: boolean): Task[] {
    this.tasks.forEach(task => {
      if (task.id === id) {
        task.status = !status;
      }
    });
    this.updateTasks();
    return this.tasks;
  }

  transferTask(id: number, deskId: number): Task[] {
    this.tasks.forEach(task => {
      if (task.id === id) {
        task.deskId = deskId;
      }
    });
    this.updateTasks();
    return this.tasks;
  }
}
