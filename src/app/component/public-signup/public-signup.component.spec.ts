import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSignupComponent } from './public-signup.component';

describe('PublicSignupComponent', () => {
  let component: PublicSignupComponent;
  let fixture: ComponentFixture<PublicSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicSignupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
