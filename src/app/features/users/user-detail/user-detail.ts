import { Component, inject } from '@angular/core';
import { UserService } from '../user-service/user-service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../user-model';
import { UserDelete } from '../user-delete/user-delete';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from "@angular/material/list";
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-detail',
  imports: [AsyncPipe, RouterLink, MatButtonModule, MatListModule, MatIcon],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss'
})

export class UserDetail {

  route: ActivatedRoute = inject(ActivatedRoute)
  userService = inject(UserService)
  user$: Observable<UserModel>
  deleteDialog = inject(MatDialog)

  constructor() {
    this.user$ = this.userService.read()
  }

  openDeleteDialog() {
    this.deleteDialog.open(UserDelete)
  }

}
