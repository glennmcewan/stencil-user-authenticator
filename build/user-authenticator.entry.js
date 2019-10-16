import { r as registerInstance, h } from './core-9c0e5c55.js';

const UserAuthenticator = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.defaultTab = 'login';
    }
    render() {
        return (h("div", null, h("ul", { class: "nav nav-tabs", id: "userAuthenticator", role: "tablist" }, h("li", { class: "nav-item" }, h("a", { class: 'nav-link ' + (this.defaultTab === 'login' ? 'active' : ''), id: "login-tab", "data-toggle": "tab", href: "#login", role: "tab", "aria-controls": "login", "aria-selected": "true" }, "Login")), h("li", { class: "nav-item" }, h("a", { class: 'nav-link ' + (this.defaultTab === 'registration' ? 'active' : ''), id: "register-tab", "data-toggle": "tab", href: "#register", role: "tab", "aria-controls": "register", "aria-selected": "false" }, "Register"))), h("div", { class: "tab-content p-4", id: "userAuthenticatorContent" }, h("div", { class: 'tab-pane ' + (this.defaultTab === 'login' ? 'show active' : ''), id: "login", role: "tabpanel", "aria-labelledby": "login-tab" }, h("login-form", null)), h("div", { class: 'tab-pane ' + (this.defaultTab === 'registration' ? 'show active' : ''), id: "register", role: "tabpanel", "aria-labelledby": "register-tab" }, h("registration-form", null)))));
    }
};

export { UserAuthenticator as user_authenticator };
