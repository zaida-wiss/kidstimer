import { Component, inject, signal } from '@angular/core';
import { TaskRow } from './task-row/task-row';
import { TaskStore } from './task-store';
import { TimerView } from './timer-view/timer-view';

// Bara dessa två värden är tillåtsna.
type Mode = 'settings' | 'running';

@Component({
  selector: 'app-root',
  imports: [TaskRow, TimerView],
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  //inject() hämtar den gemensamma instansen av servicen.
  protected readonly store = inject(TaskStore);
  protected readonly mode = signal<Mode>('settings');
}
