document.addEventListener("DOMContentLoaded", async () => {
	const contentDiv = document.getElementById("content");
	const apiKey = "xem3ovPgeh9zWrw3fOyY4tTldhimR3ckKqnk9UoC";
	const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

	try {
	  const response = await fetch(url);
	  if (!response.ok) {
		throw new Error("Network response was not ok");
	  }

	  const data = await response.json();
	  contentDiv.innerHTML = `
		<img src="${data.url}" alt="${data.title}" />
		<p class="title">${data.title}</p>
		<p class="description">${data.explanation}</p>
	  `;
	} catch (error) {
	  contentDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
	}
});
