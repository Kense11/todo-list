import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Desk} from './desk';


@Injectable()
export class TaskService {

  private tasksUrl = 'http://localhost:3000/api/tasks';

  tasks: BehaviorSubject<Array<Task>>;

  constructor(
    private http: HttpClient
  ) {
    this.tasks = new BehaviorSubject([]);
    this.getTasks();
  }

  getTasks(): void {
    this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        catchError(this.handleError('getTasks', []))
      )
      .subscribe(data => this.tasks.next(data));
  }

  createTask(newTask: Task): void {
    this.http.post<Task>(this.tasksUrl, newTask)
      .pipe(
        catchError(this.handleError('postTask', []))
      )
      .subscribe( (data: Task) => {
        console.log(data);
        this.tasks.next([...this.tasks.value, data]);
      });
  }

  updateTask(id: string, updDesk: Desk): void {
    this.http.put<Desk>(`${this.desksUrl}/${id}`, updDesk)
      .pipe(
        catchError(this.handleError('updateDesk', []))
      )
      .subscribe((data: Desk) => {
        this.desks.next(this.desks.value.map(desk => desk._id === data._id ? data : desk));
      });
  }

  deleteTask(id: string, isDeskId?: boolean): void {
    if (isDeskId) {
      this.http.delete(`${this.tasksUrl}/many/${id}`)
        .pipe(
          catchError(this.handleError('deleteManyTasks', []))
        )
        .subscribe(() => {
          this.tasks.next(this.tasks.value.filter(task => task.deskId !== id));
        });
    } else {
      this.http.delete(`${this.tasksUrl}/${id}`)
        .pipe(
          catchError(this.handleError('deleteTask', []))
        )
        .subscribe((data: Task) => {
          this.tasks.next(this.tasks.value.filter(task => task._id !== data._id));
        });
    }
  }

  // changeTaskAction(action: string, id: number): Task[] {
  //   action = action.trim();
  //   if (!action) { return; }
  //   this.tasks.forEach(task => {
  //     if (task.id === id) {
  //       task.action = action;
  //     }
  //   });
  //   this.updateTasks();
  //   return this.tasks;
  // }
  //
  // changeTaskStatus(id: number, status: boolean): Task[] {
  //   this.tasks.forEach(task => {
  //     if (task.id === id) {
  //       task.status = !status;
  //     }
  //   });
  //   this.updateTasks();
  //   return this.tasks;
  // }
  //
  // transferTask(id: number, deskId: number): Task[] {
  //   this.tasks.forEach(task => {
  //     if (task.id === id) {
  //       task.deskId = deskId;
  //     }
  //   });
  //   this.updateTasks();
  //   return this.tasks;
  // }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
