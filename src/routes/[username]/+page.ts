import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import studentDatabase from '$lib/data/student-database.json';

export const load: PageLoad = async ({ params, fetch }) => {
	const { username } = params;

	// Find student in database
	const student = Object.values(studentDatabase.students).find(
		(s: any) => s.username === username
	);

	if (!student) {
		throw error(404, 'Student not found');
	}

	
	// Try to load detailed student data
	let studentData = null;
	try {
		const response = await fetch(`/src/lib/data/students/${username}.json`);
		if (response.ok) {
			studentData = await response.json();
		}
	} catch (e) {
		// Detailed data not available, continue with basic data
		console.log(`No detailed data found for ${username}`);
	}

	return {
		student,
		studentData
	};
};