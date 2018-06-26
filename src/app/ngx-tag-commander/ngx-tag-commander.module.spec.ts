import { NgxTagCommanderModule } from './ngx-tag-commander.module';

describe('NgxTagCommanderModule', () => {
  let ngxTagCommanderModule: NgxTagCommanderModule;

  beforeEach(() => {
    ngxTagCommanderModule = new NgxTagCommanderModule();
  });

  it('should create an instance', () => {
    expect(ngxTagCommanderModule).toBeTruthy();
  });
});
