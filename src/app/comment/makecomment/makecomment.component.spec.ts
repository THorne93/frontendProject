import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakecommentComponent } from './makecomment.component';

describe('MakecommentComponent', () => {
  let component: MakecommentComponent;
  let fixture: ComponentFixture<MakecommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakecommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakecommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
