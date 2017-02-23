import { Ng2moviesappPage } from './app.po';

describe('ng2moviesapp App', () => {
  let page: Ng2moviesappPage;

  beforeEach(() => {
    page = new Ng2moviesappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
