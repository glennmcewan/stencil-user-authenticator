import { UserAuthenticator } from './user-authenticator';
import { newSpecPage } from '@stencil/core/testing';

describe('user-authenticator', () => {
  it('builds', () => {
    expect(new UserAuthenticator()).toBeTruthy();
  });
});

describe('behaviour', () => {
    it('should default to the login tab', async () => {
        const page = await newSpecPage({
            components: [UserAuthenticator],
            html: '<user-authenticator></user-authenticator>'
        });

        const loginTab: HTMLElement = page.root.querySelector('#login-tab');

        expect(loginTab.classList.contains('active')).toEqual(true);
    });

    it('should default to the tab set by property', async () => {
        const page = await newSpecPage({
            components: [UserAuthenticator],
            html: '<user-authenticator default-tab="registration"></user-authenticator>'
        });

        const registrationTab: HTMLElement = page.root.querySelector('#register-tab');

        expect(registrationTab.classList.contains('active')).toEqual(true);
    });
});
