import { TestBed } from '@angular/core/testing';

import { ElitedataService } from './elitedata.service';

describe('ElitedataService', () => {
  let service: ElitedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElitedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
