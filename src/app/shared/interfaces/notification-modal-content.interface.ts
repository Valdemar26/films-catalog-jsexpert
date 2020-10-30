import {TemplateRef} from '@angular/core';

export interface NotificationModalContentInterface {
  title: string;
  text?: string;
  panelClass?: string;
  template?: TemplateRef<HTMLDivElement>;
}
