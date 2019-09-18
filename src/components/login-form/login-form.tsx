import { Component, h } from "@stencil/core";

@Component({
  tag: 'login-form'
})
export class LoginForm {
  render() {
    return (
      <form>
        <div class="form-group">
          <label htmlFor="loginEmail">Email</label>
          <input type="email" class="form-control" id="loginEmail" placeholder="Email address" />
        </div>
        <div class="form-group">
          <label htmlFor="loginPassword">Password</label>
          <input type="password" class="form-control" id="loginPassword" placeholder="Password" />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="rememberMe" />
          <label class="form-check-label" htmlFor="rememberMe">Remember me</label>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    );
  }
}
