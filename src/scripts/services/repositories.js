import { getUserEvents } from './events.js';

async function getRepos(userName, reposQtty, userInfo) {
	try {
		const response = await fetch(
			`https://api.github.com/users/${userName}/repos?sort=updated&direction=desc&per_page=${reposQtty}`
		);
		const repos = await response.json();

		getUserEvents(userName, userInfo, repos);
	} catch (error) {
		console.error('Error fetching repos:', error);
		error.message;
	}
}

export { getRepos };
export let repos;
