import { Routes } from '@angular/router';


import { ProductPageComponent } from './pages/product-page/product-page.component';
import { GenderPageComponent } from './pages/gender-page/gender-page.component';
import { StoreFrontLayoutComponent } from './layouts/store-front-layout/store-front-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';


export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'gender/:gender',
        component: GenderPageComponent
      },
      {
        path: 'product/:id',
        component: ProductPageComponent
      },
      {
        path: '**',
        loadComponent: () => import('./pages/not-found-page/not-found-page.component')
      }
    ],
  },
  {
    path: '**',
    redirectTo: '',
  }
];

export default storeFrontRoutes;
