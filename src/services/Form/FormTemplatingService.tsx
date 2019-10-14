import { h } from '@stencil/core';
import { FormService } from './FormService';
import { ValidationSubjectInterface, ValidationErrorInterface } from '../Validation';

export class FormTemplatingService {
  private service: FormService;

  constructor(service: FormService) {
    this.service = service;
  }

  renderErrorsForInput(identifier: string) {
    const input: ValidationSubjectInterface = this.service.getInput(identifier);

    if (!input || null === input.value) {
      return null;
    }

    return (
      <ul>
        {this.service.getState().getErrorsFor(identifier).map((error: ValidationErrorInterface) => {
          return <li>{error.message}</li>;
        })}
      </ul>
    );
  }
}
