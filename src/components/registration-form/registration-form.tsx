import { Component, h, State } from "@stencil/core";
import { ValidationService } from "../../validation/ValidationService";
import { ValidationState } from "../../validation/ValidationState";
import { Constraints } from "../../validation/Constraints";

@Component({
  tag: 'registration-form'
})
export class RegistrationForm {
  @State() validationState: ValidationState;

  private inputName: string;
  private inputEmail: string;
  private inputPassword: string;

  private validator: ValidationService = new ValidationService();

  validateComponent() {
    const constraints = new Constraints;

    this.validationState = this.validator.validateMany([
      {
        identifier: 'inputName',
        name: 'Full name',
        value: this.inputName,
        constraints: constraints.getNameConstraints(),
      },
      {
        identifier: 'inputEmail',
        name: 'Email',
        value: this.inputEmail,
        constraints: constraints.getEmailConstraints(),
      },
      {
        identifier: 'inputPassword',
        name: 'Password',
        value: this.inputPassword,
        constraints: constraints.getPasswordConstraints(),
      }
    ]);
  }

  isFormValid() {
    if (typeof this.validationState === 'undefined') {
      return false;
    }

    return this.validationState.getErrors().length === 0;
  }

  handleInputChange(event: KeyboardEvent, identifier: string) {
    const input = event.target as HTMLInputElement;

    this[identifier] = input.value;

    this.validateComponent();
  }

  inputHasErrors(identifier: string) {
    if (typeof this[identifier] === 'undefined') {
      return false;
    }

    return this.validationState.getErrorsFor(identifier).length > 0;
  }

  getInputClasses(identifier: string): string {
    let classes = ['form-control'];

    if (typeof this[identifier] !== 'undefined') {
      let errors = this.validationState.getErrorsFor(identifier);
      classes.push(errors.length > 0 ? 'is-invalid' : 'is-valid');
    }

    return classes.join(' ');
  }

  renderErrorsFor(identifier: string) {
    if (typeof this[identifier] === 'undefined') {
      return;
    }

    return (
      <ul>
        {this.validationState.getErrorsFor(identifier).map(error => {
          return <li>{error.message}</li>;
        })}
      </ul>
    );
  }

  render() {
    return (
      <form>
        <div class="form-group">
          <label htmlFor="inputName" class={this.inputHasErrors('inputName') ? 'text-danger' : ''}>Full Name</label>
          <input type="text" class={this.getInputClasses('inputName')} id="inputName" placeholder="Full name" value={this.inputName || ''} onInput={(event: KeyboardEvent) => this.handleInputChange(event, 'inputName')} />
          {this.renderErrorsFor('inputName')}
        </div>
        <div class="form-group">
          <label htmlFor="inputEmail" class={this.inputHasErrors('inputEmail') ? 'text-danger' : ''}>Email</label>
          <input type="email" class={this.getInputClasses('inputEmail')} id="inputEmail" placeholder="Email address" value={this.inputEmail || ''} onInput={(event: KeyboardEvent) => this.handleInputChange(event, 'inputEmail')} />
          {this.renderErrorsFor('inputEmail')}
        </div>
        <div class="form-group">
          <label htmlFor="inputPassword" class={this.inputHasErrors('inputPassword') ? 'text-danger' : ''}>Password</label>
          <input type="password" class={this.getInputClasses('inputPassword')} id="inputPassword" placeholder="Password" value={this.inputPassword || ''} onInput={(event: KeyboardEvent) => this.handleInputChange(event, 'inputPassword')} />
          {this.renderErrorsFor('inputPassword')}
        </div>
        <button type="submit" class="btn btn-primary" disabled={false === this.isFormValid()}>Register</button>
      </form>
    );
  }
}
