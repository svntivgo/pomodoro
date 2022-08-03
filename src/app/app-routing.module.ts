import { RecordsComponent } from './components/records/records.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { TimerComponent } from './components/timer/timer.component';

const routes: Routes = [
  { path: '', component: TimerComponent },
  { path: 'records', component: RecordsComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
