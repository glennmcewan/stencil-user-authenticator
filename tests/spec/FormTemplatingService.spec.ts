import { FormInputCollectionInterface, FormInput, FormTemplatingService, FormService } from '../../src/services/Form';
import { Constraints, ValidationService } from '../../src/services/Validation';

describe('FormService', () => {
    const getInputMap: () => FormInputCollectionInterface = (): FormInputCollectionInterface => {
        return {
          'email': new FormInput('email', 'Email', null, Constraints.getEmailConstraints()),
          'password': new FormInput('password', 'Password', null, Constraints.getPasswordConstraints()),
        };
      };

  it('builds', () => {
    expect(new FormTemplatingService(new FormService(new ValidationService, getInputMap()))).toBeTruthy();
  });

  it('renders nothing if input is not in the form', () => {
    const service: FormTemplatingService = new FormTemplatingService(new FormService(new ValidationService, getInputMap()));

    expect(service.renderErrorsForInput('waffle')).toEqual(null);
  });

  it('renders nothing if input has not been modified yet', () => {
    const service: FormTemplatingService = new FormTemplatingService(new FormService(new ValidationService, getInputMap()));

    expect(service.renderErrorsForInput('email')).toEqual(null);
  });

  it('renders an error if one input is invalid', async () => {
    const formService: FormService = new FormService(new ValidationService, getInputMap());
    const templatingService: FormTemplatingService = new FormTemplatingService(formService);

    formService.setInputValue('email', 'invalid');
    formService.validateForm();

    expect(templatingService.renderErrorsForInput('email')).toBeInstanceOf(Object);
  });
});
