import { CharSheetNg2Page } from './app.po';

describe('char-sheet-ng2 App', function() {
  let page: CharSheetNg2Page;

  beforeEach(() => {
    page = new CharSheetNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
