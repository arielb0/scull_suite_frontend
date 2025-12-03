import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../user-service/user-service';
import { LoadingSpinner } from "../../../core/loading-spinner/loading-spinner";
import { map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-user-activate',
  imports: [RouterLink, LoadingSpinner],
  templateUrl: './user-activate.html',
  styleUrl: './user-activate.scss'
})
export class UserActivate {
  activationStatus: number = 0
  route = inject(ActivatedRoute)
  userService = inject(UserService)

  constructor() {
   
    this.route.paramMap.pipe(
      map(params => ({uid: params.get('uid'), token: params.get('token')})),
      switchMap((values) => this.userService.activate(values.uid ?? '', values.token ?? ''))
    ).subscribe(
      {
        next: () => this.activationStatus = 1,
        error: () => this.activationStatus = 2,      
      }
    )
    
  }
}


/**
 * {
      next: (v) => console.log('executed next with value ' + v),
      complete: () => console.log('Complete is executed'), //this.activationStatus = 1,
      error: () => this.activationStatus = 2,      
    }
 */