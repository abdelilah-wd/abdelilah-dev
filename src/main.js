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
