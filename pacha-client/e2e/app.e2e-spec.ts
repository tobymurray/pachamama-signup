import { PachaClientPage } from './app.po';

describe('pacha-client App', () => {
  let page: PachaClientPage;

  beforeEach(() => {
    page = new PachaClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
