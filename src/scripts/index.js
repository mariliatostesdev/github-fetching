import { inputSearch, btnSearch, mainContentDiv } from './variables.js';
import { displayEmptySearchMessage } from './error-display.js';
import { getUserInfo } from './services/user.js';

btnSearch.addEventListener('click', handleSearch);

async function handleSearch() {
	const userName = inputSearch.value.trim();

	mainContentDiv.classList.add('showDiv');

	if (userName.length === 0) {
		displayEmptySearchMessage();
	} else {
		getUserInfo(userName);
	}
}

export { handleSearch };
export let userName;
