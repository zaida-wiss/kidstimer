import { Component, input } from '@angular/core';
import { Task } from '../task.model';

@Component({
  imports: [],
  selector: 'app-task-row',
  styleUrl: './task-row.css',
  templateUrl: './task-row.html',
})
export class TaskRow {
  // En input tar emot data från föräldern: <app-task-row [task]="..." />
  // .required betyder att föräldern måste skicka med ett värde.
  readonly task = input.required<Task>();
}
