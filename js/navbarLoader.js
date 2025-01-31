// Loads synopses information for all projects and adds them to dropdown of the navbar.
addEventListener("load", async (event) => {
	var parent = document.getElementById("projectLinks")
	if (!parent) return;
	const synopses = await fetch("/resources/synopses.txt").then(res => res.text());

	synopses.trim().split("\n").forEach(synopsis => {
		parent.appendChild(buildLink(synopsis));
	});
});

/**
 * Builds the DOM elements of a dropdown element.
 * @param {String} synopsis Contains information of a single project.
 * @returns {Node} Node of a dropdown project link.
 */
function buildLink(synopsis) {
	const parts = synopsis.split(";");
	if (parts.length < 5) return; 

	const [imgSrc, imgAlt, title, text, link] = parts;

	var listElem = document.createElement('li');
	var projectLink = document.createElement('a');
	projectLink.classList.add('dropdown-item');
	projectLink.setAttribute('href', '/projects/' + link + '.html')
	projectLink.innerText = title;
	listElem.appendChild(projectLink);
	return listElem;
}