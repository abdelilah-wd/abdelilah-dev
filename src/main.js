import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { Dropdown, Collapse } from 'bootstrap'
import './style.css'
import './styles/component.css' ;
import './styles/animations.css' ;
import './components/particles.js';
import { animate } from 'animejs';
import { startTyping } from './components/typing_animation.js'

// Initialize when DOM is ready

document.addEventListener('DOMContentLoaded',  () => {
  startTyping();
});
let plang_1 = document.querySelectorAll(".project-lang.p1 img");
let plang_2 = document.querySelectorAll(".project-lang.p2 img");
let plang_3 = document.querySelectorAll(".project-lang.p3 img");
let project_lang_list = [plang_1, plang_2, plang_3];
let index1 = 0;
let index2 = 0;
let index3 = 0;

let interval = setInterval(() => {
  if (index1 == project_lang_list[0].length) index1 = 0;
  if (index2 == project_lang_list[1].length) index2 = 0;
  if (index3 == project_lang_list[2].length) index3 = 0;
  project_lang_list[0].forEach(ele => ele.classList.remove("active"));
  project_lang_list[1].forEach(ele => ele.classList.remove("active"));
  project_lang_list[2].forEach(ele => ele.classList.remove("active"));
  project_lang_list[0][index1].classList.add("active");
  project_lang_list[1][index2].classList.add("active");
  project_lang_list[2][index3].classList.add("active");
  index1++;
  index2++;
  index3++;
}, 2000);

let menuLinks = document.querySelectorAll(".header-section .links li a")
let header_section = document.querySelector(".header-section")
let home_section = document.getElementById("home")
let about_section = document.querySelector(".about-section");
let work_section = document.querySelector(".work-section");
let contact_section = document.querySelector(".contact-section")
let all_sections = [home_section, about_section, work_section, contact_section];
window.addEventListener("scroll", event => {
  all_sections.forEach((ele, index) => {
    console.log(window.scrollY);
    if (window.scrollY > 600) {
      header_section.classList.add("fixing-anim");
      setTimeout(() => {
        header_section.classList.remove("fixing-anim");
        header_section.classList.add("fixed");
      }, 2000);
    } else {
      header_section.classList.remove("fixed");
      header_section.classList.remove("fixing-anim");
    }
    let offsetTop = ele.offsetTop - 20;
    let offsetBottom = ele.offsetTop + ele.offsetHeight;
    if (offsetTop < window.scrollY && offsetBottom > window.scrollY){
      menuLinks.forEach((ele) => ele.classList.remove("active"));
      menuLinks[index].classList.add("active");
    }
  })
})
