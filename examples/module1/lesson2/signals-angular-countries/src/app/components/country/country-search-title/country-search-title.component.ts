import { Component, Input } from '@angular/core';

@Component({
  selector: 'country-search-title',
  standalone: true,
  template: `<h1 class="text-2xl">Kraj: {{ name }}</h1>`,
  styleUrl: './country-search-title.component.scss',
})
export class CountrySearchTitleComponent {
  @Input() name: string = 'Poland';
}
