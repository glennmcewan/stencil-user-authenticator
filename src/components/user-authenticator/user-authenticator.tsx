import { Component, State, h, Prop } from '@stencil/core';

@Component({
  tag: 'user-authenticator',
  styleUrl: 'user-authenticator.css',
  shadow: false
})
export class UserAuthenticator {
  @Prop() landingTab: string = 'login';

  @State() activeTab: string = 'login';

  componentWillLoad() {
    this.activeTab = this.landingTab;
  }

  render() {
    console.log(this.activeTab);
    return (
      <div>
        <ul class="nav nav-tabs" id="userAuthenticator" role="tablist">
          <li class="nav-item">
            <a class={this.activeTab === 'login' ? 'nav-link active' : 'nav-link'} id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true">Login</a>
          </li>
          <li class="nav-item">
            <a class={this.activeTab === 'registration' ? 'nav-link active' : 'nav-link'} id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false">Register</a>
          </li>
        </ul>
        <div class="tab-content" id="userAuthenticatorContent">
          <div class={this.activeTab === 'login' ? 'tab-pane fade show active' : 'tab-pane fade'} id="login" role="tabpanel" aria-labelledby="login-tab"><login-form></login-form></div>
          <div class={this.activeTab === 'registration' ? 'tab-pane fade show active' : 'tab-pane fade'} id="register" role="tabpanel" aria-labelledby="register-tab"><registration-form></registration-form></div>
        </div>
      </div>
    );
  }
}
