import { Component, h, State } from "@stencil/core";
import { ValidationService } from "../../validation/ValidationService";
import { ValidationState } from "../../validation/ValidationState";
import { Constraints } from "../../validation/Constraints";

@Component({
  tag: 'registration-form'
})
export class RegistrationForm {
  @State() validationState: ValidationState;

  private validator: ValidationService = new ValidationService();

  private inputMap = {
    name: null,
    email: null,
    password: null,
  };

  validateComponent() {
    const constraints = new Constraints;

    this.validationState = this.validator.validateMany([
      {
        identifier: 'name',
        name: 'Full name',
        value: this.inputMap.name,
        constraints: constraints.getNameConstraints(),
      },
      {
        identifier: 'email',
        name: 'Email',
        value: this.inputMap.email,
        constraints: constraints.getEmailConstraints(),
      },
      {
        identifier: 'password',
        name: 'Password',
        value: this.inputMap.password,
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

    this.inputMap[identifier] = input.value;

    this.validateComponent();
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    console.log(event);
  }

  inputHasErrors(identifier: string) {
    if (null === this.inputMap[identifier]) {
      return false;
    }

    return this.validationState.getErrorsFor(identifier).length > 0;
  }

  getInputClasses(identifier: string): string {
    let classes = ['form-control'];

    if (null !== this.inputMap[identifier]) {
      let errors = this.validationState.getErrorsFor(identifier);
      classes.push(errors.length > 0 ? 'is-invalid' : 'is-valid');
    }

    return classes.join(' ');
  }

  renderErrorsFor(identifier: string) {
    if (null === this.inputMap[identifier]) {
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
      <form onSubmit={event => this.handleSubmit(event)}>
        <div class="form-group">
          <label htmlFor="inputName" class={this.inputHasErrors('name') ? 'text-danger' : ''}>Full Name</label>
          <input type="text" class={this.getInputClasses('name')} id="inputName" placeholder="Full name" value={this.inputMap.name || ''} onInput={(event: KeyboardEvent) => this.handleInputChange(event, 'name')} />
          {this.renderErrorsFor('name')}
        </div>
        <div class="form-group">
          <label htmlFor="inputEmail" class={this.inputHasErrors('email') ? 'text-danger' : ''}>Email</label>
          <input type="email" class={this.getInputClasses('email')} id="inputEmail" placeholder="Email address" value={this.inputMap.email || ''} onInput={(event: KeyboardEvent) => this.handleInputChange(event, 'email')} />
          {this.renderErrorsFor('email')}
        </div>
        <div class="form-group">
          <label htmlFor="inputPassword" class={this.inputHasErrors('password') ? 'text-danger' : ''}>Password</label>
          <input type="password" class={this.getInputClasses('password')} id="inputPassword" placeholder="Password" value={this.inputMap.password || ''} onInput={(event: KeyboardEvent) => this.handleInputChange(event, 'password')} />
          {this.renderErrorsFor('password')}
        </div>
        <button type="submit" class="btn btn-primary" disabled={false === this.isFormValid()}>Register</button>
      </form>
    );
  }
}
