import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAndGradeComponent } from './comment-and-grade.component';

describe('CommentAndGradeComponent', () => {
  let component: CommentAndGradeComponent;
  let fixture: ComponentFixture<CommentAndGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentAndGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentAndGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
