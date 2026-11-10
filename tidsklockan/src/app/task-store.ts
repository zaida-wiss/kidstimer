import { Service, computed, signal } from '@angular/core';
import { Task, totalMinutes } from './task.model';

const DEFAULT_TASKS: Task[] = [
    { id: 1, name: 'Klä på sig', icon: '👕', minutes: 5, color: 'red' },
    { id: 2, name: 'Äta frukost', icon: '🥣', minutes: 15, color: 'orange' },
    { id: 3, name: 'Gå på toaletten', icon: '🚽', minutes: 3, color: 'green' },
    { id: 4, name: 'Borsta tänderna', icon: '🪥', minutes: 2, color: 'blue' },
];

@Service()
export class TaskStore {
    //Privat, skrivbar signal. Bara servicen får ändra listan.
    private readonly _tasks = signal<Task[]>(DEFAULT_TASKS);

    //Publik, skrivbordsskyddad version för komponenterna.
    readonly tasks = this._tasks.asReadonly();

    //Räknas om automatiskt när _tasks ändras.
    readonly total = computed(() => totalMinutes(this._tasks()));
}
