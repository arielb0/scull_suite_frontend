import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { map, Observable, switchMap, tap } from 'rxjs';

import { RecipeService } from '../recipe-service/recipe-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss'
})
export class RecipeForm {
  route: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)
  recipeService: RecipeService = inject(RecipeService)
  _snackBar: MatSnackBar = inject(MatSnackBar)
  uploadedImage: string = ''
  
  recipeForm = new FormGroup({
    image: new FormControl(null),
    title: new FormControl(''),
    ingredients: new FormControl(''),
    tools: new FormControl(''),
    description: new FormControl(''),
    private: new FormControl('true')
  })

  constructor() {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        if (id) {
          return this.recipeService.read(Number(id)).pipe(
            tap(recipe => {
              if (recipe) {
                this.uploadedImage = recipe.image
                  this.recipeForm.controls.title.setValue(recipe.title)
                  this.recipeForm.controls.ingredients.setValue(recipe.ingredients)
                  this.recipeForm.controls.tools.setValue(recipe.tools)
                  this.recipeForm.controls.description.setValue(recipe.description)
                  this.recipeForm.controls.private.setValue(`${recipe.private}`)
              }
            })
          )
        }
        return new Observable()
      })
    ).subscribe({
      error: (err: HttpErrorResponse) => this._snackBar.open(err.message, 'Done') 
    })
  }

  onFileSelected(event: any) {
    this.recipeForm.patchValue({image: event.target.files[0]})
    this.recipeForm.get('image')?.updateValueAndValidity()
  }

  completeCallback() {
    this.router.navigate(['/recipes'])
  }

  errorCallback(err: HttpErrorResponse) {
    this._snackBar.open(err.statusText, 'Done')
  }

  submitRecipe() {
    const formData = new FormData()
    
    if(this.recipeForm.value.image) {
      formData.append('image', this.recipeForm.value.image)
    }
    formData.append('title', this.recipeForm.value.title ?? '')
    formData.append('ingredients', this.recipeForm.value.ingredients ?? '')
    formData.append('tools', this.recipeForm.value.tools ?? '')
    formData.append('description', this.recipeForm.value.description ?? '')
    formData.append('private', `${(this.recipeForm.value.private ?? true)}`)
    
    
    if (this.route.snapshot.params['id']) {
      formData.append('id', this.route.snapshot.params['id'])
      this.recipeService.update(formData).subscribe({
        complete: () => this.completeCallback(),
        error: (err: HttpErrorResponse) => this.errorCallback(err)
      })
    } else {
      this.recipeService.create(formData).subscribe({
        complete: () => this.completeCallback(),
        error: (err: HttpErrorResponse) => this.errorCallback(err)
      })
    }
  }
}
