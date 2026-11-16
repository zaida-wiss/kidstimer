import { Component, signal } from '@angular/core';
import { SettingsView } from './settings-view/settings-view';
import { TimerView } from './timer-view/timer-view';

type Mode = 'settings' | 'running';

@Component({
  selector: 'app-root',
  imports: [SettingsView, TimerView],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly mode = signal<Mode>('settings');
}