import { ValidationService } from '../../src/validation/ValidationService';
import { Constraints } from '../../src/validation/Constraints';
import { ValidationState } from '../../src/validation/ValidationState';

describe('FormService', () => {
  it('validate returns validation state', () => {
    const service = new ValidationService();

    const state: ValidationState = service.validate('Potato', Constraints.getNameConstraints());

    expect(state).toBeInstanceOf(ValidationState);
    expect(state.getErrors().length).toEqual(0);
  });

  it('validate many returns validation state', () => {
    const service = new ValidationService();

    const state: ValidationState = service.validateMany([
      {
        identifier: 'name',
        name: 'Name',
        value: 'Jeff',
        constraints: Constraints.getNameConstraints()
      }
    ])

    expect(state).toBeInstanceOf(ValidationState);
    expect(state.getErrors().length).toEqual(0);
  });

  it('validate returns validation state with errors', () => {
    const service = new ValidationService();

    const state: ValidationState = service.validate('', Constraints.getNameConstraints());

    expect(state).toBeInstanceOf(ValidationState);
    expect(state.getErrors().length).toEqual(1);
  });

  it('validate many returns validation state with errors', () => {
    const service = new ValidationService();

    const state: ValidationState = service.validateMany([
      {
        identifier: 'name',
        name: 'Name',
        value: '',
        constraints: Constraints.getNameConstraints()
      }
    ])

    expect(state).toBeInstanceOf(ValidationState);
    expect(state.getErrors().length).toEqual(1);
  });
});
