import { Component, Input } from '@angular/core';
import { Country } from '../../../types/Country';
import { CountryCardComponent } from '../country-card/country-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'country-list',
  standalone: true,
  imports: [CountryCardComponent, CommonModule],
  templateUrl: './country-list.component.html'
})
export class CountryListComponent {
  @Input() countries: Country[] = [];
}
