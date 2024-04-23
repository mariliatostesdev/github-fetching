import { mainContentDiv } from './variables.js';

async function displayEmptySearchMessage() {
	mainContentDiv.innerHTML = `<p>Por favor, insira um nome de usuário para pesquisa.</p>`;
}

async function displaySearchError(message, userName) {
	if (message === "Not Found") {
		mainContentDiv.innerHTML = `<p>Usuário '${userName}' não encontrado.</p>`;
	} else {
		mainContentDiv.innerHTML = `<p>Acesso negado.</p>`;
	}
}

export { displayEmptySearchMessage, displaySearchError };
