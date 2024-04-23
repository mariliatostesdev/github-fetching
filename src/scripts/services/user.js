import { displaySearchError } from '../error-display.js';
import { getRepos } from './repositories.js';

async function getUserInfo(userName) {
	try {
		const response = await fetch(`https://api.github.com/users/${userName}`);
		const userInfo = await response.json();

		let message = userInfo.message;
		if (message && message.length > 0) {
			displaySearchError(message, userName);
			return;
		} else {
			getRepos(userName, 10, userInfo);
		}
	} catch (error) {
		console.error('Error fetching user info:', error);
		error.message;
	}
}

export { getUserInfo };
export let userInfo;
export let message;
