/**
 * STYLES
 */
import './main.scss'
import '../node_modules/highlight.js/styles/github-gist.css'
// import '../node_modules/highlight.js/styles/github.css'
// import '../node_modules/highlight.js/styles/xcode.css'
// import '../node_modules/highlight.js/styles/monokai.css'
// import '../node_modules/highlight.js/styles/atelier-lakeside-dark.css'
import '../node_modules/highlight.js/styles/paraiso-light.css'
/**
 * MODULES
 */
// import { run } from './app/run.service'
/**
* NPM package
*/
import hljs from 'highlight.js'
// run()

document.addEventListener('DOMContentLoaded', (event) => {
  // init highlight.js
  document.querySelectorAll('code').forEach(block => hljs.highlightBlock(block))

  // DOM elements refernces
  // get #main-doc element
  const mainDocElem = document.getElementById('main-doc')
  // get all nav links elements
  const navLinks = document.getElementsByClassName('nav-link')
  // get nav links wrapper element
  const navLinksWrapper = document.getElementById('nav-links')

  /**
   * Inplement methods by prototype to HTML AnchorElement (link)
   * Add and remove className attributes
   */
  HTMLAnchorElement.prototype.addClass = function (className) {
    this.classList.add(className)
  }
  HTMLAnchorElement.prototype.removeClass = function (className) {
    this.classList.remove(className)
  }

  /**
   * Scroll vertically the content of a targeted element to the top of a given element
   *
   * @param  {object} elem the given element
   * @param  {object} target the content to be scrolled
   */
  const scrollTargetToTop = (elem, target) => {
    setTimeout(() => {
      elem.scrollTop = target.offsetTop
    }, 0)
  }

  /**
   * Add or Remove CSS class attribute with the name on '.active' on '.nav-links' elements
   * according to URL hash
   */
  const addClassActive = (links) => {
    // get current location hash
    const locationHash = window.location.hash
    // check if the href content of a '.nav-link' is equal to the hash contained into the URL
    links = [...links].forEach(link => {
      if (locationHash === link.hash) {
        // add a class with the name of 'active' to the corresponding link
        link.addClass('active')
        // define the element/content to be scrolled to top
        const contentToScroll = document.getElementById(link.hash.replace(/#/g, ''))
        // scroll the content to top
        return scrollTargetToTop(mainDocElem, contentToScroll)
      } else {
        // remove class with the name of 'active' to the corresponding link
        link.removeClass('active')
      }
    })
  }

  // check if URL contain a hash
  if (window.location.hash) {
    addClassActive(navLinks)
  }

  /**
   * add '.active' class name when a link is clicked
   */
  navLinksWrapper.addEventListener('click', (e) => {
    // remove class attribute if allready set
    document.querySelector('.active').removeClass('active')
    // add class attribute to clicked element
    e.target.addClass('active')
  })
})
