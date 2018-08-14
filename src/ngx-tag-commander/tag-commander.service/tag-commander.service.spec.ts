import { TestBed, inject } from '@angular/core/testing';

import { TagCommanderService } from './tag-commander.service';

describe('TagCommanderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagCommanderService]
    });
  });

  it('should be created', inject([TagCommanderService], (service: TagCommanderService) => {
    expect(service).toBeTruthy();
  }));
});
