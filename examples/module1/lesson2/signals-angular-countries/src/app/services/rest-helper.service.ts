import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Country} from "../types/Country";
import {Observable} from "rxjs";

export interface QueryString {
  [key: string]: string | number | boolean | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class RestHelperService {
  private readonly apiBaseUrl = 'https://restcountries.com/v3.1/';

  constructor(
    private readonly httpClient: HttpClient
  ) {}

  getCountries(query: QueryString): Observable<Country[]> {
    const url = `${this.apiBaseUrl}${this.buildQueryString(query)}`;
    return this.httpClient.get<Country[]>(url);
  }

  private buildQueryString(query: QueryString): string {
    return Object.keys(query)
      .map((key: string): string => `${key}/${encodeURIComponent(query[key] ?? '')}`)
      .join('&');
  }
}
