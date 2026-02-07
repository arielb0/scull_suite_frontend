import { Component, inject } from '@angular/core';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-faq',
  imports: [MatExpansionModule, MatListModule, MatAnchor, MatButtonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {

  _snackBar = inject(MatSnackBar)

  copyLitecoinAddress() {
    navigator.clipboard.writeText('ltc1qwxpas227zdfegd5q2yr4jkhwfnnxe509f2rve9')
    this._snackBar.open('Litecoin address copied', 'Done', {
      duration: 3000
    })
  }

}
