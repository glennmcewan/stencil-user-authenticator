import { FormService, FormInputCollectionInterface, FormInput } from '../../src/services/FormService';
import { ValidationService } from '../../src/validation/ValidationService';
import { Constraints } from '../../src/validation/Constraints';

describe('FormService', () => {
  const getInputMap: () => FormInputCollectionInterface = (): FormInputCollectionInterface => {
    return {
      'email': new FormInput('email', 'Email', null, Constraints.getEmailConstraints()),
      'password': new FormInput('password', 'Password', null, Constraints.getPasswordConstraints()),
    };
  };

  it('builds', () => {
    expect(new FormService(new ValidationService, getInputMap())).toBeTruthy();
  });

  it('reports the form as invalid initially', () => {
    const service = new FormService(new ValidationService, getInputMap());

    expect(service.getState()).toEqual(undefined);
    expect(service.isFormValid()).toEqual(false);
  });

  it('should get and set input values', () => {
    const service = new FormService(new ValidationService, getInputMap());

    expect(service.getInput('email').value).toEqual(null);

    service.setInputValue('email', 'me@example.org');

    expect(service.getInput('email').value).toEqual('me@example.org');
  });

  it('should pass validation', () => {
    const service = new FormService(new ValidationService, getInputMap());

    service.setInputValue('email', 'me@example.org');
    service.setInputValue('password', 'Password1');

    service.validateForm();

    expect(service.isFormValid()).toEqual(true);
  });

  it('should get status classes for an input', () => {
    const service = new FormService(new ValidationService, getInputMap());

    service.setInputValue('email', 'me@example.org');

    service.validateForm();

    expect(service.getClassesForInput('email')).toEqual('form-control is-valid');
    expect(service.getClassesForInput('password')).toEqual('form-control');
  });

  it('should not consider an input to have no errors if it has not been modified', () => {
    const service = new FormService(new ValidationService, getInputMap());

    service.setInputValue('email', 'me@example.org');

    service.validateForm();

    expect(service.inputHasErrors('email')).toEqual(false);
    expect(service.inputHasErrors('password')).toEqual(false);

    service.setInputValue('password', 'invalid');

    expect(service.inputHasErrors('password')).toEqual(true);
  });
});
