import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule, NgbButtonsModule, NgbTooltipModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { StatEditorComponent } from './components/';
import { WebviewDirective } from './directives/';

const sharedModules = [FormsModule, NgbModule, NgbNavModule, NgbButtonsModule, NgbTooltipModule, NgbAccordionModule];

@NgModule({
  declarations: [StatEditorComponent, WebviewDirective],
  imports: [CommonModule, ...sharedModules],
  exports: [StatEditorComponent, WebviewDirective, ...sharedModules]
})
export class SharedModule {}
