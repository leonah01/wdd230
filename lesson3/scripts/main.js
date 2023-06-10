function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("open");
  document.getElementById("majorButton").classList.toggle("open");
}
const x = document.getElementById("majorButton")
x.onclick = toggleMenu;

const options = {
  weekdays: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
};

document.getElementById('lastmodified').textContent = new Date().toLocaleDateString('en-US', options)
const currentYear = new Date().getFullYear();
document.getElementById('year').textContent = currentYear;