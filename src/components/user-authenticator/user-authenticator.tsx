import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'user-authenticator',
  styleUrl: 'user-authenticator.css',
  shadow: false
})
export class UserAuthenticator {
  @Prop() defaultTab: string = 'login';

  render() {
    return (
      <div>
        <ul class="nav nav-tabs" id="userAuthenticator" role="tablist">
          <li class="nav-item">
            <a class={'nav-link ' + (this.defaultTab === 'login' ? 'active' : '')} id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true">Login</a>
          </li>
          <li class="nav-item">
            <a class={'nav-link ' + (this.defaultTab === 'registration' ? 'active' : '')} id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false">Register</a>
          </li>
        </ul>
        <div class="tab-content p-4" id="userAuthenticatorContent">
          <div class={'tab-pane ' + (this.defaultTab === 'login' ? 'show active' : '')} id="login" role="tabpanel" aria-labelledby="login-tab"><login-form></login-form></div>
          <div class={'tab-pane ' + (this.defaultTab === 'registration' ? 'show active' : '')} id="register" role="tabpanel" aria-labelledby="register-tab"><registration-form></registration-form></div>
        </div>
      </div>
    );
  }
}
