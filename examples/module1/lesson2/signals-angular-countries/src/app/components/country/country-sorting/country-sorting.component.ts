import { Component, Input } from '@angular/core';
import {Country} from "../../../types/Country";
import {CountriesSearchService} from "../../../services/countries-search.service";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'country-sorting',
  templateUrl: './country-sorting.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
})
export class CountrySortingComponent {
  @Input() countries!: Country[];
  isDescending = false;

  constructor(
    private readonly countriesSearchService: CountriesSearchService
  ) {
  }

  sortByPopulation(): void {
    this.countries = this.countriesSearchService
      .sortByPopulation(this.countries, this.isDescending);
  }
}
