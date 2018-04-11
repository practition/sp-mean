import { TestBed, inject } from '@angular/core/testing';

import { HomeDaoService } from './home-dao.service';

describe('HomeDaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeDaoService]
    });
  });

  it('should be created', inject([HomeDaoService], (service: HomeDaoService) => {
    expect(service).toBeTruthy();
  }));
});
