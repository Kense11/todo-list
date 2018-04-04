import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable()
export class TaskService {

  constructor() { }

  getTasks(): Task[] {
    if (!localStorage.getItem('taskObject')) {
      return [];
    }
    return JSON.parse(localStorage.getItem('taskObject'));
  }

  updateTasks(tasks: Task[]): void {
    localStorage.setItem('taskObject', JSON.stringify(tasks));
  }
}
