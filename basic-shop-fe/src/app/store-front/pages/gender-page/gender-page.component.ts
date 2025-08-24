import { I18nSelectPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, I18nSelectPipe, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  gender = toSignal(
    this.route.params.pipe(
      map(({gender}) => gender))
  );

  genderMap = {
    kid: "para niños",
    men: "para hombres",
    women: "para mujeres",
  };

  productsResource = rxResource({

    request: () => ({gender: this.gender(), page: this.paginationService.currentPage()}),
    loader: ({request}) => {
      return this.productsService.getProducts({page: request.page, pageSize: 6, search: '', sort: 0, gender: request.gender});
    }
  });

}
