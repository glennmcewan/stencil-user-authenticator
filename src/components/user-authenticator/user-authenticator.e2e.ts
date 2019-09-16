import { newE2EPage } from '@stencil/core/testing';

describe('user-authenticator', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<user-authenticator></user-authenticator>');
    const element = await page.find('user-authenticator');
    expect(element).toHaveClass('hydrated');
  });
});
