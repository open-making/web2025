<script lang="ts">
	import ImageCard from './ImageCard.svelte';
	import heyJudeData from '$lib/assets/images/hey-jude/metadata.json';

	const heyJudeImages = import.meta.glob('$lib/assets/images/hey-jude/processed/*.webp', {
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

	const heyJudeProjects = shuffleArray(
		heyJudeData
			.filter((item) => item.url && item.imageName)
			.map((project) => ({
				...project,
				imageSrc: heyJudeImages[`/src/lib/assets/images/hey-jude/processed/${project.imageName}`]
			}))
	);
</script>

<div class="gallery-grid hey-jude-grid">
	{#each heyJudeProjects as project}
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

	.hey-jude-grid .gallery-item:nth-child(5n) {
		grid-column: span 2;
		--scroll-duration: 14s;
	}

	.hey-jude-grid .gallery-item:nth-child(7n) {
		grid-row: span 2;
		--scroll-duration: 16s;
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