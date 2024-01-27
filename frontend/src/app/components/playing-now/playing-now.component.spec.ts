import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingNowComponent } from './playing-now.component';

describe('PlayingNowComponent', () => {
  let component: PlayingNowComponent;
  let fixture: ComponentFixture<PlayingNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayingNowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayingNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
