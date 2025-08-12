<script lang="ts">
	import type { PageData } from './$types';
	import * as Accordion from '$lib/components/ui/accordion';
	import MarkdownContent from '$lib/components/MarkdownContent.svelte';

	export let data: PageData;

	const { student, studentData } = data;

	// Get initials from name or username
	function getInitials(name: string | null, username: string): string {
		if (name) {
			return name
				.split(' ')
				.map((part) => part.charAt(0).toUpperCase())
				.slice(0, 2)
				.join('');
		}
		return username.charAt(0).toUpperCase() + (username.charAt(1) || '').toUpperCase();
	}

	// Get display name (first name or username)
	function getDisplayName(name: string | null, username: string): string {
		if (name) {
			const firstName = name.split(' ')[0];
			return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
		}
		return username;
	}

	// Group dev notes by day
	function groupDevNotesByDay(devNotes: any[]) {
		const grouped = new Map();

		devNotes.forEach((note) => {
			const day = note.issueTitle;
			if (!grouped.has(day)) {
				grouped.set(day, []);
			}
			grouped.get(day).push(note);
		});

		return Array.from(grouped.entries()).map(([day, notes]) => ({
			day,
			notes: notes.sort(
				(a: any, b: any) => new Date(a.date.iso).getTime() - new Date(b.date.iso).getTime()
			)
		}));
	}

	$: initials = getInitials(student.name, student.username);
	$: displayName = getDisplayName(student.name, student.username);
	$: avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(initials)}&backgroundColor=f3f4f6&textColor=374151`;
	$: devNotesByDay = studentData?.devNotes ? groupDevNotesByDay(studentData.devNotes) : [];
</script>

<svelte:head>
	<title>{displayName} - Open Making</title>
</svelte:head>

<main class="mx-auto min-h-screen max-w-7xl p-8">
	<div class="grid grid-cols-1 relative gap-12 md:grid-cols-3">
		<!-- Left Column: Student Header + Work -->
		<div class="space-y-8 sticky top-8 h-fit">
			<!-- Student Header -->
			<div class="space-y-6">
				<div class="flex items-center gap-6">
					<img
						src={avatarUrl}
						alt="{displayName}'s avatar"
						class="h-20 w-20 rounded-full border-2 border-black bg-white"
					/>
					<div>
						<h1
							class="text-5xl leading-tight font-bold text-gray-800"
							style="font-family: 'LibreCaslonCondensed', serif; letter-spacing: -0.02em;"
						>
							{student.name || student.username}
						</h1>
						<p
							class="text-lg text-gray-500 opacity-70"
							style="font-family: 'Atkinson Hyperlegible', sans-serif;"
						>
							@{student.username}
						</p>
					</div>
				</div>

				{#if student.socialLinks?.length > 0 || student.website}
					<div class="flex flex-wrap gap-3">
						{#if student.website}
							<a
								href={student.website}
								class="inline-block rounded-xl border-2 border-black bg-white px-6 py-2 text-sm font-medium text-gray-800 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
								style="font-family: 'Atkinson Hyperlegible', sans-serif;"
								target="_blank"
								rel="noopener noreferrer"
							>
								Website
							</a>
						{/if}
						{#each student.socialLinks as link}
							<a
								href={link}
								class="inline-block rounded-xl border-2 border-black bg-white px-6 py-2 text-sm font-medium text-gray-800 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
								style="font-family: 'Atkinson Hyperlegible', sans-serif;"
								target="_blank"
								rel="noopener noreferrer"
							>
								Social Link
							</a>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Work Cards -->
			<div class="space-y-6">
				<h2
					class="text-4xl leading-tight font-bold text-gray-800"
					style="font-family: 'LibreCaslonCondensed', serif; letter-spacing: -0.02em;"
				>
					Work
				</h2>
				<div class="grid grid-cols-2 gap-4">
					{#each Array(3) as _, i}
						<div
							class="overflow-hidden rounded-xl border-2 border-black bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
						>
							<div
								class="flex aspect-[4/3] items-center justify-center border-b border-gray-200 bg-gray-50"
							>
								<div class="text-center text-gray-400">
									<h3
										class="mb-2 text-xl text-gray-500"
										style="font-family: 'LibreCaslonCondensed', serif;"
									>
										Project {i + 1}
									</h3>
									<p
										class="text-sm text-gray-400"
										style="font-family: 'Atkinson Hyperlegible', sans-serif;"
									>
										Coming soon...
									</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Right Column: Dev Notes and Other Content -->
		<div class="col-span-2 space-y-8">
			<!-- Dev Notes Section -->
			{#if devNotesByDay.length > 0}
				<div class="space-y-6">
					<h2
						class="text-4xl leading-tight font-bold text-gray-800"
						style="font-family: 'LibreCaslonCondensed', serif; letter-spacing: -0.02em;"
					>
						Dev Notes
					</h2>

					<Accordion.Root class="space-y-2">
						{#each devNotesByDay as { day, notes }}
							<Accordion.Item value={day} class="overflow-hidden border-b-2 border-black">
								<Accordion.Trigger class="py-4 text-left hover:no-underline">
									<div class="flex w-full items-center justify-between">
										<h3
											class="text-xl font-bold text-gray-800"
											style="font-family: 'LibreCaslonCondensed', serif;"
										>
											{day}
										</h3>
									</div>
								</Accordion.Trigger>
								<Accordion.Content>
									<div class="space-y-6">
										{#each notes as note}
											<div class="mb-2 flex items-center gap-2 text-xs text-gray-500">
												<span style="font-family: 'Atkinson Hyperlegible', sans-serif;">
													{note.date.formatted}
												</span>
												{#if note.commentUrl}
													<a
														href={note.commentUrl}
														target="_blank"
														rel="noopener noreferrer"
														class="text-blue-600 transition-colors hover:text-blue-800"
													>
														View on GitHub
													</a>
												{/if}
											</div>
											<MarkdownContent content={note.content} />
										{/each}
									</div>
								</Accordion.Content>
							</Accordion.Item>
						{/each}
					</Accordion.Root>
				</div>
			{/if}

			<!-- Future content sections can go here -->
			<div class="min-h-[50vh]">
				<!-- Space for additional content -->
			</div>
		</div>
	</div>
</main>
