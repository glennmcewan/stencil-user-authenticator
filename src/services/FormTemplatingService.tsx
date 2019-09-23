import { h } from "@stencil/core";
import { FormService } from "./FormService";
import { ValidationErrorInterface } from "../validation/ValidationErrorInterface";

export class FormTemplatingService {
  private service;

  constructor(service: FormService) {
    this.service = service;
  }

  renderErrorsForInput(identifier: string) {
    if (null === this.service.getInput(identifier).value) {
      return;
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
