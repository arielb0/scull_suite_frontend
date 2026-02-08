import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [MatCardModule, RouterLink, MatButton],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
