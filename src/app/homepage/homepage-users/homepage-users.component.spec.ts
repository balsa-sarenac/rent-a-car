import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageUsersComponent } from './homepage-users.component';

describe('HomepageUsersComponent', () => {
  let component: HomepageUsersComponent;
  let fixture: ComponentFixture<HomepageUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
