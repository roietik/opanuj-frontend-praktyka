import { Component, Input } from '@angular/core';
import { Country } from '../../../types/Country';
import {JsonPipe, KeyValuePipe, NgForOf, NgIf, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {LabelPipe} from "../../../pipes/label.pipe";

@Component({
  selector: 'country-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgIf,
    JsonPipe,
    KeyValuePipe,
    LabelPipe,
    NgTemplateOutlet
  ],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.scss',
})
export class CountryCardComponent {
  @Input() country!: Country;
}
