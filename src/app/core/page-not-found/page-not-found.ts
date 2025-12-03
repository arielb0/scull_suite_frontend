import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss'
})
export class PageNotFoundComponent {

  /**
   * Return a random number between 0 and max - 1
   */
  getRandomInteger(max: number): number {
    
    return Math.floor(Math.random() * max);
  }
}
