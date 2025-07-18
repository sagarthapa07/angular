import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VikalpComponent } from './vikalp.component';

describe('VikalpComponent', () => {
  let component: VikalpComponent;
  let fixture: ComponentFixture<VikalpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VikalpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VikalpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
