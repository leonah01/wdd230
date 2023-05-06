const options = {
  weekdays: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
};

document.getElementById('lastmodified').textContent = new Date().toLocaleDateString('en-US', options)
const currentYear = new Date().getFullYear();
document.getElementById('year').textContent = currentYear;
const currenttime = new TimeRanges().getFullTime;
document.getElementById('time').textContent = currenttime;
  
const header = document.querySelector('header');
const footer = document.querySelector('footer');

header.style.textAlign = 'center';
footer.style.textAlign = 'center';
