import { Component } from '@angular/core';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";

@Component({
  selector: 'app-faq',
  imports: [MatExpansionModule, MatListModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {

}
