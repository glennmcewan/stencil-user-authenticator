import { ValidationState } from "../validation/ValidationState";
import { ValidationService } from "../validation/ValidationService";
import { ValidationSubjectInterface } from "../validation/ValidationSubjectInterface";

export class FormService {
  private validator: ValidationService;
  private state: ValidationState;
  private inputs: FormInputsCollectionInterface;

  constructor(validator: ValidationService, inputs: FormInputsCollectionInterface) {
    this.validator = validator;
    this.inputs = inputs;
  }

  validateForm(): ValidationState {
    this.state = this.validator.validateMany(
      Object.keys(this.inputs).map((identifier: string) => {
        return this.inputs[identifier];
      })
    );

    return this.state;
  }

  isFormValid(): boolean {
    if (typeof this.state === 'undefined') {
      return false;
    }

    return this.state.getErrors().length === 0;
  }

  getInput(identifier: string): ValidationSubjectInterface {
    return this.inputs[identifier];
  }

  setInputValue(identifier: string, value: any) {
    this.inputs[identifier].value = value;
  }

  inputHasErrors(identifier: string): boolean {
    if (null === this.getInput(identifier).value) {
      return false;
    }

    return this.state.getErrorsFor(identifier).length > 0;
  }

  getClassesForInput(identifier: string): string {
    let classes = ['form-control'];

    if (null !== this.getInput(identifier).value) {
      let errors = this.state.getErrorsFor(identifier);
      classes.push(errors.length > 0 ? 'is-invalid' : 'is-valid');
    }

    return classes.join(' ');
  }
}

export interface FormInputsCollectionInterface {
  [key: string]: ValidationSubjectInterface
}
