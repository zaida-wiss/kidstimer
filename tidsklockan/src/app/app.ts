import { Component, signal } from '@angular/core';
import { TaskRow } from './task-row/task-row';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  imports: [TaskRow],
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  protected readonly tasks: Task[] = [
    { id: 1, name: 'Klä på sig',  icon: '👕', minutes: 5, color: 'red' },
    { id: 2, name: 'Äta frukost', icon: '🥣', minutes: 15, color: 'orange' },
    { id: 3, name: 'Gå på toaletten', icon: '🚽', minutes: 3, color: 'green' },
    { id: 4, name: 'Borsta tänderna', icon: '🪥', minutes: 2, color: 'blue' },
    { id: 5, name: 'På med utekläder', icon: '🧥', minutes: 2, color: 'red' },

  ];
}
