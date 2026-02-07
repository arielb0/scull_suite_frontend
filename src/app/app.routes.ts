import { Routes } from '@angular/router';
import { RecipeLayout } from './features/recipes/recipe-layout/recipe-layout';
import { UserLayout } from './features/users/user-layout/user-layout';
import { AuthLayout } from './features/auth/auth-layout/auth-layout';
import { WimmLayout } from './features/wimm/wimm-layout/wimm-layout';
import { C } from '@angular/cdk/keycodes';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login-form/login-form').then(c => c.LoginForm),
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
        loadComponent: () => import('./features/users/user-form/user-form').then(c => c.UserForm),
        title: 'User form'
      },
      {
        path: 'me',
        loadComponent: () => import('./features/users/user-detail/user-detail').then(c => c.UserDetail),
        title: 'User detail'
      },
      {
        path: 'activate/:uid/:token',
        loadComponent: () => import('./features/users/user-activate/user-activate').then(c => c.UserActivate),
        title: 'User activate'
      },
      {
        path: 'resend-activation',
        loadComponent: () => import('./features/users/user-reactivate/user-reactivate').then(c => c.UserReactivate),
        title: 'User reactivate'
      },
      {
        path: 'set-username',
        loadComponent: () => import('./features/users/username-form/username-form').then(c => c.UsernameForm),
        title: 'User set username'
      },
      {
        path: 'set-password',
        loadComponent: () => import('./features/users/password-form/password-form').then(c => c.PasswordForm),
        title: 'User set password'
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./features/users/password-reset/password-reset').then(c => c.PasswordReset),
        title: 'User reset password'
      },
      {
        path: 'password-confirm/:uid/:token',
        loadComponent: () => import('./features/users/password-confirm/password-confirm').then(c => c.PasswordConfirm),
        title: 'User confirm password'
      },
    ]
  },
  {
    path: 'recipes',
    component: RecipeLayout,
    children:[
      {
        path: 'create',        
        loadComponent: () => import('./features/recipes/recipe-form/recipe-form').then(c => c.RecipeForm),
        title: 'Recipe form'
      },
      {
        path: ':id',
        loadComponent: () => import('./features/recipes/recipe-detail/recipe-detail').then(c => c.RecipeDetail),
        title: 'Recipes details',
      },
      {
        path: ':id/update',
        loadComponent: () => import('./features/recipes/recipe-form/recipe-form').then(c => c.RecipeForm),
        title: 'Recipes update',
      },
      {
        path: '',
        loadComponent: () => import('./features/recipes/recipe-list/recipe-list').then(c => c.RecipeList),
        title: 'Recipes list',
      },
    ]
  },
  {
    path: 'wimm',
    component: WimmLayout,
    children: [
      {
        path: 'accounts',
        children: [
          {
            path: 'create',
            loadComponent: () => import('./features/wimm/account-form/account-form').then(c => c.AccountForm),
            title: 'Account Create'
          },
          {
            path: ':id',
            loadComponent: () => import('./features/wimm/account-detail/account-detail').then(c => c.AccountDetail),
            title: 'Account Detail'
          },
          {
            path: ':id/update',
            loadComponent: () => import('./features/wimm/account-form/account-form').then(c => c.AccountForm),
            title: 'Account Update'
          },
          {
            path: '',
            loadComponent: () => import('./features/wimm/account-list/account-list').then(c => c.AccountList),
            title: 'Account List'
          },
        ]
      },
      {
        path: 'transactions',
        children: [
          {
            path: 'create',
            loadComponent: () => import('./features/wimm/transaction-form/transaction-form').then(c => c.TransactionForm),
            title: 'Transaction Create'
          },
          {
            path: ':id',
            loadComponent: () => import('./features/wimm/transaction-detail/transaction-detail').then(c => c.TransactionDetail),
            title: 'Transaction Detail'
          },
          {
            path: ':id/update',
            loadComponent: () => import('./features/wimm/transaction-form/transaction-form').then(c => c.TransactionForm),
            title: 'Transaction Update'
          },
          {
            path: '',
            loadComponent: () => import('./features/wimm/transaction-list/transaction-list').then(c => c.TransactionList),
            title: 'Transaction List'
          },
        ]
      },
      {
        path: '',
        loadComponent: () => import('./features/wimm/dashboard/dashboard').then(c => c.Dashboard),
        title: 'Dashboard'
      },
      {
        path: 'configuration',
        children: [
          {
            path: 'detail',
            loadComponent: () => import('./features/wimm/configuration-detail/configuration-detail').then(c => c.ConfigurationDetail),
            title: 'Configuration detail'
          },          
          {
            path: 'update',
            loadComponent: () => import('./features/wimm/configuration-form/configuration-form').then(c => c.ConfigurationForm),
            title: 'Configuration Update'
          }
        ]
      },
      {
        path: 'budget',
        children: [
          {
            path: 'apply',
            loadComponent: () => import('./features/wimm/budget-form/budget-form').then(c => c.BudgetForm),
            title: 'Budget Form'
          }
        ]
      },
      {
        path: 'faq',
        children: [
          {
            path: '',
            loadComponent: () => import('./features/wimm/faq/faq').then(c => c.Faq),
            title: 'Frecuent Asked Questions'
          }
        ]
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./core/page-not-found/page-not-found').then(c => c.PageNotFoundComponent),
    title: 'Page not found',
  }
];