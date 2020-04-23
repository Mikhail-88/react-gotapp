import React from 'react';
import RandomChar from './randomChar';
import { shallow } from 'enzyme';

describe('Testing <RandomChar/>', () => {
  const charComponent = shallow(<RandomChar />);

  describe('Testing snap and state', () => {
    it('RandomChar have rendered correctly', () => {
      expect(charComponent).toMatchSnapshot();
    });

    it('RandomChar state "character" is empty object', () => {
      expect(charComponent.state().character).toBeObject();
    });

    it('RandomChar state "isLoading" is true', () => {
      expect(charComponent.state().isLoading).toBeTruthy();
    });

    it('RandomChar state "error" is false', () => {
      expect(charComponent.state().error).toBeFalsy();
    });
  });

  describe('Handlers tests', () => {
    it('testing onCharacterLoaded', () => {
      charComponent.instance().onCharacterLoaded();
      expect(charComponent.state().isLoading).toBeFalsy();
    });

    it('testing onError', () => {
      charComponent.instance().onError();
      expect(charComponent.state().error).toBeTruthy();
      expect(charComponent.state().isLoading).toBeFalsy();
    });

    it('testing updateCharacter', () => {
      charComponent.instance().updateCharacter();
      expect(charComponent.state().isLoading).toBeFalsy();
    });
  });
});