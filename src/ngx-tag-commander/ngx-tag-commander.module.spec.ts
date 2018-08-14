import { NgxTagCommanderModule } from './ngx-tag-commander.module';
import { describe, beforeEach, it, expect } from 'jasmine-core';

describe('NgxTagCommanderModule', () => {
  let ngxTagCommanderModule: NgxTagCommanderModule;

  beforeEach(() => {
    ngxTagCommanderModule = new NgxTagCommanderModule();
  });

  it('should create an instance', () => {
    expect(ngxTagCommanderModule).toBeTruthy();
  });
});
