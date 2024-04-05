<script lang="ts">
	import { Button, Dropdown, DropdownItem, Search } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	type Item = {
		label: string;
		value: string | undefined;
		icon?: string;
	};

	export let label: string;
	export let items: Item[];
	export let value: string | undefined;

	let dropdownOpen = false;
	let filterValue = '';
	let filteredItems = items;
	let selectedItem: Item | undefined;

	function handleClick(selectedValue: Item['value']) {
		value = selectedValue;
		dropdownOpen = false;
		filterValue = '';
	}

	value = undefined;

	$: filterValue,
		(filteredItems = items.filter(({ label }) =>
			label.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
		));
	$: value, (selectedItem = items.find((item) => item.value === value));
	$: items, (items = [{ value: undefined, label: 'All' }, ...items]);
</script>

<div class="flex flex-col">
	<div class="py-1 font-bold">{label}</div>
	<Button class="text-dark border border-gray-400 bg-white hover:bg-gray-200 focus:ring-gray-100">
		{#if selectedItem}
			{#if selectedItem.icon}
				<img src={selectedItem.icon} alt={selectedItem.label} class="me-2 h-6 max-w-6" />
			{/if}
			{selectedItem.label}
		{:else}
			Select
		{/if}
		<ChevronDownOutline class="ms-2 h-6 w-6" />
	</Button>
	<Dropdown bind:open={dropdownOpen}>
		<div slot="header" class="p-3">
			<Search size="md" bind:value={filterValue} />
		</div>
		{#if filteredItems.length}
			{#each filteredItems as item}
				<DropdownItem
					on:click={() => handleClick(item.value)}
					class={`flex items-center ${item.value === value ? 'bg-gray-200' : ''}`}
				>
					{#if item.icon}
						<img src={item.icon} alt={item.label} class="me-2 h-10 max-w-10" />
					{/if}
					{item.label}
				</DropdownItem>
			{/each}
		{:else}
			<div class="px-4">No result</div>
		{/if}
	</Dropdown>
</div>
