import { ConstraintInterface } from "./ConstraintInterface";

export class Constraints {
  getNameConstraints(): ConstraintInterface[] {
    return [
      (value: string) => value === '' ? 'Name cannot be empty' : null,
    ]
  }

  getPasswordConstraints(): ConstraintInterface[] {
    return [
      (value: string) => '' === value ? 'Password cannot be empty' : null,

      (value: string) => false === /[A-Z]+/.test(value) ? 'Password must contain at least one uppercase letter' : null,

      (value: string) => false === /[0-9]+/.test(value) ? 'Password must contain at least one number' : null,
    ];
  }

  getEmailConstraints(): ConstraintInterface[] {
    return [
      (value: string) => '' === value ? 'Email cannot be empty' : null,

      (value: string) => false === /@+/.test(value) ? 'Email must contain an @ symbol' : null,
    ];
  }
}

