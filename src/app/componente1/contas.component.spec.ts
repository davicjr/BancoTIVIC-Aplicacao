import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasComponent } from '../conta/contas.component';

describe('Componente1Component', () => {
  let component: ContasComponent;
  let fixture: ComponentFixture<ContasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
