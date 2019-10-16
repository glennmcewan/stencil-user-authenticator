import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-9c0e5c55.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["login-form",[[0,"login-form",{"validationState":[32]}]]],["registration-form",[[0,"registration-form",{"validationState":[32]}]]],["user-authenticator",[[0,"user-authenticator",{"defaultTab":[1,"default-tab"]}]]]], options);
});
