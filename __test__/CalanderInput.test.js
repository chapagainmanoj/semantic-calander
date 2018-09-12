import React, {Component} from 'react';
import {DateInput, TimeInput} from '../src';
import renderer from 'react-test-renderer';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() })
const {shallow, mount} = Enzyme;

it('should render a popup', ()=>{
  const wrapper = shallow(<DateInput />)
  const popup = wrapper.find('Popup');
  expect(popup.length).toEqual(1)
})

it('should render a popup', ()=>{
  const wrapper = shallow(<TimeInput />)
  const popup = wrapper.find('Popup');
  expect(popup.length).toEqual(1)
})
