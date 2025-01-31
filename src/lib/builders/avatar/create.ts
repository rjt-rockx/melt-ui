import {
	builder,
	effect,
	isBrowser,
	overridable,
	styleToString,
	toWritableStores,
	omit,
} from '$lib/internal/helpers';
import { readonly, writable } from 'svelte/store';
import type { CreateAvatarProps } from './types';

const defaults = {
	src: '',
	delayMs: 0,
	onLoadingStatusChange: undefined,
} satisfies CreateAvatarProps;

export const createAvatar = (props?: CreateAvatarProps) => {
	const withDefaults = { ...defaults, ...props } satisfies CreateAvatarProps;

	const options = toWritableStores(omit(withDefaults, 'loadingStatus', 'onLoadingStatusChange'));
	const { src, delayMs } = options;

	const loadingStatusWritable = withDefaults.loadingStatus ?? writable('loading');
	const loadingStatus = overridable(loadingStatusWritable, withDefaults?.onLoadingStatusChange);

	effect([src, delayMs], ([$src, $delayMs]) => {
		if (isBrowser) {
			const image = new Image();
			image.src = $src;
			image.onload = () => {
				if (delayMs !== undefined) {
					const timerId = window.setTimeout(() => {
						loadingStatus.set('loaded');
					}, $delayMs);
					return () => window.clearTimeout(timerId);
				} else {
					loadingStatus.set('loaded');
				}
			};
			image.onerror = () => {
				loadingStatus.set('error');
			};
		}
	});

	const image = builder('avatar-image', {
		stores: [src, loadingStatus],
		returned: ([$src, $loadingStatus]) => {
			const imageStyles = styleToString({
				display: $loadingStatus === 'loaded' ? 'block' : 'none',
			});
			return {
				src: $src,
				style: imageStyles,
			};
		},
	});

	const fallback = builder('avatar-fallback', {
		stores: [loadingStatus],
		returned: ([$loadingStatus]) => {
			return {
				style:
					$loadingStatus === 'loaded'
						? styleToString({
								display: 'none',
						  })
						: undefined,
				hidden: $loadingStatus === 'loaded' ? true : undefined,
			};
		},
	});

	return {
		elements: {
			image,
			fallback,
		},
		states: {
			loadingStatus: readonly(loadingStatus),
		},
		options,
	};
};
