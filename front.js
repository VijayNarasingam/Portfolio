 
 
 let navbar = document.querySelector('nav');
 let menuLinks = document.getElementById("menu-links");
 var tablinks = document.getElementsByClassName("tab-links");
 var tabcontents = document.getElementsByClassName("tab-contents");




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

