import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { SignUp } from '../../pages/SignUp';
import { signUpUser } from '../../store/actions/authActions';

function shallowSetup() {
  const props = {
    auth: {
      isAuthenticated: false,
      isLoading: false,
      user: {},
      errors: {
        error: 'Email already exists',
      },
    },
    signUpUser,
  };
  const enzymeWrapper = shallow(<SignUp {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('SignUp component', () => {
  it('should render SignUp correctly', () => {
    const { enzymeWrapper, props } = shallowSetup();
    expect(enzymeWrapper).toMatchSnapshot();
    expect(enzymeWrapper.find('#form-feedback').text()).toBe(props.auth.errors.error);
  });
});

describe('SignUp component methods', () => {
  beforeEach(() => {
    sinon.spy(SignUp.prototype, 'handleChange');
    sinon.spy(SignUp.prototype, 'handleSubmit');
  });

  afterEach(() => {
    SignUp.prototype.handleChange.restore();
    SignUp.prototype.handleSubmit.restore();
  });

  it('should call handlechange ', () => {
    const { enzymeWrapper } = shallowSetup();

    enzymeWrapper.find('TextInput').first().dive().find('input')
    .simulate('change', {
      target: {
        value: 'Chizzy',
        name: 'firstName',
      },
    });
    expect(enzymeWrapper.state().firstName).toEqual('Chizzy');
    expect(SignUp.prototype.handleChange.calledOnce).toBe(true);
  });

  it('should call handlesubmit', () => {
    const { enzymeWrapper } = shallowSetup();
    enzymeWrapper.setState({
      email: 'davidchizindu@gmail.com',
      password: '11111111',
      validationErrors: {},
    });

    const form = enzymeWrapper.find('#form');
    const mockedEvent = {
      target: {},
      preventDefault: () => ({}),
    };

    form.simulate('submit', mockedEvent);
    expect(SignUp.prototype.handleSubmit.calledOnce).toBe(true);
  });

  it('should handle validation after form is submitted', () => {
    const { enzymeWrapper } = shallowSetup();
    enzymeWrapper.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
    });

    const form = enzymeWrapper.find('#form');
    const mockedEvent = {
      target: {},
      preventDefault: () => ({}),
    };

    form.simulate('submit', mockedEvent);
    expect(SignUp.prototype.handleSubmit.calledOnce).toBe(true);
  });
});
