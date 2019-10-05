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
  /**
  * add conditionnaly FFC test script to page with search parameter
  * @{url} http://localhost:8080/?ffc_test=1
  */
  if (window.location.search === '?ffc_test=1') {
    const scriptTag = document.createElement('script')
    scriptTag.src = 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js'
    document.head.appendChild(scriptTag)
  }
  /**
  * forEach method polyfill for IE11
  * @{link} https://gist.github.com/bob-lee/e7520bfcdac266e5490f40c2759cc955
  */
  if ('NodeList' in window && !NodeList.prototype.forEach) {
    // console.info('polyfill for IE11')
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this)
      }
    }
  }

  // init highlight.js
  document.querySelectorAll('code').forEach(block => hljs.highlightBlock(block))

  // DOM elements references
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

  /** Get the offset of a given object from the top its parent element
   *
   * @param  {object} elem the given element
   */
  const getElemOffset = (elem) => {
    return elem.getBoundingClientRect().top - elem.offsetParent.getBoundingClientRect().top
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
        scrollTargetToTop(mainDocElem, contentToScroll)
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
    /**
    * working with CSS attributes
    */
    // remove class attribute if allready set
    if (document.querySelector('.active')) {
      document.querySelector('.active').removeClass('active')
    }
    // add class attribute to clicked element
    e.target.addClass('active')

    /**
    * working with smooth scrolling enhancement
    */
    // check browser compatibility for scrollIntoView method
    if (document.documentElement.scrollIntoView) {
      // prevent scroll to anchor element (default browser scroll behavour)
      e.preventDefault()
      // get the targeted anchor element
      const anchorElem = document.getElementById(e.target.hash.replace(/#/g, ''))
      // add smooth scroll to target
      // try option
      try {
        anchorElem.scrollIntoView({
          behavior: 'smooth'
        })
      } catch (error) {
        // fallback to prevent browser crashing
        anchorElem.scrollIntoView(true)
      }
      // listen scroll on #main-doc
      mainDocElem.addEventListener('scroll', function scroll (event) {
        // remove this scroll listener when anchorElem is scrolled to top
        if (getElemOffset(anchorElem) <= 0) {
          event.target.removeEventListener('scroll', scroll)
          // update location hash into URL
          window.location.hash = e.target.hash
        }
      })
    }
  })
})
