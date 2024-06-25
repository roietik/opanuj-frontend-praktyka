import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CountriesSearchService } from '../../services/countries-search.service';
import { Country } from "../../types/Country";
import {CountrySearchComponent} from "../../components/country/country-search/country-search.component";
import {CountryListComponent} from "../../components/country/country-list/country-list.component";
import {CountrySortingComponent} from "../../components/country/country-sorting/country-sorting.component";
@Component({
  selector: 'country-search-container',
  standalone: true,
  imports: [
    CountrySearchComponent,
    CountryListComponent,
    CountrySortingComponent
  ],
  templateUrl: './country-search-container.component.html'
})
export class CountrySearchContainerComponent {
  countries: Country[] = [];
  destroy = new Subject<void>();

  constructor(
    private readonly countriesSearchService: CountriesSearchService
  ) {}

  ngOnInit(): void {
    this.countriesSearchService.countries$
      .pipe(takeUntil(this.destroy))
      .subscribe((countries) => {
        this.countries = countries;
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
