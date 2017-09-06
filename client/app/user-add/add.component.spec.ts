import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UserAddComponent } from './user.component';

describe('AddUserComponent', () => {
    let component: UserAddComponent;
    let fixture: ComponentFixture<UserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [UserAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(UserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the string "Register" in h4', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('Register');
  });*/
});
