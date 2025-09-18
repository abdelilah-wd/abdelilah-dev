import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './style.css'
import './styles/component.css' ;
import './styles/animations.css' ;
import './components/particles.js';
import { startTyping } from './components/typing_animation.js'
emailjs.init('m44VsGGpNL77DBF17');

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
    if (window.scrollY > 400) {
      header_section.classList.add("fixed");
    } else {
      header_section.classList.remove("fixed");
    }
    let offsetTop = ele.offsetTop - 200;
    let offsetBottom = ele.offsetTop + ele.offsetHeight;
    if (offsetTop < window.scrollY && offsetBottom > window.scrollY){
      menuLinks.forEach((ele) => ele.classList.remove("active"));
      menuLinks[index].classList.add("active");
    }
  })
})

let contact_form_inputs = document.querySelectorAll(".contact-form div .client-input");

contact_form_inputs.forEach(ele => {
  console.log(ele);
  let ele_label = document.querySelector(".contact-form div> label[for=\"" + ele.getAttribute("id") + "\"]");
  ele.addEventListener("blur", event => {
    console.log(ele.value);
    console.log(ele_label);
    if (ele.value) {
      ele_label.classList.add("active");
    } else {
      ele_label.classList.remove("active");
    }
  })
})

let send_email = document.querySelector(".send-email");
document.querySelector(".contact-form .form").addEventListener("submit", event => {
  console.log("hello world\n");
  event.preventDefault();
  emailjs.sendForm('service_vtmwzob', 'template_mz6d1go', '#contact-form')
    .then(function() {
      alert('Message sent successfully!');
    }, function(error) {
      alert('Failed to send message: ' + error.text);
    });
})


let footerTime = document.querySelector(".footer-section .time");
footerTime.innerHTML = ((new Date).getFullYear() == 2025 ? "" : "2025 - ") +(new Date).getFullYear();
