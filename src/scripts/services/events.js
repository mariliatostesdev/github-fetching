import { renderOnPage, reposList } from '../renderer.js';
import { eventsList } from '../renderer.js';

async function getUserEvents(userName, reposQtty, userInfo, repos) {
	try {
		const response = await fetch(
			`https://api.github.com/users/${userName}/events`
		);
		const userEvents = await response.json();

		filterEvents(userName, reposQtty, userInfo, repos, userEvents);
	} catch (error) {
		console.error('Error fetching user events:', error);
		error.message;
	}
}

async function filterEvents(userName, reposQtty, userInfo, repos, userEvents) {
	let filteredEvents = userEvents.filter(
		(e) => e.type === 'PushEvent' || e.type === 'CreateEvent'
	);

	renderOnPage(userName, reposQtty, userInfo, repos, userEvents, filteredEvents);
}

export { getUserEvents };
export let userEvents;
