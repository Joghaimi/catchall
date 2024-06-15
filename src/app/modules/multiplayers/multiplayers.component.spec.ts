import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayersComponent } from './multiplayers.component';

describe('MultiplayersComponent', () => {
  let component: MultiplayersComponent;
  let fixture: ComponentFixture<MultiplayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplayersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
