<script lang="ts">
	import { createSeparator, melt, type CreateSeparatorProps } from '$lib';

	export let orientation: CreateSeparatorProps['orientation'] = 'vertical';

	const {
		elements: { root: vertical },
	} = createSeparator({
		orientation,
	});

	const {
		elements: { root: horizontal },
	} = createSeparator({
		orientation: 'horizontal',
		decorative: true,
	});

	const icecreams = ['Caramel', 'Vanilla', 'Napolitan'];
</script>

<h2>Melt UI</h2>
<p>Flavors for everyone</p>
<div use:melt={$horizontal} class="separator separator--horizontal" />
<div class="ice-creams">
	{#each icecreams as icecream, i}
		<p>{icecream}</p>
		{#if i !== icecreams.length - 1}
			<div use:melt={$vertical} class="separator separator--vertical" />
		{/if}
	{/each}
</div>

<style>
	h2 {
		font-weight: var(--tw-font-weight-bold);
	}

	.ice-creams {
		display: flex;
		align-items: center;
		column-gap: var(--tw-size-3_5);
	}

	.separator {
		--tw-bg-opacity: 1;

		background-color: rgb(255 255 255 / var(--tw-bg-opacity));
	}

	.separator--horizontal {
		margin-top: var(--tw-size-3_5);
		margin-bottom: var(--tw-size-3_5);
		height: 1px;
		width: 100%;
	}

	.separator--vertical {
		height: var(--tw-size-4);
		width: 1px;
	}
</style>
