import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTourComponent } from './table-tour.component';

describe('TableTourComponent', () => {
  let component: TableTourComponent;
  let fixture: ComponentFixture<TableTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
