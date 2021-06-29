/* tslint:disable */
/* eslint-disable */
import { AdditionalPropertyTarget } from './additional-property-target';
import { TemplateTemplate } from './template-template';
export interface Template {
  template?: Array<TemplateTemplate>;

  [key: string]: AdditionalPropertyTarget | Array<TemplateTemplate> | undefined;
}
