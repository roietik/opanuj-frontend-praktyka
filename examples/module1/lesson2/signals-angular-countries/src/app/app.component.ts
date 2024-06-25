import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountrySearchContainerComponent } from './containers/country-search-container/country-search-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountrySearchContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'signals';
}
