import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map, switchMap } from 'rxjs';

import { RecipeModel } from '../recipe-model';
import { ApiRestService } from '../../../core/api-rest-service/api-rest-service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  static readonly url = `${environment.url}recipes/`
  private apiRestService = inject(ApiRestService)

  private recipesSubject = new BehaviorSubject<RecipeModel[]>([])
  recipes$ = this.recipesSubject.asObservable()
  
  create(item: FormData): Observable<RecipeModel> {
   return this.apiRestService.create<FormData, RecipeModel>(RecipeService.url, item).pipe(
    tap((response) => {

    })
   ) as Observable<RecipeModel>
  }

  private updateObservable(recipe: RecipeModel) {
    const currentStatus = this.recipesSubject.value
    const index = currentStatus.findIndex(item => item.id == recipe.id)

    if (index === -1) {
        this.recipesSubject.next(currentStatus.concat(recipe))
    } else {
      currentStatus[index] = recipe
      this.recipesSubject.next(currentStatus)
    }
  }
  
  read(id: number): Observable<undefined | RecipeModel> {
    return this.apiRestService.read<RecipeModel>(`${RecipeService.url}${id}/`).pipe(
      tap((response) => {       
        this.updateObservable(response as RecipeModel)
      }),
      switchMap(() => this.recipes$.pipe(
        map(recipes => recipes.find((recipe) => recipe.id == id))
      ))
    )
  }

  update(item: FormData): Observable<RecipeModel> {
    return this.apiRestService.update<FormData, RecipeModel>(`${RecipeService.url}${item.get('id')}/`, item).pipe(
      tap(response => {
        this.updateObservable(response)
      })
    )
  }

  delete(id: number): Observable<Object> {
    return this.apiRestService.delete<RecipeModel>(`${RecipeService.url}${id}/`).pipe(
      tap(response => {        
        const currentStatus = this.recipesSubject.value        
        this.recipesSubject.next(currentStatus.filter(recipe => recipe.id !== id))
      })
    ) as Observable<Object>
  }

  list(): Observable<RecipeModel[]> {
    return this.apiRestService.read<RecipeModel[]>(RecipeService.url).pipe(
      tap(response => {
        this.recipesSubject.next(response)
      })
    ) as Observable<RecipeModel[]>
  }

}
