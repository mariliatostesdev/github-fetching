async function renderOnPage(
	userInfo,
	repos,
	filteredEvents
) {
	let reposListHtml = renderRepos(repos);
	let eventsListHtml = renderEvents(filteredEvents);
	renderUserInfo(userInfo, reposListHtml, eventsListHtml);
}

function renderRepos(repos) {
	let reposList = '';

	if (repos && repos.length > 0) {
		repos.forEach((repo) => {
			let languageIcon = '';

			let mainLanguage = repo.language;
			let mainLanguageUrl = '';

			if (mainLanguage === null) {
				mainLanguage = '';
			} else if (typeof mainLanguage === 'string') {
				switch (mainLanguage.toLowerCase()) {
					case 'html':
						mainLanguageUrl = 'html5';
						break;
					case 'css':
						mainLanguageUrl = 'css3';
						break;
					case 'c#':
						mainLanguageUrl = 'csharp';
						break;
					default:
						mainLanguageUrl = mainLanguage.toLowerCase();
						break;
				}
				languageIcon = `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${mainLanguageUrl}/${mainLanguageUrl}-original.svg" />`;
			}

			reposList += `
			<li>
				<a href="${repo.html_url}" target="_blank">
					<p>${repo.name}</p>
					<br>
					<div class="repo-metrics">
						<p id="forks">${repo.forks_count}</p>
						<p id="stars">${repo.stargazers_count}</p>
						<p id="watchers">${repo.watchers_count}</p>
						<p id="language">${languageIcon} ${mainLanguage}</p>
					</div>
				</a>
			</li>`;
		});
	} else {
		reposList = `<p>Nenhum repositório encontrado.</p>`;
	}

	return reposList;
}

function renderEvents(userEvents) {
	let eventsList = '';

	if (userEvents && userEvents.length > 0) {
		userEvents.forEach((event) => {
			let commitURL = `https://github.com/${event.repo.name}/commit/${event.payload.head}`;
			if (event.type === 'PushEvent' || event.type === 'CreateEvent') {
				if (
					event.payload &&
					event.payload.commits &&
					event.payload.commits.length > 0
				) {
					eventsList += `<li>
						<a href="${commitURL}" target="_blank">
							<strong>${event.repo.name}</strong> - ${event.payload.commits[0].message}
						</a>
					</li>`;
				} else {
					eventsList += `<p>Nenhum commit encontrado para este evento</p>`;
				}
			} else {
				eventsList += `<p>Nenhum 'PushEvent' ou 'CreateEvent' encontrado</p>`;
			}
		});
	} else {
		eventsList = `<p>Nenhum evento encontrado.</p>`;
	}

	return eventsList;
}

function renderUserInfo(userInfo, reposListHtml, eventsListHtml) {
	const userDataTemplate = `
	<div class="info">
		<img src="${userInfo.avatar_url} alt=" Foto de perfil do usuário" />
		<div class="data">
			<div class="personal-info">
				<h1 class="name">
					${userInfo.name ?? 'Não possui nome cadastrado 🙁'}
				</h1>
				<p class="bio">
					${userInfo.bio ?? 'Não possui bio cadastrada 🙁'}
				</p>
				<div class="social">
					<p class="following">
						<strong>Seguindo:</strong> ${
							userInfo.following ?? 'Não segue outros usuários 🙁'
						}
					</p>
					<p class="followers">
					<strong>Seguidores:</strong> ${userInfo.followers ?? 'Não possui seguidores 🙁'}
					</p>
				</div>
			</div>
		</div>
			<div class="lists">
				<div class=" repositories">
					<h2>Repositórios Recentes</h2>
					<ul> ${reposListHtml} </ul>
				</div>
				<div class="events">
					<h2>Eventos e Commits</h2>
					<ul> ${eventsListHtml} </ul>
				</div>
			</div>
		</div>
	</div>`;
	mainContentDiv.innerHTML = userDataTemplate;
}

export { renderRepos, renderEvents, renderUserInfo, renderOnPage };
export let reposList;
export let eventsList;
