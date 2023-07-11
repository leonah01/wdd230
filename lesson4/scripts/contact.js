fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const companies = data.companies;

    const sections = document.querySelectorAll('.spotlight section');

    companies.forEach((company, index) => {
      const section = sections[index];

      section.querySelector('h3').textContent = company.name;
      section.querySelectorAll('p')[0].textContent = company.address;
      section.querySelectorAll('p')[1].textContent = 'Phone: ' + company.phone;
      section.querySelectorAll('p')[2].innerHTML = '<a href="' + company.website + '">Website</a>';
      section.querySelector('img').src = company.image;
      section.querySelector('img').alt = company.name;
      section.querySelectorAll('p')[3].textContent = 'Membership Level: ' + company.membershipLevel;
      section.querySelectorAll('p')[4].textContent = company.otherInfo;
    });
  })
  .catch(error => {
    console.log('Error:', error);
  });