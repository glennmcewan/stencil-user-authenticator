import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'user-authenticator',
  styleUrl: 'user-authenticator.css',
  shadow: false
})
export class UserAuthenticator {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  render() {
    return (
      <div>
        <ul class="nav nav-tabs" id="loginTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="true">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="register" aria-selected="false">Register</a>
          </li>
        </ul>
        <div class="tab-content" id="loginTabContent">
          <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">Log me in</div>
          <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">Sign me up</div>
        </div>
      </div>
    );
  }
}
