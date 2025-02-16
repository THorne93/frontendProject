import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentrefreshserviceComponent } from './commentrefreshservice.component';

describe('CommentrefreshserviceComponent', () => {
  let component: CommentrefreshserviceComponent;
  let fixture: ComponentFixture<CommentrefreshserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentrefreshserviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentrefreshserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
