import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [{
  path: '',
  component: WelcomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {
}
