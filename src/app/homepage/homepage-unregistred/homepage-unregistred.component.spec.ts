import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageUnregistredComponent } from './homepage-unregistred.component';

describe('HomepageUnregistredComponent', () => {
  let component: HomepageUnregistredComponent;
  let fixture: ComponentFixture<HomepageUnregistredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageUnregistredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageUnregistredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
