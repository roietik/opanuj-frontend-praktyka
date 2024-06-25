import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  of,
  switchMap,
  debounceTime,
  map,
  catchError,
} from 'rxjs';
import { Country } from '../types/Country';
import { RestHelperService } from "./rest-helper.service";

export const CountryFieldTypes = {
  CURRENCY: "currency",
  LANGUAGE: "lang",
  CAPITAL: "capital",
  NAME: "name"
} as const;

export const CountryErrorMessageTypes = {
  ERROR_404: "Nie ma takiej wartości! ",
  ERROR_OTHER: "Nieoczekiwany błąd: "
} as const;

export type CountryErrorMessage = typeof CountryErrorMessageTypes[keyof typeof CountryErrorMessageTypes] | null;

@Injectable({
  providedIn: 'root',
})
export class CountriesSearchService{
  private readonly valueSubject = new BehaviorSubject<string>('');
  private readonly typeSubject = new BehaviorSubject<string>('');
  private readonly genderSubject = new BehaviorSubject<string>('');
  private readonly sortOptionSubject = new BehaviorSubject<string>('');
  private readonly errorSubject = new BehaviorSubject<CountryErrorMessage>(null);
  readonly countries$: Observable<Country[]> = new Observable<Country[]>();

  constructor(
    private readonly restHelperService: RestHelperService
  ) {
    this.countries$ = combineLatest([
      this.valueSubject,
      this.typeSubject
    ]).pipe(
      debounceTime(300),
      switchMap(([value, type]) => {
        if (this.isEmptyString(value)) {
          return of([]);
        }

        return this.restHelperService.getCountries({ [type]: value })
          .pipe(map((countries) => this.sortByPopulation(countries)));
      }),
      catchError((error) => {
        const errorMessage: CountryErrorMessage = error.status === 404
          ? CountryErrorMessageTypes.ERROR_404
          : CountryErrorMessageTypes.ERROR_OTHER;

        this.errorSubject.next(errorMessage);
        return of([]);
      })
    );
  }

  setValue(value: string): void {
    this.valueSubject.next(value);
  }

  get value(): string {
    return this.valueSubject.value;
  }

  getValue(): Observable<string> {
    return this.valueSubject.asObservable();
  }

  setType(type: string): void {
    this.typeSubject.next(type);
  }

  get type(): string {
    return this.typeSubject.value;
  }

  getType(): Observable<string> {
    return this.typeSubject.asObservable();
  }

  setGender(gender: string) {
    this.genderSubject.next(gender);
  }

  setSortOption(sortOption: string) {
    this.sortOptionSubject.next(sortOption);
  }

  get gender(): string {
    return this.genderSubject.value;
  }

  get sortOption(): string {
    return this.sortOptionSubject.value;
  }

  sortByPopulation(countries: Country[], isDescending = false): Country[] {
    return countries.sort((
      { population: populationA }, { population: populationB }
    ): number => {
      return isDescending
        ? (populationB - populationA)
        : (populationA - populationB);
    });
  }

  catchError(): Observable<CountryErrorMessage> {
    return this.errorSubject.asObservable();
  }

  resetError() {
    this.errorSubject.next(null);
  }

  private isEmptyString(value: string): boolean {
    return value.length === 0;
  }
}
