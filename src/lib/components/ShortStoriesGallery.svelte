<script lang="ts">
	import ImageCard from './ImageCard.svelte';
	import shortStoriesData from '$lib/data/short-stories-metadata.json';

	const shortStoriesImages = import.meta.glob('$lib/assets/images/short-stories/processed/*.webp', {
		eager: true,
		import: 'default'
	});

	function shuffleArray(array: any[]) {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}

	const shortStoriesProjects = shuffleArray(
		(shortStoriesData.entries || []).map((project) => ({
			...project,
			imageSrc:
				shortStoriesImages[`/src/lib/assets/images/short-stories/processed/${project.imageName}`]
		}))
	);
</script>

<div class="gallery-grid short-stories-grid">
	{#each shortStoriesProjects as project}
		<div class="gallery-item">
			<ImageCard {project} />
		</div>
	{/each}
</div>

<style>
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
		grid-auto-flow: dense;
	}

	.short-stories-grid .gallery-item:nth-child(6n) {
		grid-column: span 2;
		--scroll-duration: 15s;
	}

	.short-stories-grid .gallery-item:nth-child(8n) {
		grid-row: span 2;
		--scroll-duration: 18s;
	}

	@media (max-width: 768px) {
		.gallery-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.gallery-item {
			grid-column: span 1 !important;
			grid-row: span 1 !important;
		}
	}
</style>