import { Injectable } from '@angular/core';
import { Desk } from './desk';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {from} from 'rxjs/observable/from';
import { catchError, map, tap } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DeskService {

  private desksUrl = 'http://localhost:3000/api/desks';

  private tasksUrl = 'http://localhost:3000/api/tasks';

  desks: Desk[];

  lastDeskId: number;

  testDesks: BehaviorSubject<Array<Desk>>;

  constructor(
    private http: HttpClient) {
    this.getDesks();
    this.getDesksTest();
  }

  createDeskTest(desk): void {
    this.http.post<Desk[]>(this.desksUrl, desk)
      .pipe(
        catchError(this.handleError('postDesk', []))
      )
      .subscribe(
        this.testDesks.next([...this.testDesks.getValue(), data]);
      );
  }

  getDesksTest(): void {
    this.http.get<Desk[]>(this.desksUrl)
      .pipe(
        catchError(this.handleError('getDesks', []))
      )
      .subscribe(desks => this.testDesks.next(desks));
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

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
