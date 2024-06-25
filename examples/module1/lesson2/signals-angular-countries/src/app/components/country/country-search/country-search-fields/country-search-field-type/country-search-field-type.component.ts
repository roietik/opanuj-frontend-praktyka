import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {KeyValuePipe, NgForOf} from "@angular/common";
import {CountriesSearchService, CountryFieldTypes} from "../../../../../services/countries-search.service";

@Component({
  selector: 'country-search-field-type',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    KeyValuePipe
  ],
  templateUrl: './country-search-field-type.component.html'
})
export class CountrySearchFieldTypeComponent implements OnInit {
  selectedType: string = CountryFieldTypes.NAME;
  readonly countryFieldTypes = CountryFieldTypes;

  constructor(
    private readonly countriesSearchService: CountriesSearchService
  ) {
  }

  ngOnInit(): void {
    this.initType();
  }

  changeType(selectedType: string): void {
    this.countriesSearchService.setType(selectedType);
  }

  private initType(): void {
    this.countriesSearchService.setType(this.selectedType);
  }
}
