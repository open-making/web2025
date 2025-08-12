<script lang="ts">
	import ImageCard from '$lib/components/ImageCard.svelte';
	import ImageCollageComponent from '$lib/components/ImageCollageComponent.svelte';
	import StudentCard from '$lib/components/StudentCard.svelte';
	import heyJudeData from '$lib/assets/images/hey-jude/metadata.json';
	import shortStoriesData from '$lib/data/short-stories-metadata.json';
	import studentDatabase from '$lib/data/student-database.json';
	import heyJude from '$lib/assets/images/hey-jude.png';
	import shortStories from '$lib/assets/images/short-stories.png';
	const heyJudeImages = import.meta.glob('$lib/assets/images/hey-jude/processed/*.webp', {
		eager: true,
		import: 'default'
	});

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

	const heyJudeProjects = shuffleArray(
		heyJudeData
			.filter((item) => item.url && item.imageName)
			.map((project) => ({
				...project,
				imageSrc: heyJudeImages[`/src/lib/assets/images/hey-jude/processed/${project.imageName}`]
			}))
	);

	const shortStoriesProjects = shuffleArray(
		(shortStoriesData.entries || []).map((project) => ({
			...project,
			imageSrc:
				shortStoriesImages[`/src/lib/assets/images/short-stories/processed/${project.imageName}`]
		}))
	);

	// Process student data for student cards
	const students = Object.values(studentDatabase.students)
		.filter((student) => student.username !== 'thedivtagguy') // Filter out instructor
		.sort((a, b) => {
			const nameA = a.name || a.username;
			const nameB = b.name || b.username;
			return nameA.localeCompare(nameB);
		});
</script>

<svelte:head>
	<title>Gallery - Open Making</title>
</svelte:head>

<main class="relative min-h-screen">
	<ImageCollageComponent />

	<section class="section">
		<div class="section-intro">
			<h2 class="section-title">Take a Sad Site, and Make it Sadder</h2>
			<div class="section-content">
				<figure class="section-image space-y-2">
					<img
						src={heyJude}
						alt="plain markup of hey jude"
						class=" rotate-2 rounded-sm border-2 border-black"
					/>
					<figcaption>This is all everyone started with!</figcaption>
				</figure>
				<p class="section-text">
					Right away on Day 2, we jumped into getting introduced to HTML and CSS! Before we even <em
						>thought</em
					> about designing things that looked "nice" and worthy of being made by designers, it felt
					like a better idea to get our hands and brains a little messy. This exercise was similar to
					splashing paint on walls or doodling on the back of notebooks; except we needed to get our
					sites to look as ugly as possible with any new CSS properties we could discover. Starting with
					a plain, unstyled HTML document, we proceeded to making the biggest mess we could manage in
					an afternoon. Our sites were up on the internet from the second day too!
				</p>
			</div>
		</div>
		<div class="gallery-grid hey-jude-grid">
			{#each heyJudeProjects as project}
				<div class="gallery-item">
					<ImageCard {project} />
				</div>
			{/each}
		</div>
	</section>

	<section class="section">
		<div class="section-intro">
			<h2 class="section-title">Short Stories</h2>
			<div class="section-content">
				<figure class="section-image space-y-2">
					<img
						src={shortStories}
						alt="plain markup of a hans christian andersen story"
						class=" h-96 -rotate-2 rounded-sm border-2 border-black object-cover"
					/>
					<figcaption>Starting with plain text and building a site around it</figcaption>
				</figure>
				<p class="section-text">
					Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
					of classical Latin literature from 45 BC, making it over 2000 years old. Richard
					McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the
					more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the
					cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum
					comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
					of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
					ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum
					dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum
					used since the 1500s is reproduced below for those interested. Sections 1.10.32 and
					1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
					original form, accompanied by English versions from the 1914 translation by H. Rackham.
				</p>
			</div>
		</div>
		<div class="gallery-grid short-stories-grid">
			{#each shortStoriesProjects as project}
				<div class="gallery-item">
					<ImageCard {project} />
				</div>
			{/each}
		</div>
	</section>

	<section class="section">
		<div class="section-intro">
			<h2 class="section-title">Meet the team</h2>
		</div>
		<div class="students-grid">
			{#each students as student}
				<StudentCard
					student={{
						username: student.username,
						name: student.name,
						website: student.website,
						socialLinks: student.socialLinks
					}}
				/>
			{/each}
		</div>
	</section>
</main>

<style>
	.section {
		padding: 4rem 2rem;
		max-width: 1300px;
		margin: 0 auto;
	}

	.section-intro {
		margin-bottom: 3rem;
	}

	.section-title {
		font-family: 'LibreCaslonCondensed', serif;
		font-size: 3rem;
		font-weight: bold;
		line-height: 0.85;
		margin-bottom: 1.5rem;
		color: var(--color-neutral);
		letter-spacing: -0.02em;
	}

	.section-content {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 3rem;
		align-items: start;
	}

	.section-image {
		position: sticky;
		top: 2rem;
	}

	.section-text {
		font-family: 'Atkinson Hyperlegible', sans-serif;
		font-size: 1.125rem;
		line-height: 1.7;
		color: var(--color-neutral);
		text-align: justify;
		columns: 2;
		column-gap: 2rem;
	}

	.section-text::first-letter {
		font-family: 'LibreCaslonCondensed', serif;
		font-size: 4rem;
		font-weight: bold;
		line-height: 0.75;
		float: left;
		margin: 1rem;
		color: var(--color-purple);
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1rem;
		grid-auto-flow: dense;
	}

	.students-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	@media (max-width: 768px) {
		.section {
			padding: 2rem 1rem;
		}

		.section-title {
			font-size: 2.5rem;
			margin-bottom: 1rem;
		}

		.section-content {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.section-image {
			justify-self: center;
			position: static;
		}

		.image-placeholder {
			width: 150px;
			height: 150px;
		}

		.section-text {
			columns: 1;
			font-size: 1rem;
			column-rule: none;
		}

		.section-text::first-letter {
			font-size: 3rem;
			margin: 0.1rem 0.15rem 0 0;
		}

		.gallery-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.students-grid {
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 1rem;
		}

		.gallery-item {
			grid-column: span 1 !important;
			grid-row: span 1 !important;
		}
	}
</style>
