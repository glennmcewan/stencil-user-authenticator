import { r as registerInstance, h } from './core-9c0e5c55.js';
import { F as FormInput, C as Constraints, a as FormService, V as ValidationService, b as FormTemplatingService } from './index-8eb11fa8.js';

const RegistrationForm = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentWillLoad() {
        let inputMap = {
            'name': new FormInput('name', 'Full name', null, Constraints.getNameConstraints()),
            'email': new FormInput('email', 'Email', null, Constraints.getEmailConstraints()),
            'password': new FormInput('password', 'Password', null, Constraints.getPasswordConstraints()),
        };
        this.service = new FormService(new ValidationService(), inputMap);
        this.templating = new FormTemplatingService(this.service);
    }
    handleInputChange(event, identifier) {
        const input = event.target;
        this.service.setInputValue(identifier, input.value);
        this.validateComponent();
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(event);
    }
    validateComponent() {
        this.validationState = this.service.validateForm();
    }
    render() {
        return (h("form", { onSubmit: event => this.handleSubmit(event) }, h("div", { class: "form-group" }, h("label", { htmlFor: "inputName", class: this.service.inputHasErrors('name') ? 'text-danger' : '' }, "Full Name"), h("input", { type: "text", class: this.service.getClassesForInput('name'), id: "inputName", placeholder: "Full name", value: this.service.getInput('name').value, onInput: (event) => this.handleInputChange(event, 'name') }), this.templating.renderErrorsForInput('name')), h("div", { class: "form-group" }, h("label", { htmlFor: "inputEmail", class: this.service.inputHasErrors('email') ? 'text-danger' : '' }, "Email"), h("input", { type: "email", class: this.service.getClassesForInput('email'), id: "inputEmail", placeholder: "Email address", value: this.service.getInput('email').value, onInput: (event) => this.handleInputChange(event, 'email') }), this.templating.renderErrorsForInput('email')), h("div", { class: "form-group" }, h("label", { htmlFor: "inputPassword", class: this.service.inputHasErrors('password') ? 'text-danger' : '' }, "Password"), h("input", { type: "password", class: this.service.getClassesForInput('password'), id: "inputPassword", placeholder: "Password", value: this.service.getInput('password').value, onInput: (event) => this.handleInputChange(event, 'password') }), this.templating.renderErrorsForInput('password')), h("button", { type: "submit", class: "btn btn-primary", disabled: !this.service.isFormValid() }, "Register")));
    }
};

export { RegistrationForm as registration_form };
