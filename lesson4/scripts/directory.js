fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const companies = data.companies;
    const businessCards = document.querySelector('.businessCards');

    // Loop through the company data and populate the sections
    companies.forEach((company, index) => {
      const section = businessCards.children[index];
      section.innerHTML = `
        <h2>${company.name}</h2>
        <p>Address: ${company.address}</p>
        <p>Phone: ${company.phone}</p>
        <p>Website: <a href="${company.website}" target="_blank">${company.website}</a></p>
        <img src="${company.image}" alt="${company.name}" />
        <p>Membership Level: ${company.membershipLevel}</p>
        <p>${company.otherInfo}</p>
      `;
    });
  })
  .catch(error => {
    console.log('Error:', error);
  });

// Add the "directory-grid" class to "directory-main" element on load
document.getElementById("directory-main").classList.add("directory-grid");

function toggleLayout() {
  const directoryMain = document.getElementById("directory-main");
  const gridButton = document.getElementById("grid");
  const listButton = document.getElementById("list");

  if (directoryMain.classList.contains("directory-list")) {
    // Switch to grid layout
    directoryMain.classList.remove("directory-list");
    directoryMain.classList.add("directory-grid");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
  } else {
    // Switch to list layout
    directoryMain.classList.remove("directory-grid");
    directoryMain.classList.add("directory-list");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
  }
}

// Event listeners for grid and list buttons
document.getElementById("grid").addEventListener("click", toggleLayout);
document.getElementById("list").addEventListener("click", toggleLayout);