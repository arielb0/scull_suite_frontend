import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiRestService } from '../../../core/api-rest-service/api-rest-service';
import { UserModel } from '../user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static readonly url = `${environment.url}users/`
  private apiRestService = inject(ApiRestService)

  create(item: UserModel): Observable<UserModel> {
    return this.apiRestService.create(UserService.url, item) as Observable<UserModel>
  }

  read(): Observable<UserModel> {
    return this.apiRestService.read(`${UserService.url}me/`) as Observable<UserModel>
  }

  delete(password: string): Observable<Object> {
    return this.apiRestService.deleteWithBody(`${UserService.url}me/`, {current_password: password})
  }

  activate(uid: string, token: string): Observable<Object> {
    return this.apiRestService.create(`${UserService.url}activation/`, {uid: uid, token: token})
  }

  reActivate(email: string): Observable<Object> {
    return this.apiRestService.create(`${UserService.url}resend_activation/`, {email: email})
  }

  changeUsername(username: string, password: string): Observable<Object> {
    return this.apiRestService.create(`${UserService.url}set_username/`, {
      new_username: username,
      current_password: password
    }) // Here you need to update storage using pipe/tap
  }

  changePassword(newPassword: string, currentPassword: string): Observable<Object> {
    return this.apiRestService.create(`${UserService.url}set_password/`, {
      new_password: newPassword,
      current_password: currentPassword
    })
  }

  resetPassword(email: string) {
    return this.apiRestService.create(`${UserService.url}reset_password/`, {email: email})
  }

  resetPasswordConfirm(uid: string, token: string, newPassword: string) {
    return this.apiRestService.create(`${UserService.url}reset_password_confirm/`, {
      uid: uid,
      token: token,
      new_password: newPassword
    })
  }
}
