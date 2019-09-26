/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// https://mochajs.org/#getting-started

(() => {
  if (window.location.search === '?test=1') {
    require('../node_modules/mocha/mocha.css')
    const assert = require('chai').assert
    const expect = require('chai').expect
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

    console.warn('Mocha is running ./test/test.spec.js')

    describe('Page:', () => {
      it('should have 1 element with an id of "mocha"', () => {
        assert.isNotNull(document.getElementById('mocha'), 'There is no element with an id of "mocha"')
      })
    })
    mocha.run()
  }
})()
