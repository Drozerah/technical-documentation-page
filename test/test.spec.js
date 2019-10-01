/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// https://mochajs.org/#getting-started

(() => {
  if (window.location.search === '?test=1') {
    require('../node_modules/mocha/mocha.css')
    const assert = require('chai').assert
    // const expect = require('chai').expect
    const { mocha } = require('mocha')
    mocha.setup('bdd') // minimal setup

    // Inject missing <div id="mocha"></div> within the body element
    const div = document.createElement('div')
    div.setAttribute('id', 'mocha')
    div.style.position = 'fixed'
    div.style.bottom = '0px'
    div.style.width = '100%'
    div.style.margin = '0px'
    div.style.background = 'white'
    document.body.appendChild(div)

    // Mocha
    describe('Mocha:', function () {
      it('page should have an element with an id of "mocha"', function () {
        assert.isNotNull(document.getElementById('mocha'), 'There is no element with an id of "mocha"')
        console.warn('Mocha is running ./test/test.spec.js')
      })
    })

    // Testing the page
    describe('Page:', function () {
      /**
      * #1: I can see a main element with a corresponding id="main-doc",
      * which contains the page's main content (technical documentation)
      */
      it('should have a <main> element with a corresponding id="main-doc"', function () {
        assert.isNotNull(document.getElementById('main-doc'), 'There is no element with an id of "main-doc"')
        assert.strictEqual(document.getElementById('main-doc').nodeName, 'MAIN', 'The "main-doc" element should be a <main>')
      })
      describe('<main> element:', function () {
        /**
        * #2: Within the #main-doc element, I can see several section elements,
        * each with a class of main-section. There should be a minimum of 5
        */
        it('should contain several <section> elements, each with a class of "main-section". There sould be a minimum of 5', function () {
          // get all ".main-section" elements within the "#main-doc" element
          const sections = document.querySelectorAll('#main-doc .main-section')

          // get all ".main-section" elements as NodeList
          const t = document.querySelectorAll('.main-section')

          // check if all ".main-section" elements are <section> elements
          // filtering the NodeList elements by nodeName returns an array
          // the length or that array corresponds to the number of elements with the class
          // ".main-section" that are <section> elements
          const r = Array.from(t).filter(elm => {
            return elm.nodeName === 'SECTION'
          })
          assert.isAbove(sections.length, 0, 'There are no .main-section elements within #main-doc')
          assert.isAtLeast(sections.length, 5, 'There are not at least 5 elements with the class of "main-section"')
          assert.strictEqual(document.querySelectorAll('.main-section').length, sections.length, 'All of the page\'s .main-section elements should be within #main-doc')
          assert.strictEqual(r.length, t.length, 'Not all of the elements with the class of "main-section" are <section> elements')
        })
        /**
        * #5: The .main-section elements should contain at least 10 p elements total (not each)
        */
        const pElms = [...document.querySelectorAll('#main-doc .main-section p')].length
        it('should contain at least 10 <p> elements', function () {
          assert.isAbove(pElms, 0, 'there is no <p> element')
          assert.isAtLeast(pElms, 10, 'number of p elements must be at least 10')
        })
        /**
        * #6: The .main-section elements should contain at least 5 code elements total (not each)
        */
        const codeElms = [...document.querySelectorAll('#main-doc .main-section code')].length
        it('should contain at least 5 <code> elements', function () {
          assert.isAbove(codeElms, 0, 'there is no <code> element')
          assert.isAtLeast(codeElms, 5, 'number of <code> elements must be at least 5')
        })
        /**
         * #7: The .main-section elements should contain at least 5 liitems total (not each)
         */
        const liElms = [...document.querySelectorAll('#main-doc .main-section li')].length
        it('should contain at least 5 <li> elements', function () {
          assert.isAbove(liElms, 0, 'there is no <li> element')
          assert.isAtLeast(liElms, 5, 'number of <li> elements must be at least 5')
        })
      })
      describe('<section> elements:', function () {
        /**
        * #3: The first element within each .main-section should be a header element
        * which contains text that describes the topic of that section
        */
        // get all <section class=".main-section"> elements
        const elms = document.querySelectorAll('#main-doc .main-section')
        it('each section element should have a first child', function () {
          // check if all elements have a first child
          const haveFirtChild = [...elms].every((elm) => {
            // as a first child element ?
            return elm.firstElementChild
          })
          assert.isTrue(haveFirtChild, 'each section element have a first child')
        })
        it('each section first child should be a <header>', function () {
          // check if every first child element as a node name of 'HEADER'
          const areHeaders = [...elms].every((elm) => {
            // as a first child element ?
            if (elm.firstElementChild) return elm.firstElementChild.nodeName === 'HEADER'
            return false
          })
          assert.isTrue(areHeaders, 'The first element within each section is a <header>')
        })
        it('each <header> sould have text content', function () {
          // check if each header have text content
          const eachText = [...document.querySelectorAll('#main-doc .main-section > header')].every((text) => {
            return text.textContent.length > 0
          })
          assert.isTrue(eachText, 'each <header> have a text content')
        })
        /**
        * #4: Each section element with the class of main-section should also have an id that
        * corresponds with the text of each header contained within it. Any spaces should be
        * replaced with underscores (e.g. The section that contains the header "Javascript and Java"
        * should have a corresponding id="Javascript_and_Java")
        */
        it('each section element should have an id attribute', function () {
          // check id length for each element
          const haveId = [...elms].every(elm => elm.id.length > 0)
          assert.isTrue(haveId, 'each section element have an id attribute')
        })
        it('each section id attribute should corresponds with the text of its header child element where underscores are replaced with spaces', function () {
          // compare every id and first element child text content
          const areValidId = [...elms].every(elem => elem.id.replace(/_/g, ' ') === elem.firstElementChild.textContent)
          assert.isTrue(areValidId, 'each section element have an id attribute that corresponds with the text of each header contained within it where underscores are replaced with spaces')
        })
      })
    })
    mocha.run()
  }
})()
