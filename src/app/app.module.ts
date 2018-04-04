import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { DeskService } from './desk.service';
import { TaskService } from './task.service';


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DeskService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
