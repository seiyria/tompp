import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule, NgbButtonsModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';

const sharedModules = [FormsModule, NgbModule, NgbNavModule, NgbButtonsModule, NgbTooltipModule];

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective],
  imports: [CommonModule, ...sharedModules],
  exports: [WebviewDirective, ...sharedModules]
})
export class SharedModule {}
