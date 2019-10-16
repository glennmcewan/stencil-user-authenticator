import { h } from './core-9c0e5c55.js';

class FormService {
    constructor(validator, inputs) {
        this.validator = validator;
        this.inputs = inputs;
    }
    validateForm() {
        this.state = this.validator.validateMany(Object.keys(this.inputs).map((identifier) => {
            return this.inputs[identifier];
        }));
        return this.state;
    }
    isFormValid() {
        if (typeof this.state === 'undefined') {
            return false;
        }
        return this.state.isValid();
    }
    getState() {
        return this.state;
    }
    getInput(identifier) {
        return this.inputs[identifier];
    }
    setInputValue(identifier, value) {
        this.inputs[identifier].value = value;
    }
    inputHasErrors(identifier) {
        if (null === this.getInput(identifier).value) {
            return false;
        }
        return this.state.getErrorsFor(identifier).length > 0;
    }
    getClassesForInput(identifier) {
        const classes = ['form-control'];
        if (null !== this.getInput(identifier).value) {
            const errors = this.state.getErrorsFor(identifier);
            classes.push(errors.length > 0 ? 'is-invalid' : 'is-valid');
        }
        return classes.join(' ');
    }
}
class FormInput {
    constructor(identifier, name, value, constraints) {
        this.identifier = identifier;
        this.name = name;
        this.value = value;
        this.constraints = constraints;
    }
}

class FormTemplatingService {
    constructor(service) {
        this.service = service;
    }
    renderErrorsForInput(identifier) {
        const input = this.service.getInput(identifier);
        if (!input || null === input.value) {
            return null;
        }
        return (h("ul", null, this.service.getState().getErrorsFor(identifier).map((error) => {
            return h("li", null, error.message);
        })));
    }
}

class Constraints {
    static getNameConstraints() {
        return [
            (value) => value === '' ? 'Name cannot be empty' : null,
        ];
    }
    static getPasswordConstraints() {
        return [
            (value) => '' === value ? 'Password cannot be empty' : null,
            (value) => false === /[A-Z]+/.test(value) ? 'Password must contain at least one uppercase letter' : null,
            (value) => false === /[0-9]+/.test(value) ? 'Password must contain at least one number' : null,
        ];
    }
    static getEmailConstraints() {
        return [
            (value) => '' === value ? 'Email cannot be empty' : null,
            (value) => false === /@+/.test(value) ? 'Email must contain an @ symbol' : null,
        ];
    }
}

class ValidationState {
    constructor(errors) {
        this.errors = errors;
    }
    getErrors() {
        return this.errors;
    }
    getErrorsFor(identifier) {
        return this.errors.filter((error) => error.identifier === identifier);
    }
    isValid() {
        return this.errors.length === 0;
    }
}

class ValidationService {
    validate(value, constraints) {
        let errors = [];
        constraints.map((constraint) => {
            const message = constraint(value);
            if (message !== null) {
                errors.push({
                    message: message,
                    identifier: null
                });
            }
        });
        return new ValidationState(errors);
    }
    validateMany(subjects) {
        let errors = [];
        subjects.forEach(function (subject) {
            subject.constraints.map((constraint) => {
                const message = constraint(subject.value);
                if (message !== null) {
                    errors.push({
                        message: message,
                        identifier: subject.identifier
                    });
                }
            });
        });
        return new ValidationState(errors);
    }
}

export { Constraints as C, FormInput as F, ValidationService as V, FormService as a, FormTemplatingService as b };
