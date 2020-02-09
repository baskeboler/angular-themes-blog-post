import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ThemesService } from 'src/app/services/themes.service';
import { ALTERNATE_THEME } from 'src/app/models/theme';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const themesServiceSpy = jasmine.createSpyObj<ThemesService>('ThemesService', ['generateRandomTheme', 'setCurrentTheme']);
  themesServiceSpy.generateRandomTheme.and.returnValue(ALTERNATE_THEME);
  themesServiceSpy.setCurrentTheme.and.callFake(t => {
    console.log('called set theme');
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [{provides: ThemesService, useValue: themesServiceSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set new random theme', () => {
    const c = new HomeComponent(themesServiceSpy);
    c.randomTheme();

    expect(themesServiceSpy.generateRandomTheme.calls.mostRecent().returnValue).toBe(ALTERNATE_THEME, 'not the theme i expected');
    expect(themesServiceSpy.setCurrentTheme.calls.any()).toBeTrue();
  });

});
