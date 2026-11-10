import { Component, inject } from '@angular/core';
import { TaskRow } from './task-row/task-row';
import { TaskStore } from './task-store';

@Component({
  selector: 'app-root',
  imports: [TaskRow],
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  //inject() hämtar den gemensamma instansen av servicen.
  protected readonly store = inject(TaskStore);
}
