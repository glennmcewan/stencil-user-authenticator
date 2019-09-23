import { Component, h, State } from "@stencil/core";
import { ValidationService } from "../../validation/ValidationService";
import { ValidationState } from "../../validation/ValidationState";
import { Constraints } from "../../validation/Constraints";
import { FormService, FormInputCollectionInterface, FormInput } from "../../services/FormService";
import { FormTemplatingService } from "../../services/FormTemplatingService";

@Component({
  tag: 'registration-form'
})
export class RegistrationForm {
  @State() validationState: ValidationState;

  private service: FormService;
  private templating: FormTemplatingService;

  componentWillLoad() {
    let inputMap: FormInputCollectionInterface = {
      'name': new FormInput('name', 'Full name', null, Constraints.getNameConstraints()),
      'email': new FormInput('email', 'Email', null, Constraints.getEmailConstraints()),
      'password': new FormInput('password', 'Password', null, Constraints.getPasswordConstraints()),
    };

    this.service = new FormService(
      new ValidationService(),
      inputMap
    );

    this.templating = new FormTemplatingService(this.service);
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

  private validateComponent() {
    this.validationState = this.service.validateForm();
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <div class="form-group">
          <label htmlFor="inputName" class={this.service.inputHasErrors('name') ? 'text-danger' : ''}>Full Name</label>
          <input type="text" class={this.service.getClassesForInput('name')} id="inputName" placeholder="Full name" value={this.service.getInput('name').value} onInput={(event: KeyboardEvent) => this.handleInputChange(event, 'name')} />
          {this.templating.renderErrorsForInput('name')}
        </div>
        <div class="form-group">
          <label htmlFor="inputEmail" class={this.service.inputHasErrors('email') ? 'text-danger' : ''}>Email</label>
          <input type="email" class={this.service.getClassesForInput('email')} id="inputEmail" placeholder="Email address" value={this.service.getInput('email').value} onInput={(event: KeyboardEvent) => this.handleInputChange(event, 'email')} />
          {this.templating.renderErrorsForInput('email')}
        </div>
        <div class="form-group">
          <label htmlFor="inputPassword" class={this.service.inputHasErrors('password') ? 'text-danger' : ''}>Password</label>
          <input type="password" class={this.service.getClassesForInput('password')} id="inputPassword" placeholder="Password" value={this.service.getInput('password').value} onInput={(event: KeyboardEvent) => this.handleInputChange(event, 'password')} />
          {this.templating.renderErrorsForInput('password')}
        </div>
        <button type="submit" class="btn btn-primary" disabled={!this.service.isFormValid()}>Register</button>
      </form>
    );
  }
}
