import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountriesSearchService} from "../../../../../services/countries-search.service";
import {Subject, takeUntil, tap} from "rxjs";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'country-search-field-value',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <label for="inputValue">Search by:
      <input
        id="inputValue"
        class="border h-7 mt-1 indent-2"
        type="text"
        [placeholder]="placeholder"
        [(ngModel)]="value"
        (input)="onValueChange($event)"
      />
    </label>`
})
export class CountrySearchFieldValueComponent implements OnInit, OnDestroy {
  value!: string;
  placeholder!: string;
  private readonly destroy: Subject<void> = new Subject<void>();

  constructor(
    private readonly countriesSearchService: CountriesSearchService
  ) {
  }

  ngOnInit(): void {
    this.getValue();
    this.detectTypeChanges();
  }

  private getValue(): void {
    this.countriesSearchService.getValue()
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => this.value = value);
  }

  private detectTypeChanges(): void {
    this.countriesSearchService.getType()
      .pipe(
        tap(() => this.resetValue()),
        takeUntil(this.destroy)
      )
      .subscribe((type) => {
        this.setPlaceholder(type);
      });
  }

  private setPlaceholder(value: string): void {
    this.placeholder = value;
  }

  private resetValue(): void {
    this.countriesSearchService.setValue('');
  }

  onValueChange(event: Event) {
      const value = (event.target as HTMLInputElement).value;
    this.countriesSearchService.setValue(value);
    this.countriesSearchService.resetError();
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
