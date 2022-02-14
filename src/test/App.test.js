import React from 'react'
import App from '../App'
import { shallow } from 'enzyme'
import { expect } from 'chai'

const wrapper = shallow(<App />)

it('Renders without crashing', () => {
  shallow(<App />)
})

it('Header present', () => {
  expect(wrapper.find('header')).to.have.lengthOf(1)
})

it('Icon present', () => {
  expect(wrapper.find('img').prop('src')).to.equal('logo.png')
})

it('Breadcrumb present', () => {
  expect(wrapper.find('.breadcrumb')).to.have.lengthOf(1)
})

it('Nav present', () => {
  expect(wrapper.find('nav')).to.have.lengthOf(1)
})

it('Main present', () => {
  expect(wrapper.find('main')).to.have.lengthOf(1)
})

it('Footer present', () => {
  expect(wrapper.find('footer')).to.have.lengthOf(1)
})

it('Lorem ipsum present', () => {
  expect(wrapper.text()).contains('Lorem ipsum')
})
