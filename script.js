
let navbar = document.querySelector('nav');
let menuLinks = document.getElementById("menu-links");
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");



// rotate circle
const text = document.querySelector('.text ul');
text.innerHTML = text.innerText.split('').map(
    (char,i)=>
        `<span style= "transform:rotate(${i * 9.9}deg)">${char}</span>`
).join('');

// skill and education swap
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
// mobile size menu bar
function toogleMenu(){
   menuLinks.classList.toggle('show-menu');
}



