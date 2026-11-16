import { Component, inject, output } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { TaskStore } from '../task-store';
import { TaskRow } from '../task-row/task-row';
import { Task } from '../task.model';

@Component({
  selector: 'app-settings-view',
  imports: [TaskRow, CdkDropList, CdkDrag],
  templateUrl: './settings-view.html',
  styleUrl: './settings-view.css',
})
export class SettingsView {
  protected readonly store = inject(TaskStore);
  readonly start = output<void>();

  // CdkDragDrop<Task[]> är en generisk typ: händelsen gäller en lista av Task.
  drop(event: CdkDragDrop<Task[]>): void {
    this.store.move(event.previousIndex, event.currentIndex);
  }
}