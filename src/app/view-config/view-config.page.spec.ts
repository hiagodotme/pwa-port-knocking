import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ViewConfigPageRoutingModule } from './view-config-routing.module';

import { ViewConfigPage } from './view-config.page';

describe('ViewConfigPage', () => {
  let component: ViewConfigPage;
  let fixture: ComponentFixture<ViewConfigPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewConfigPage ],
      imports: [IonicModule.forRoot(), ViewConfigPageRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
