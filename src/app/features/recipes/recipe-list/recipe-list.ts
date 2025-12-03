import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RecipeCard } from '../recipe-card/recipe-card';
import { RecipeService } from '../recipe-service/recipe-service';
import { RecipeModel } from '../recipe-model';
import { LoadingSpinner } from '../../../core/loading-spinner/loading-spinner';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCard, AsyncPipe, LoadingSpinner],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList {

  recipeService = inject(RecipeService)
  recipes$: Observable<RecipeModel[]> = this.recipeService.recipes$
  _snackBar: MatSnackBar = inject(MatSnackBar)

  constructor() {
    this.recipeService.list().subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })
  }

}
