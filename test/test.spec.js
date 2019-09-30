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
      it('should have a <main> element with a corresponding id="main-doc"', function () {
        assert.isNotNull(document.getElementById('main-doc'), 'There is no element with an id of "main-doc"')
        assert.strictEqual(document.getElementById('main-doc').nodeName, 'MAIN', 'The "main-doc" element should be a <main>')
      })
      describe('<main> element:', function () {
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
      })
      describe('<section class=".main-section"> elements:', function () {
        // get all <section class=".main-section"> elements
        const elms = document.querySelectorAll('#main-doc .main-section')
        it('each .main-section element should have a first child', function () {
          // check if all elements have a first child
          const asFirtChild = [...elms].every((elm) => {
            // as a first child element ?
            return elm.firstElementChild
          })
          assert.isTrue(asFirtChild, 'each .main-section element as a first child')
        })
        it('each .main-section childs should be a <header>', function () {
          // check if every first child element as a node name of 'HEADER'
          const areHeaders = [...elms].every((elm) => {
            // as a first child element ?
            if (elm.firstElementChild) return elm.firstElementChild.nodeName === 'HEADER'
            return false
          })
          assert.isTrue(areHeaders, 'The first element within each .main-section is a <header>')
        })
        it('each <header> sould have text content', function () {
          // check if each hearder has text content
          const eachText = [...document.querySelectorAll('#main-doc .main-section > header')].every((text) => {
            return text.textContent.length > 0
          })
          assert.isTrue(eachText, 'each <header> has text content')
        })
      })
    })
    mocha.run()
  }
})()
