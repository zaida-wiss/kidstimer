import { Component, input, output } from '@angular/core';
import { Task } from '../task.model';
import { CdkDragHandle } from '@angular/cdk/drag-drop';

@Component({
  imports: [CdkDragHandle],
  selector: 'app-task-row',
  styleUrl: './task-row.css',
  templateUrl: './task-row.html',
})
export class TaskRow {
  // En input tar emot data från föräldern: <app-task-row [task]="..." />
  // required betyder att föräldern måste skicka med ett värde.
  readonly task = input.required<Task>();

  // outputs = händelser som raden skickar uppåt till föräldern.
  readonly minus = output<void>();
  readonly plus = output<void>();
  readonly remove = output<void>();
  readonly rename = output<string>();
  readonly iconClick = output<void>();

  protected onNameInput(event: Event): void {
    //"as" berättar för TypeScript vilken sorts element det är.
    const value = (event.target as HTMLInputElement).value;
    this.rename.emit(value);
  }
}
