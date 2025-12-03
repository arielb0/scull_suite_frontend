import { Routes } from '@angular/router';
import { RecipeForm } from './features/recipes/recipe-form/recipe-form';
import { RecipeList } from './features/recipes/recipe-list/recipe-list';
import { RecipeDetail } from './features/recipes/recipe-detail/recipe-detail';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found';
import { RecipeLayout } from './features/recipes/recipe-layout/recipe-layout';
import { UserLayout } from './features/users/user-layout/user-layout';
import { UserDetail } from './features/users/user-detail/user-detail';
import { UserForm } from './features/users/user-form/user-form';
import { AuthLayout } from './features/auth/auth-layout/auth-layout';
import { LoginForm } from './features/auth/login-form/login-form';
import { UserActivate } from './features/users/user-activate/user-activate';
import { UserReactivate } from './features/users/user-reactivate/user-reactivate';
import { UsernameForm } from './features/users/username-form/username-form';
import { PasswordForm } from './features/users/password-form/password-form';
import { PasswordReset } from './features/users/password-reset/password-reset';
import { PasswordConfirm } from './features/users/password-confirm/password-confirm';

export const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeLayout,
    children:[
      {
        path: 'create',
        component: RecipeForm,
        title: 'Recipe form'
      },
      {
        path: ':id',
        component: RecipeDetail,
        title: 'Recipes details',
      },
      {
        path: ':id/update',
        component: RecipeForm,
        title: 'Recipes update',
      },
      {
        path: '',
        component: RecipeList,
        title: 'Recipes list',
      },
    ]
  },  
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: LoginForm,
        title: 'Login'
      },
    ]
  },
  {
    path: 'users',
    component: UserLayout,
    children: [
      {
        path: 'create',
        component: UserForm,
        title: 'User form'
      },
      {
        path: 'me',
        component: UserDetail,
        title: 'User detail'
      },
      {
        path: 'activate/:uid/:token',
        component: UserActivate,
        title: 'User activate'
      },
      {
        path: 'resend-activation',
        component: UserReactivate,
        title: 'User reactivate'
      },
      {
        path: 'set-username',
        component: UsernameForm,
        title: 'User set username'
      },
      {
        path: 'set-password',
        component: PasswordForm,
        title: 'User set password'
      },
      {
        path: 'reset-password',
        component: PasswordReset,
        title: 'User reset password'
      },
      {
        path: 'password-confirm/:uid/:token',
        component: PasswordConfirm,
        title: 'User confirm password'
      },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page not found',
  }
];
