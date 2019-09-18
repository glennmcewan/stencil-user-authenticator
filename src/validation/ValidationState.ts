import { ValidationErrorInterface } from "./ValidationErrorInterface";

export class ValidationState {
  protected errors: ValidationErrorInterface[];

  constructor(errors: ValidationErrorInterface[]) {
    this.errors = errors;
  }

  getErrors(): ValidationErrorInterface[] {
    return this.errors;
  }

  getErrorsFor(identifier: string) {
    return this.errors.filter((error: ValidationErrorInterface) => error.identifier === identifier);
  }

  isValid(): boolean {
    return this.errors.length > 0;
  }
}
