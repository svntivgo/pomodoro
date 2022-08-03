import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TimerComponent } from './timer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SettingsService } from 'src/app/services/settings.service';
import { RecordService } from '../../services/record.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';




fdescribe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [TimerComponent],
      providers: [
        SettingsService,
        RecordService,
      ],

    })
      .compileComponents();

    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('startTime change isRunning to true and interval works correctly ', fakeAsync(() => {

    const spyCompleteSerie = spyOn(component, 'completeSerie').and.callFake(() => null);

    expect(component.isRunning).toBeFalsy()
    expect(component.time).toBe(0)
    component.startTimer();

    expect(component.isRunning).toBeTruthy()

    tick(1000)
    expect(component.time).toBe(1499000)

    expect(spyCompleteSerie).not.toHaveBeenCalled();
    component.time = 1000;
    tick(1000)
    expect(spyCompleteSerie).toHaveBeenCalled();

    discardPeriodicTasks()
  }))

  it('stopTimer change isRunning to false and execute unsubsctribe to interval correctly', () => {
    spyOn(Subscription.prototype, 'unsubscribe');
    component.isRunning = true;
    expect(component.isRunning).toBeTruthy();
    component.stopTimer();

    expect(component.isRunning).toBeFalsy();
    expect(Subscription.prototype.unsubscribe).toHaveBeenCalled();
  })


  it('resetTimer', () => {
    spyOn(Subscription.prototype, 'unsubscribe');
    component.isRunning = true;
    component.task = "test"
    expect(component.isRunning).toBeTruthy();
    expect(component.task).toBe('test')

    component.resetTimer();

    expect(component.isRunning).toBeFalsy();
    expect(Subscription.prototype.unsubscribe).toHaveBeenCalled();
    expect(component.task).toBe('')
  })

  fit('completeSerie change isRunning to false, unsubscribe the interval, change time depending of isResting, and execute saveRecord if roundsCounter are equals to settings.rounds', () => {
    const spySaveRecord = spyOn(component, 'saveRecord').and.callFake(()=>null);
    spyOn(Subscription.prototype, 'unsubscribe');
    component.isRunning = true;
    expect(component.isRunning).toBeTruthy();
    component.completeSerie();

    expect(component.isRunning).toBeFalsy();
    expect(Subscription.prototype.unsubscribe).toHaveBeenCalled();

    expect(component.time).toBe(component.settings.break);


    component.isResting= true;
    component.roundsCounter = 1;
    component.settings.rounds = 2
    component.completeSerie();
    expect(component.time).toBe(component.settings.focus);
    expect(component.roundsCounter).toBe(2);
    expect(component.isResting).toBeFalsy();
    expect(spySaveRecord).toHaveBeenCalled();
  })


});
