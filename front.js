 
 
 let navbar = document.querySelector('nav');
 let menuLinks = document.getElementById("menu-links");
 var tablinks = document.getElementsByClassName("tab-links");
 var tabcontents = document.getElementsByClassName("tab-contents");


 const scriptURL = 'https://script.google.com/macros/s/AKfycbw2_5IDy-ERIndeHoW0_pnIfRhd2YADpvu8rQhcjykSjK8g_S-5rG79JByjhmxjI8og3g/exec'
        const form = document.forms['submit-to-google-sheet']
        const msg = document.getElementById("msg")     


        form.addEventListener('submit', e => {
          e.preventDefault()
          fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
              msg.innerHTML = "Message Sent Successfully"
              setTimeout(function(){
                msg.innerHTML = ""
              },5000)
              form.reset()
            })
            .catch(error => console.error('Error!', error.message))
        })





 function opentab(tabname) {
  for(tablink of tablinks){
    tablink.classList.remove("active-link");

  }
  for(tabcontent of tabcontents){
    tabcontent.classList.remove("active-tab");

  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");

 }

 function toogleMenu(){
    menuLinks.classList.toggle('show-menu');
 }


 window.onscroll = function(){
   if(window.scrollY > 0){
       navbar.style.background= '#050017';
   }else{
       navbar.style.background='transparent';
   }
 }

