import { Service, computed, effect, signal } from '@angular/core';
import { COLORS, ICONS, Task, totalMinutes } from './task.model';


const STORAGE_KEY = 'tidsklockan-tasks';
const DEFAULT_TASKS: Task[] = [
    { id: 1, name: 'Klä på sig', icon: '👕', minutes: 5, color: 'red' },
    { id: 2, name: 'Äta frukost', icon: '🥣', minutes: 15, color: 'orange' },
    { id: 3, name: 'Gå på toaletten', icon: '🚽', minutes: 3, color: 'green' },
    { id: 4, name: 'Borsta tänderna', icon: '🪥', minutes: 2, color: 'blue' },
];


@Service()
export class TaskStore {
    //Privat, skrivbar signal. Bara servicen får ändra listan.
    //Startvärdet läses från localStorage om det finns något sparat.
    private readonly _tasks = signal<Task[]>(this.load());

    //Publik, skrivbordsskyddad version för komponenterna.
    readonly tasks = this._tasks.asReadonly();

    //Räknas om automatiskt när _tasks ändras.
    readonly total = computed(() => totalMinutes(this._tasks()));

  constructor() {
    // Körs direkt och sedan varje gång _tasks ändras.
    effect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._tasks()));
      } catch {
        /* t.ex. privat läge – appen fungerar ändå */
      }
    });
  }

  private load(): Task[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as Task[];
    } catch {
      /* ignorera */
    }
    return DEFAULT_TASKS;
  }

      add(): void {
    this._tasks.update(tasks => {
      const id = Math.max(0, ...tasks.map(t => t.id)) + 1;
      const color = COLORS[tasks.length % COLORS.length];
      return [...tasks, { id, name: 'Ny uppgift', icon: '⭐', minutes: 5, color }];
    });
  }

  remove(id: number): void {
    this._tasks.update(tasks => tasks.filter(t => t.id !== id));
  }

  // Partial<Task> = ett objekt med några (valfria) av Tasks fält.
  update(id: number, changes: Partial<Task>): void {
    this._tasks.update(tasks => tasks.map(t => (t.id === id ? { ...t, ...changes } : t)));
  }

  changeMinutes(id: number, delta: number): void {
    const task = this._tasks().find(t => t.id === id);
    if (!task) return;
    const minutes = Math.min(60, Math.max(1, task.minutes + delta));
    this.update(id, { minutes });
  }

  nextIcon(id: number): void {
    const task = this._tasks().find(t => t.id === id);
    if (!task) return;
    const icon = ICONS[(ICONS.indexOf(task.icon) + 1) % ICONS.length];
    this.update(id, { icon });
  }

  move(from: number, to: number): void {
    this._tasks.update(tasks => {
        const copy = [...tasks];
        const [moved] = copy.splice(from, 1);    //plocka ut
        copy.splice(to, 0, moved);              //sätt in på ny plats

        return copy;
    });
  }

}
