function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
  }
  const x = document.getElementById('hamburgerBtn')
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
  
  // call the function to update the elements
  updateLastModified();
  
  /*-----images-----*/
  const images = document.querySelectorAll("img[data-src]");
  
  const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 50px 0px"
  };
  
  /*-----------lazy load the images:-----------*/
  function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = () => {
        img.removeAttribute('data-src');
      };
    });
  }
  
