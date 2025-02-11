import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcommentsbyreviewComponent } from './showcommentsbyreview.component';

describe('ShowcommentsbyreviewComponent', () => {
  let component: ShowcommentsbyreviewComponent;
  let fixture: ComponentFixture<ShowcommentsbyreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcommentsbyreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowcommentsbyreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
