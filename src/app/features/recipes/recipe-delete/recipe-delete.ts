import { Component, inject } from '@angular/core';
import { MatDialogTitle, MatDialogClose, MatDialogActions, MatDialogContent, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RecipeService } from '../recipe-service/recipe-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-recipe-delete',
  imports: [MatDialogTitle, MatDialogClose, MatDialogActions, MatDialogContent],
  templateUrl: './recipe-delete.html',
  styleUrl: './recipe-delete.scss',
})
export class RecipeDelete {
  recipeService = inject(RecipeService)
  router = inject(Router)
  route = inject(ActivatedRoute)
  _snackBar = inject(MatSnackBar)
  data = inject(MAT_DIALOG_DATA)
  dialog = inject(MatDialog)

  deleteRecipe(id: number) {
    this.recipeService.delete(id).subscribe({
      complete: () => {
        const matDialogRef = this.dialog.closeAll()
      },
      error: (err: HttpErrorResponse) => {
        this._snackBar.open(err.message, 'Done')
      }
    })
  }

}
