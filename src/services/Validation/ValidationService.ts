import { ValidationState } from "./ValidationState";
import { ValidationSubjectInterface } from "./ValidationSubjectInterface";
import { ConstraintInterface } from "./ConstraintInterface";

export class ValidationService {
  validate(value: string, constraints: any[]): ValidationState {
    let errors = [];

    constraints.map((constraint: ConstraintInterface) => {
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

  validateMany(subjects: ValidationSubjectInterface[]): ValidationState {
    let errors = [];

    subjects.forEach(function (subject: ValidationSubjectInterface) {
      subject.constraints.map((constraint: ConstraintInterface) => {
        const message = constraint(subject.value);

        if (message !== null) {
          errors.push({
            message: message,
            identifier: subject.identifier
          });
        }
      })
    });

    return new ValidationState(errors);
  }
}
