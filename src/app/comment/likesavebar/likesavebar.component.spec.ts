import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesavebarComponent } from './likesavebar.component';

describe('LikesavebarComponent', () => {
  let component: LikesavebarComponent;
  let fixture: ComponentFixture<LikesavebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikesavebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikesavebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
