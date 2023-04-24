function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
  
    document.getElementById('time').innerHTML = 'last updated on:'  +  now 
  }
  
  setInterval(updateTime, 2000);
  
const header = document.querySelector('header');
const footer = document.querySelector('footer');

header.style.textAlign = 'center';
footer.style.textAlign = 'center';
