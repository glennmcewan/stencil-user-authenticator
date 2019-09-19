import { ConstraintInterface } from "./ConstraintInterface";

export interface ValidationSubjectInterface {
  identifier: string;
  name?: string;
  value: any;
  constraints: ConstraintInterface[];
}
