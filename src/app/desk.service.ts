import { Injectable } from '@angular/core';
import { Desk } from './models/desk';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DeskService {

  private desksUrl = 'http://localhost:3000/api/desks';

  desks: BehaviorSubject<Array<Desk>>;

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient) {
    this.desks = new BehaviorSubject([]);
    this.getDesks();
  }

  getDesks(): void {
    this.http.get<Desk[]>(this.desksUrl)
      .pipe(
        catchError(this.handleError('getDesks', []))
      )
      .subscribe(data => this.desks.next(data));
  }

  createDesk(newDesk: Desk): void {
    this.http.post<Desk>(this.desksUrl, newDesk)
      .pipe(
        catchError(this.handleError('postDesk', []))
      )
      .subscribe( (data: Desk) => {
        this.desks.next([...this.desks.value, data]);
      });
  }

  updateDesk(updDesk: Desk): void {
    this.http.put<Desk>(`${this.desksUrl}/${updDesk._id}`, updDesk)
      .pipe(
        catchError(this.handleError('updateDesk', []))
      )
      .subscribe((data: Desk) => {
        this.desks.next(this.desks.value.map(desk => desk._id === data._id ? data : desk));
      });
  }

  deleteDesk(id: string): void {
    this.http.delete(`${this.desksUrl}/${id}`)
      .pipe(
        catchError(this.handleError('deleteDesk', []))
      )
      .subscribe((data: Desk) => {
        this.desks.next(this.desks.value.filter(desk => desk._id !== data._id));
      });
  }
}
