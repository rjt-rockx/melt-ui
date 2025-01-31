import { writable, readonly } from 'svelte/store';
import { createMenuBuilder } from '../menu';
import type { CreateDropdownMenuProps } from './types';
import { overridable, toWritableStores } from '$lib/internal/helpers';

const defaults = {
	arrowSize: 8,
	positioning: {
		placement: 'bottom',
	},
	preventScroll: true,
	closeOnEscape: true,
	closeOnOutsideClick: true,
	portal: 'body',
	loop: false,
	dir: 'ltr',
	defaultOpen: false,
	forceVisible: false,
} satisfies CreateDropdownMenuProps;

export function createDropdownMenu(props?: CreateDropdownMenuProps) {
	const withDefaults = { ...defaults, ...props } satisfies CreateDropdownMenuProps;

	const rootOptions = toWritableStores(withDefaults);

	const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
	const rootOpen = overridable(openWritable, withDefaults?.onOpenChange);

	const rootActiveTrigger = writable<HTMLElement | null>(null);
	const nextFocusable = writable<HTMLElement | null>(null);
	const prevFocusable = writable<HTMLElement | null>(null);

	const {
		trigger,
		menu,
		item,
		arrow,
		createSubmenu,
		createCheckboxItem,
		createMenuRadioGroup,
		separator,
	} = createMenuBuilder({
		rootOptions,
		rootOpen,
		rootActiveTrigger,
		nextFocusable,
		prevFocusable,
		disableTriggerRefocus: true,
		selector: 'dropdown-menu',
	});

	return {
		elements: {
			trigger,
			menu,
			item,
			arrow,
			separator,
		},
		states: {
			open: readonly(rootOpen),
		},
		builders: {
			createCheckboxItem,
			createSubmenu,
			createMenuRadioGroup,
		},
		options: rootOptions,
	};
}
