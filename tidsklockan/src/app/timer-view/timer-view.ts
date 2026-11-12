import { Component, DestroyRef, computed, inject, output, signal } from '@angular/core';
import { TaskStore } from '../task-store';
import { formatTime } from '../task.model';

@Component({
  imports: [],
  selector: 'app-timer-view',
  styleUrl: './timer-view.css',
  templateUrl: './timer-view.html',
})

export class TimerView {
  private readonly store = inject(TaskStore);
  readonly stop = output<void>();

  //En kopia av listan när timern startar.
  protected readonly tasks = this.store.tasks();
  protected readonly index = signal(0);
  protected readonly remaining = signal(this.tasks[0]?.minutes * 60 || 0); //sekunder
  protected readonly paused = signal(false);

  protected readonly current = computed(() => this.tasks[this.index()]);
  protected readonly upcoming = computed(() =>this.tasks.slice(this.index() +1));
  protected readonly done = computed(() => this.index() >= this.tasks.length);
  protected readonly time = computed(() => formatTime(this.remaining()));
  //Hur stor del av tiden som är kvar, 0-100.
  protected readonly percentLeft = computed(() => {
    const task = this.current();
    return task ? (this.remaining() / (task.minutes *60)) * 100 : 0;
  });

  //Gör funktionen tillgänglig i mallen.
  protected readonly formatTime = formatTime;

  constructor() {
    const id = setInterval(() => this.tick(), 1000);
    //Städa upp när komponenten tas bort -annars tickar timern för evigt.
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }

  private tick(): void {
    if (this.paused() || this.done()) return;
    if (this.remaining() > 0) {
      this.remaining.update(s => s - 1);
    } else {
      this.next();
    }
  }

  next(): void {
    this.index.update(i => i + 1);
    const task = this.current();
    this.remaining.set(task ? task.minutes * 60 : 0);
  }

  togglePause(): void {
    this.paused.update(p => !p);
  }
  
}

