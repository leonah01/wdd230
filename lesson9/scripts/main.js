// Declare a variable named url that contains the URL string of the JSON resource provided
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

// Declare an asynchronous function named getProphetData that fetches data from the json source url
async function getProphetData() {
  // Send a GET request to the specified url using fetch() method and wait for the response
  const response = await fetch(url);
  
  // Parse the response body as JSON data using json() method and wait for it
  const data = await response.json();
  
  // Call the displayProphets function with the prophets array from the parsed JSON data
  //console.table(data.prophets);
  displayProphets(data.prophets)
}

// Call the getProphetData function to start fetching and displaying the prophet data
getProphetData();

// Declare a function named displayProphets that creates and appends HTML elements for each prophet record
function displayProphets(prophets) {
  // Select the output container element using the class attribute value
  const cards = document.querySelector('div.cards');
  
    // Iterate over each prophet record in the prophets array using forEach method
  prophets.forEach((prophet) => {
    // Create elements to add to the div.cards element
    let card = document.createElement('section'); // create a section element for the card
    let h2 = document.createElement('h2'); // create a h2 element for the name
    let portrait = document.createElement('img'); // create an img element for the portrait

    // Build the h2 content to show the prophet's full name
    h2.textContent = `${prophet.name} ${prophet.lastname}`;

    // Build the image portrait by setting all the relevant attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Create and append paragraph elements for the birth date and birth place
    let birthDate = document.createElement('p');
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;


    let birthPlace = document.createElement('p');
    birthPlace.textContent = `Place of birth: ${prophet.birthplace}`;

    let numofchildren = document.createElement('p');
    numofchildren.textContent = `Number of Children: ${prophet.numofchildren}`;

    let death = document.createElement('p');
    death.textContent = `Date of Death: ${prophet.death}`;

    // Append the section(card) with the created elements
    card.appendChild(h2);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(numofchildren)
    card.appendChild(death);
    card.appendChild(portrait);
    cards.appendChild(card);
    });
}