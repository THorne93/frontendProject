import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesaverefreshserviceComponent } from './likesaverefreshservice.component';

describe('LikesaverefreshserviceComponent', () => {
  let component: LikesaverefreshserviceComponent;
  let fixture: ComponentFixture<LikesaverefreshserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikesaverefreshserviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikesaverefreshserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
