import { Component, h, State } from "@stencil/core";
import { ValidationService } from "../../validation/ValidationService";
import { ValidationState } from "../../validation/ValidationState";
import { Constraints } from "../../validation/Constraints";
import { FormService, FormInputsCollectionInterface } from "../../services/FormService";

@Component({
  tag: 'registration-form'
})
export class RegistrationForm {
  @State() validationState: ValidationState;

  private service: FormService;

  componentWillLoad() {
    let inputMap: FormInputsCollectionInterface = {
      'name': {
        identifier: 'name',
        name: 'Full name',
        value: null,
        constraints: Constraints.getNameConstraints(),
      },
      'email': {
        identifier: 'email',
        name: 'Email',
        value: null,
        constraints: Constraints.getEmailConstraints(),
      },
      'password': {
        identifier: 'password',
        name: 'Password',
        value: null,
        constraints: Constraints.getPasswordConstraints(),
      }
    };

    this.service = new FormService(
      new ValidationService(),
      inputMap
    );
  }

  validateComponent() {
    this.validationState = this.service.validateForm();
  }

  isFormValid() {
    return this.service.isFormValid();
  }

  handleInputChange(event: KeyboardEvent, identifier: string) {
    const input = event.target as HTMLInputElement;

    this.service.setInputValue(identifier, input.value);

    this.validateComponent();
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    console.log(event);
  }

  renderErrorsFor(identifier: string) {
    if (null === this.service.getInput(identifier).value) {
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
          <label htmlFor="inputName" class={this.service.inputHasErrors('name') ? 'text-danger' : ''}>Full Name</label>
          <input type="text" class={this.service.getClassesForInput('name')} id="inputName" placeholder="Full name" value={this.service.getInput('name').value} onInput={(event: KeyboardEvent) => this.handleInputChange(event, 'name')} />
          {this.renderErrorsFor('name')}
        </div>
        <div class="form-group">
          <label htmlFor="inputEmail" class={this.service.inputHasErrors('email') ? 'text-danger' : ''}>Email</label>
          <input type="email" class={this.service.getClassesForInput('email')} id="inputEmail" placeholder="Email address" value={this.service.getInput('email').value} onInput={(event: KeyboardEvent) => this.handleInputChange(event, 'email')} />
          {this.renderErrorsFor('email')}
        </div>
        <div class="form-group">
          <label htmlFor="inputPassword" class={this.service.inputHasErrors('password') ? 'text-danger' : ''}>Password</label>
          <input type="password" class={this.service.getClassesForInput('password')} id="inputPassword" placeholder="Password" value={this.service.getInput('password').value} onInput={(event: KeyboardEvent) => this.handleInputChange(event, 'password')} />
          {this.renderErrorsFor('password')}
        </div>
        <button type="submit" class="btn btn-primary" disabled={false === this.isFormValid()}>Register</button>
      </form>
    );
  }
}
