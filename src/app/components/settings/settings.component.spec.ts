import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { SettingsService } from '../../services/settings.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ISettings } from '../../interfaces/ISettings.interface';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  let settingService: SettingsService;

  let data: ISettings = {
    focus: 25 * 60 * 1000,
    break: 15 * 60 * 1000,
    longBreak: 25 * 60 * 1000,
    rounds: 4,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SettingsComponent],
      providers: [
        SettingsService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    settingService = fixture.debugElement.injector.get(SettingsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saveData run saveSettings into settingService and is called with the correct params ', () => {

    const spySet = spyOn(settingService, 'saveSettings').and.callFake(() => null);

    component.saveData();

    expect(spySet).toHaveBeenCalled();
    expect(spySet).toHaveBeenCalledWith(data)


  })

});
