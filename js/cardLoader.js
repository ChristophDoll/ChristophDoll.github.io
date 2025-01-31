// Loads card template and synopses information for all projects and adds them to the page.
addEventListener("load", async (event) => {
		var parent = document.getElementById("projectCards");
		if (!parent) return;
		const [card, synopses] = await Promise.all([
			fetch("/resources/card.html").then(res => res.text()),
			fetch("/resources/synopses.txt").then(res => res.text())
		]);

		var cardsHTML = document.createElement("div"); 
		synopses.trim().split("\n").forEach(synopsis => {
			cardsHTML.appendChild(buildCard(synopsis, card));
		});
		cardsHTML.classList.add('cd-cards');
		parent.outerHTML = cardsHTML.outerHTML;
	});

/**
 * Builds the DOM element of a project card.
 * @param {String} synopsis Contains information of a single project card.
 * @param {String} card HTML template for individual project cards.
 * @returns {Node} Node of a project card.
 */
function buildCard(synopsis, card) {
	const parts = synopsis.split(";");
	if (parts.length < 5) return; 

	const [imgSrc, imgAlt, title, text, link] = parts;

	var cardHTML = document.createElement("div");
	cardHTML.innerHTML = card;
	cardHTML = cardHTML.firstElementChild;

	cardHTML.querySelector('#image').setAttribute('src', imgSrc);
	cardHTML.querySelector('#image').setAttribute('alt', imgAlt);
	cardHTML.querySelector('#image').removeAttribute('id');

	cardHTML.querySelector('#title').innerText = title;
	cardHTML.querySelector('#title').removeAttribute('id');

	cardHTML.querySelector('#text').innerText = text;
	cardHTML.querySelector('#text').removeAttribute('id');

	cardHTML.querySelector('#link').setAttribute('href', '/projects/' + link + '.html');
	cardHTML.querySelector('#link').removeAttribute('id');
	return cardHTML;
}