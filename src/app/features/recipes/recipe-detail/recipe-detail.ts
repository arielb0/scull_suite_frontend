import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs';
import { MatListModule } from '@angular/material/list';

import { RecipeModel } from '../recipe-model';
import { RecipeService } from '../recipe-service/recipe-service';
import { RecipeActions } from '../recipe-actions/recipe-actions';
import { AuthService } from '../../auth/auth-service/auth-service';
import { LoadingSpinner } from '../../../core/loading-spinner/loading-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-recipe-detail',
  imports: [MatListModule, RecipeActions, LoadingSpinner],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss'
})

export class RecipeDetail {
  route: ActivatedRoute = inject(ActivatedRoute)
  recipeService = inject(RecipeService)
  authService = inject(AuthService)
  _snackBar: MatSnackBar = inject(MatSnackBar)
  recipe: RecipeModel | undefined = undefined

  constructor() {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.recipeService.read(Number(id)))
    ).subscribe({
      next: (recipe) => this.recipe = recipe,
      error: (err: HttpErrorResponse) => this._snackBar.open(err.statusText, 'Done')
    })
  }

}