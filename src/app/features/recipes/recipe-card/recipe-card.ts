import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RecipeModel } from '../recipe-model';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RecipeDelete } from '../recipe-delete/recipe-delete';
import { AuthService } from '../../auth/auth-service/auth-service';
import { RecipeActions } from '../recipe-actions/recipe-actions';

@Component({
  selector: 'app-recipe-card',
  imports: [MatCardModule, MatButtonModule, RecipeActions],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss'
})
export class RecipeCard {
  dialog = inject(MatDialog)  
  recipe = input.required<RecipeModel>()
  authService = inject(AuthService)
  router = inject(Router)

  openDialog(id: number) {
    const dialogRef = this.dialog.open(RecipeDelete, {data: {id: id}})
  }

  goToRecipeDetail(id: number) {
    this.router.navigate(['/recipes', id])
  }


}
