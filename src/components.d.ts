/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface LoginForm {}
  interface RegistrationForm {}
  interface UserAuthenticator {
    'landingTab': string;
  }
}

declare global {


  interface HTMLLoginFormElement extends Components.LoginForm, HTMLStencilElement {}
  var HTMLLoginFormElement: {
    prototype: HTMLLoginFormElement;
    new (): HTMLLoginFormElement;
  };

  interface HTMLRegistrationFormElement extends Components.RegistrationForm, HTMLStencilElement {}
  var HTMLRegistrationFormElement: {
    prototype: HTMLRegistrationFormElement;
    new (): HTMLRegistrationFormElement;
  };

  interface HTMLUserAuthenticatorElement extends Components.UserAuthenticator, HTMLStencilElement {}
  var HTMLUserAuthenticatorElement: {
    prototype: HTMLUserAuthenticatorElement;
    new (): HTMLUserAuthenticatorElement;
  };
  interface HTMLElementTagNameMap {
    'login-form': HTMLLoginFormElement;
    'registration-form': HTMLRegistrationFormElement;
    'user-authenticator': HTMLUserAuthenticatorElement;
  }
}

declare namespace LocalJSX {
  interface LoginForm extends JSXBase.HTMLAttributes<HTMLLoginFormElement> {}
  interface RegistrationForm extends JSXBase.HTMLAttributes<HTMLRegistrationFormElement> {}
  interface UserAuthenticator extends JSXBase.HTMLAttributes<HTMLUserAuthenticatorElement> {
    'landingTab'?: string;
  }

  interface IntrinsicElements {
    'login-form': LoginForm;
    'registration-form': RegistrationForm;
    'user-authenticator': UserAuthenticator;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


