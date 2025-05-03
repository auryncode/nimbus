import { writable } from 'svelte/store';

export const toasts = writable([]);

export function addToast(message, type = 'info', duration = 2500) {
	toasts.update((all) => [...all, { id: Date.now(), message, type }]);

	setTimeout(() => {
		toasts.update((all) => all.slice(1));
	}, duration);
}
