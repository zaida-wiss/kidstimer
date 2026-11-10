// En union type: bara dessa fyra strängar är tillåtna
export type TaskColor = 'red' | 'orange' | 'green' | 'blue';

// Ett interface beskriver formen på ett objekt 
export interface Task {
    id: number;
    name: string;
    icon: string;
    minutes: number;
    color: TaskColor;
}

export const COLORS: TaskColor [] = ['red', 'orange', 'green', 'blue'];
export const ICONS: string[] = ['👕', '🥣', '🚽', '🪥', '🎒', '👟', '🧥', '📚', '🧸', '⭐'];

// Parametertyp och returtyp skrivs UrlTree.
export function totalMinutes(tasks: Task[]): number {
    return tasks.reduce((sum, task) => sum + task.minutes,0);
}

// 295 -> "4:55"
export function formatTime(seconds: number): string {
    const m = Math.floor(seconds /60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}
