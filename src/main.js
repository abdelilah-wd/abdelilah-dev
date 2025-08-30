import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { Dropdown, Collapse } from 'bootstrap'
import './style.css'
import './styles/component.css'
import './styles/animations.css'
import './components/particles.js'
import { startTyping } from './components/typing_animation.js'

// Initialize when DOM is ready

document.addEventListener('DOMContentLoaded', function () {
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
