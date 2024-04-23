import { renderOnPage } from '../renderer.js';

async function getUserEvents(userName, userInfo, repos) {
	try {
		const response = await fetch(
			`https://api.github.com/users/${userName}/events`
		);
		const userEvents = await response.json();

		filterEvents(userInfo, repos, userEvents);
	} catch (error) {
		console.error('Error fetching user events:', error);
		error.message;
	}
}

async function filterEvents(userInfo, repos, userEvents) {
	let filteredEvents = userEvents.filter(
		(e) => e.type === 'PushEvent' || e.type === 'CreateEvent'
	);

	renderOnPage(userInfo, repos, filteredEvents);
}

export { getUserEvents };
export let userEvents;
