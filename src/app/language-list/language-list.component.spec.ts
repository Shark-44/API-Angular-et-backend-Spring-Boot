import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageListComponent } from './language-list.component';

describe('LanguageListComponent', () => {
  let component: LanguageListComponent;
  let fixture: ComponentFixture<LanguageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
