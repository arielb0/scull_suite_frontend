import { Component, inject, input } from '@angular/core';
import { RecipeModel } from '../recipe-model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RecipeDelete } from '../recipe-delete/recipe-delete';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-actions',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './recipe-actions.html',
  styleUrl: './recipe-actions.scss',
})
export class RecipeActions {

  recipe = input.required<RecipeModel>()
  dialog = inject(MatDialog)

  openDialog(id: number) {
    let dialogRef = this.dialog.open(RecipeDelete, {data: {id: id}})
  }

}
