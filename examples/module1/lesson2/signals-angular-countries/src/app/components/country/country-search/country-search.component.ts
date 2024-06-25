import { CommonModule } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountrySearchFieldValueComponent} from "./country-search-fields/country-search-field-value/country--search-field-value.component";
import {CountrySearchFieldTypeComponent} from "./country-search-fields/country-search-field-type/country-search-field-type.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CountriesSearchService, CountryErrorMessage} from "../../../services/countries-search.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'country-search',
  standalone: true,
  imports: [
    CommonModule,
    CountrySearchFieldValueComponent,
    CountrySearchFieldTypeComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss']
})
export class CountrySearchComponent implements OnInit, OnDestroy {
  private readonly destroy: Subject<void> = new Subject<void>();
  errorMessage!: CountryErrorMessage;
  constructor(
    private readonly countriesSearchService: CountriesSearchService
  ) {
  }

  ngOnInit(): void {
    this.countriesSearchService.catchError()
      .pipe(takeUntil(this.destroy))
      .subscribe((error) => {
        this.errorMessage = error;
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
