import { Component, inject, output } from '@angular/core';
import { TaskRow } from '../task-row/task-row';
import { TaskStore } from '../task-store';

@Component({
  imports: [TaskRow],
  selector: 'app-settings-view',
  styleUrl: './settings-view.css',
  templateUrl: './settings-view.html',
})
export class SettingsView {
  protected readonly store = inject(TaskStore);
  readonly start = output<void>();
}
