window.addEventListener('load', function() {
    
  let hamburgerButton = document.querySelector(".hamburger-button");
  let subheaderLeft = document.querySelector(".subheader-left");
  let cross = this.document.querySelector(".cross");

  hamburgerButton.addEventListener("click", function () {
    
    subheaderLeft.classList.add('subheader-left-click');
    
  })

  cross.addEventListener("click", function () {
    subheaderLeft.classList.remove('subheader-left-click')
  }) 

  
  });