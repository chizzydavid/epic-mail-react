import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../../components/shared/TextInput';
import sinon from 'sinon';

let handleChange= jest.fn();

function shallowSetup() {
  const props = {
    label: "First Name",
    type: "text",
    name: "firstName",
    placeholder: "Enter firstname",
    handleChange,
    error: "First name is required"
  }
  // wrapper instance around rendered output
  const enzymeWrapper = shallow(<TextInput {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Shallow rendered a Text input field', () => {
  it('should render input with passed in props', () => {

    const { enzymeWrapper, props } = shallowSetup();
    expect(enzymeWrapper.find('.label').text()).toBe(props.label);
    expect(enzymeWrapper.find('.error').text()).toBe(props.error);
   });
});