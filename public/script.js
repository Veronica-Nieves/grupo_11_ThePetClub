window.addEventListener('load', function() {

    let hamburger = this.document.querySelector('hamburger-button') 

    hamburger.addEventListener('click',function(e){
        alert('Hiciste click')
        e.preventDefault();
    })
  
  });