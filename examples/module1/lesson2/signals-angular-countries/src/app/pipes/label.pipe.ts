import { Pipe, PipeTransform } from '@angular/core';

export interface LabelOptions {
  singular?: string;
  plural?: string;
}
@Pipe({standalone: true, name: 'label'})
export class LabelPipe implements PipeTransform {
  transform(
    value: unknown,
    options: LabelOptions = {}
  ): string {
    if (!value) {
      return '';
    }
    const isArray = Array.isArray(value),
      length = isArray ? value.length : Object.keys(value).length,
      isSingular = length === 1;

    return isSingular
      ? options.singular || 'Single:'
      : options.plural || 'Multiple:';

  }
}
