import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScreeningComponent } from './admin-screening.component';

describe('AdminScreeningComponent', () => {
  let component: AdminScreeningComponent;
  let fixture: ComponentFixture<AdminScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminScreeningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
