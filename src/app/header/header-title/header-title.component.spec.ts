import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTitleComponent } from './header-title.component';

describe('HeaderTitleComponent', (): void => {
  let component: HeaderTitleComponent;
  let fixture: ComponentFixture<HeaderTitleComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [HeaderTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
