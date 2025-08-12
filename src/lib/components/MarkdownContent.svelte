<script lang="ts">
	import { marked } from 'marked';
	import * as Dialog from '$lib/components/ui/dialog';
	import { afterUpdate } from 'svelte';

	export let content: string;

	let dialogOpen = false;
	let selectedImage: { src: string; alt: string } | null = null;
	let containerElement: HTMLDivElement;

	function openImageDialog(src: string, alt: string) {
		selectedImage = { src, alt };
		dialogOpen = true;
	}

	$: htmlContent = marked.parse(content);

	afterUpdate(() => {
		if (containerElement) {
			// Find all images and make them clickable
			const images = containerElement.querySelectorAll('img');
			images.forEach(img => {
				img.style.cursor = 'pointer';
				img.addEventListener('click', () => {
					const src = img.src;
					const alt = img.alt || '';
					openImageDialog(src, alt);
				});
			});
		}
	});
</script>

<div
	bind:this={containerElement}
	class="prose prose-sm max-w-none"
	style="font-family: 'Atkinson Hyperlegible', sans-serif;"
>
	{@html htmlContent}
</div>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="max-w-4xl max-h-[90vh] p-0">
		{#if selectedImage}
			<div class="relative">
				<Dialog.Close class="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-gray-600 hover:bg-white hover:text-gray-900 transition-colors">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="m18 6-12 12"/>
						<path d="m6 6 12 12"/>
					</svg>
				</Dialog.Close>
				<img
					src={selectedImage.src}
					alt={selectedImage.alt}
					class="w-full h-auto max-h-[85vh] object-contain rounded-lg"
				/>
		
			</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>

